class VideoCardInfo {
  title = '';
  poster = '';
  duration = '';
  views = '';
  videoId = '';
  addedToPlayList = false;
  constructor({ title, poster, duration, views, addedToPlayList, videoId }) {
    this.title = title;
    this.poster = poster;
    this.duration = duration;
    this.videoId = videoId;
    this.views = views;
    this.addedToPlayList = addedToPlayList;
  }
}

export default VideoCardInfo;
