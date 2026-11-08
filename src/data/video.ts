// Set by the "Add homepage video" button (GitHub → Actions; .github/workflows/add-homepage-video.yml), or by hand:
// put the MP4 in public/video/, set src (e.g. '/video/homepage.mp4') and approved: true.
// width/height = the file's pixel size (0 = the 16:9 slot). Poster, captions (.vtt) and transcript are optional.
// Empty configuration renders no player, thumbnail, placeholder, or external request.
export const academyVideo = {
  approved: true,
  src: '/video/homepage.mp4?v=v11',
  poster: '/video/homepage-poster.jpg?v=v11',
  width: 1280,
  height: 720,
  captions: '',
  transcript: '',
  title: 'Eight Hands Martial Arts Academy',
};
