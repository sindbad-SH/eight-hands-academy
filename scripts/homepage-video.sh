#!/usr/bin/env bash
# Puts a video in the homepage's top slot, or takes it down. Run by the "Add homepage video" button
# (.github/workflows/add-homepage-video.yml); also runs locally in Git Bash for testing.
#   LINK     link to the video file (Google Drive / Dropbox / direct link), or the word: remove
#   THUMB    optional: where in the video to take the cover image, in seconds or m:ss (blank = automatic)
#   VERSION  cache-buster for the file URLs (the workflow's run number)
# Writes public/video/homepage.mp4 + homepage-poster.jpg and updates src/data/video.ts.
# Nothing in the repo changes unless every step succeeds.
set -euo pipefail

VIDEO=public/video/homepage.mp4
POSTER=public/video/homepage-poster.jpg
DATA=src/data/video.ts
SUMMARY=${GITHUB_STEP_SUMMARY:-/dev/stdout}
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

say()  { printf '%s\n' "$1" >> "$SUMMARY"; }
fail() { say "### ❌ $1"; echo "::error::$1"; exit 1; }
probe() { ffprobe -v error -select_streams v:0 -show_entries "$1" -of default=nw=1:nk=1 "$2" 2>/dev/null | head -1; }
set_data() {  # approved src poster width height
  sed -i -E -e "s|^  approved: .*|  approved: $1,|" -e "s|^  src: .*|  src: '$2',|" \
    -e "s|^  poster: .*|  poster: '$3',|" -e "s|^  width: .*|  width: $4,|" -e "s|^  height: .*|  height: $5,|" "$DATA"
}

LINK=$(printf '%s' "${LINK:-}" | tr -d '[:space:]')

if [ "$(printf '%s' "$LINK" | tr '[:upper:]' '[:lower:]')" = remove ]; then
  rm -f "$VIDEO" "$POSTER"
  set_data false '' '' 0 0
  echo "ACTION=removed" >> "${GITHUB_ENV:-/dev/null}"
  say "### ✅ Video taken down"
  say "The homepage is back to no video in about 2 minutes."
  exit 0
fi

case "$LINK" in
  https://*|http://*) ;;
  *) fail "That isn't a link. Paste the video's share link (it starts with https://), or type remove." ;;
esac
case "$LINK" in
  *youtube.com*|*youtu.be*|*vimeo.com*|*instagram.com*|*facebook.com*|*tiktok.com*)
    fail "That's a link to a video website, not to the video file. Ask for the file itself, or a Google Drive or Dropbox link to it." ;;
esac

# 1. Download.
IN=$WORK/input
case "$LINK" in
  *drive.google.com*|*docs.google.com*)
    gdown --quiet --fuzzy "$LINK" -O "$IN" ||
      fail "Google Drive wouldn't hand over the file. In Drive, set the video's sharing to \"Anyone with the link\", then run this again." ;;
  *dropbox.com*)
    case "$LINK" in *dl=0*) URL=${LINK/dl=0/dl=1} ;; *\?*) URL="$LINK&dl=1" ;; *) URL="$LINK?dl=1" ;; esac
    curl -fsSL --retry 3 -o "$IN" "$URL" ||
      fail "Dropbox wouldn't hand over the file. Check the link opens the video, then run this again." ;;
  *)
    curl -fsSL --retry 3 -o "$IN" "$LINK" ||
      fail "Couldn't download that link. Use a Google Drive or Dropbox link to the video file." ;;
esac
[ -n "$(probe stream=width "$IN")" ] ||
  fail "That link didn't give a video file. For Google Drive, set sharing to \"Anyone with the link\" and link the video itself, not a folder."

# 2. Convert for the web: H.264/AAC MP4, at most 1920 px on the long side, at most 30 fps, starts playing while it
#    loads, camera metadata (including GPS) stripped. iPhone HDR footage is tone-mapped so it doesn't look washed out.
FPS=$(probe stream=avg_frame_rate "$IN")
CAP=$(awk -v f="$FPS" 'BEGIN { split(f, a, "/"); r = (a[2] > 0) ? a[1] / a[2] : a[1]; print (r > 31) ? ",fps=30" : "" }')
FIT="scale='min(1920,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2"
TO_SDR="zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,"
encode() {
  ffmpeg -nostdin -v error -y -i "$IN" -map 0:v:0 -map '0:a:0?' -map_metadata -1 -vf "$1$FIT$CAP,format=yuv420p" \
    -c:v libx264 -preset slow -crf 24 -maxrate 4M -bufsize 8M -c:a aac -b:a 128k -ac 2 -movflags +faststart "$WORK/out.mp4"
}
case "$(probe stream=color_transfer "$IN")" in
  arib-std-b67|smpte2084) echo "HDR video: converting to standard range."; encode "$TO_SDR" || encode "" ;;
  *) encode "" ;;
esac || fail "Couldn't convert that video. Ask for the original file from the camera, phone or editing app."

# 3. Cover image: the frame at THUMB, or a representative frame from just after the start (skips fade-ins).
T=$(printf '%s' "${THUMB:-}" | tr -cd '0-9.:' | awk -F: '{ t = 0; for (i = 1; i <= NF; i++) t = t * 60 + $i; if (NF) print t }')
DUR=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$WORK/out.mp4")
if [ -n "$T" ]; then
  ffmpeg -nostdin -v error -y -ss "$T" -i "$WORK/out.mp4" -frames:v 1 -q:v 3 "$WORK/poster.jpg" || true
else
  S=$(awk -v d="$DUR" 'BEGIN { s = d / 5; if (s > 3) s = 3; printf "%.2f", s }')
  ffmpeg -nostdin -v error -y -ss "$S" -i "$WORK/out.mp4" -vf thumbnail=60 -frames:v 1 -q:v 3 "$WORK/poster.jpg" || true
fi
[ -s "$WORK/poster.jpg" ] ||
  fail "Couldn't take a cover image at ${T:-the start} seconds. Run again with a smaller cover-image time, or leave it blank."

# 4. Size check, then put the files in place and point the site at them.
BYTES=$(wc -c < "$WORK/out.mp4" | tr -d ' ')
[ "$BYTES" -lt 95000000 ] ||
  fail "The video is too long for the website (over 95 MB even after converting). Ask for a shorter version."
mkdir -p public/video
cp "$WORK/out.mp4" "$VIDEO"
cp "$WORK/poster.jpg" "$POSTER"
W=$(probe stream=width "$VIDEO")
H=$(probe stream=height "$VIDEO")
V=${VERSION:-$(date +%s)}
set_data true "/video/homepage.mp4?v=$V" "/video/homepage-poster.jpg?v=$V" "$W" "$H"
echo "ACTION=updated" >> "${GITHUB_ENV:-/dev/null}"
say "### ✅ Video ready: ${W}×${H}, $(printf '%.0f' "$DUR") seconds, $((BYTES / 1000000)) MB"
say "It shows at the top of https://8handsmartialarts.com in about 2 minutes."
say "Cover image not right? Run this again with a cover-image time. To take the video down, run it with the word remove."
