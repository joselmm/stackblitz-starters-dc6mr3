import PLAYLIST_ITEM_STATE from './PlaylistItemState.enum.js';
export default class PlayListItem {
  title = '';
  directLink = '';
  poster = '';
  videoId = '';
  state = PLAYLIST_ITEM_STATE.WAITING;
  constructor({ title, directLink, poster, videoId }) {
    this.title = title;
    this.directLink = directLink;
    this.poster = poster;
    this.videoUrl = videoId;
  }
}
