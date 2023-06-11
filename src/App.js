import React, { useState } from 'react';
/* Bootstrap style sheet */
import 'bootstrap/dist/css/bootstrap.css';
/* Bootstrap icons style sheet */
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import ResultsComponent from './components/container/ResultsComponent.jsx';
import SidebarComponent from './components/container/SidebarComponent.jsx';
import SearchVideoComponent from './components/pure/SearchVideoComponent.jsx';
import VideoCardInfo from './models/VideoCardInfo.class.js';
import PlaylistItem from './models/PlaylistItem.class.js';
import PLAYLIST_ITEM_STATE from './models/PlaylistItemState.enum.js';

const videoInfo1 = new VideoCardInfo({
  title: 'Hey Mor - Ozuna Ft Feid (Official Video)',
  poster: 'https://i.ytimg.com/vi/sx3vYXOlgK4/0.jpg',
  duration: '4:50',
  views: '400M',
  addedToPlayList: false,
  videoId: 'sx3vYXOlgK4',
});

const videoInfo2 = new VideoCardInfo({
  title: 'Tainy, Bad Bunny, Julieta Venegas - Lo Siento BB:/ (Official Video)',
  poster: 'https://i.ytimg.com/vi/NO7EtdR3Dyw/0.jpg',
  duration: '3:40',
  views: '180M',
  addedToPlayList: false,
  videoId: 'NO7EtdR3Dyw',
});

const playlistI1 = new PlaylistItem({
  title: 'Tainy, Bad Bunny, Julieta Venegas - Lo Siento BB:/ (Official Video)',
  directLink: '',
  poster: '',
  videoId: 'NO7EtdR3Dyw',
});
const playlistI2 = new PlaylistItem({
  title: 'Hey Mor - Ozuna Ft Feid (Official Video)',
  directLink: '',
  poster: '',
  videoId: 'NO7EtdR3Dyw',
});

export default function App() {
  /* videos state */
  const [videos, setVideos] = useState([videoInfo1, videoInfo2]);
  /* playlist state */
  const [playlist, setPlaylist] = useState([playlistI1, playlistI2]);
  return (
    <div className="row">
      <header className="col-12 mt-3">
        <div className="row">
          <div className="col-3"></div>
          <SearchVideoComponent setVideos={setVideos} />
          <div className="col-3"></div>
        </div>
      </header>
      <ResultsComponent setVideos={setVideos} videos={videos} />
      <SidebarComponent playlist={playlist} setPlaylist={setPlaylist} />
    </div>
  );
}
