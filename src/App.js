import React, { useState, useRef, useEffect } from 'react';
/* Bootstrap style sheet */
import 'bootstrap/dist/css/bootstrap.css';
/* Bootstrap icons style sheet */
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import ResultsComponent from './components/container/ResultsComponent.jsx';
import PlayerComponent from './components/pure/PlayerComponent.jsx';
import SidebarComponent from './components/container/SidebarComponent.jsx';
import SearchVideoComponent from './components/pure/SearchVideoComponent.jsx';
import VideoCardInfo from './models/VideoCardInfo.class.js';
import PlaylistItem from './models/PlaylistItem.class.js';
import PLAYLIST_ITEM_STATE from './models/PlaylistItemState.enum.js';
import sleep from './models/sleep.function.js';

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
  directLink:
    'https://drive.google.com/uc?id=1qewde2jNra6CYgD8us-7y_N166bRN1pE',
  poster: '',
  videoId: 'NO7EtdR3Dyw',
});
const playlistI2 = new PlaylistItem({
  title: 'Hey Mor - Ozuna Ft Feid (Official Video)',
  directLink: '',
  poster: '',
  videoId: 'sx3vYXOlgK4',
});

export default function App() {
  /*  */
  const [shouldProcessQueue, setShouldProcessQueue] = useState(true);
  const [queue, setQueue] = useState([]);
  /* videos state */
  const [videos, setVideos] = useState([
    /* videoInfo1, videoInfo2 */
  ]);
  /* playlist state */

  const [playlist, setPlaylist] = useState([playlistI1, playlistI2]);
  const [currentPlayingId, setCurrentPlayingId] = useState('');
  //https://drive.google.com/uc?id=1spdzsDzJJbNbi9H2lbsGN3VzcFJ2DlGg
  const prevLengthRef = useRef(playlist.length);
  //console.log(prevLengthRef);
  /* useEffect(() => {
    if (prevLengthRef.current < playlist.length) {
      console.log(prevLengthRef.current, playlist.length);
    }
  }, [playlist]); */

  function removeFromQueue(videoId) {
    setQueue((prevQueue) => prevQueue.filter((id) => id !== videoId));
  }

  function addToQueue(videoId) {
    if (!queue.includes(videoId)) {
      setQueue((prevQueue) => [...prevQueue, videoId]);
    }
  }

  useEffect(() => {
    setShouldProcessQueue(false);
    return () => {
      console.log('valor es  ' + shouldProcessQueue);
    };
  }, []);

  useEffect(() => {
    console.log('cambio de queue: ');
    console.log(queue, shouldProcessQueue);
    procesarCola(queue);
  }, [queue]);

  async function procesarCola(queue) {
    //console.log(shouldProcessQueue);
    console.log('ejecutando procesamiento en cola');
    //if (!shouldProcessQueue) return;
    console.log('ejecutando procesamiento en cola');

    /*var queue = [...queue];
    console.log(queue);
    console.log(shouldProcessQueue);
    console.log('hey'); */
    console.log('logitud cola ' + queue.length);
    if (queue.length > 0) {
      console.log('cola NOOO vacia');

      const tempPlaylist = [...playlist];
      var videoId = queue[0];
      const index = tempPlaylist.findIndex((item) => item.videoId === videoId);
      console.log('index del item procesando: ' + index);
      console.log('videoID: ' + videoId);
      if (index === -1) setQueue((prev) => prev.slice(1));
      const result = await fetch(
        `https://script.google.com/macros/s/AKfycbxbo8pCIXSVEaL3o9XYQrKqlyGq4tr1-eAXBrTUZ7PdTwOjFdzHaTC9fBFokNrvOLal/exec?videoId=${videoId}`
      )
        .then((res) => res.json())
        .then((res) => res);

      if (result.noError) {
        //test if the item does stil exist
        tempPlaylist[index].state = PLAYLIST_ITEM_STATE.READY;
        tempPlaylist[index].directLink = result.directLink;
      } else {
        tempPlaylist[index].state = PLAYLIST_ITEM_STATE.ERROR;
      }
      setQueue((prev) => prev.slice(1));
      setPlaylist(tempPlaylist);
      //await sleep(3000);
      if (shouldProcessQueue) procesarCola();
      //   setShouldProcessQueue(false);
    }
  }

  /* if (shouldProcessQueue) {
    procesarCola();
  } */

  return (
    <div className="row">
      <header className="col-12 mt-3 mb-3">
        <div className="row">
          <div className="col-3"></div>
          <SearchVideoComponent playlist={playlist} setVideos={setVideos} />
          <div className="col-3"></div>
        </div>
      </header>
      <ResultsComponent
        setCurrentPlayingId={setCurrentPlayingId}
        currentPlayingId={currentPlayingId}
        playlist={playlist}
        setPlaylist={setPlaylist}
        setVideos={setVideos}
        videos={videos}
        removeFromQueue={removeFromQueue}
        addToQueue={addToQueue}
        queue={queue}
      />
      <SidebarComponent
        setCurrentPlayingId={setCurrentPlayingId}
        currentPlayingId={currentPlayingId}
        playlist={playlist}
        setPlaylist={setPlaylist}
      />
    </div>
  );
}
