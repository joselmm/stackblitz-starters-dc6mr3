import React from 'react';
import PlayListItem from '../../models/PlaylistItem.class.js';
import PLAYLIST_ITEM_STATE from '../../models/PlaylistItemState.enum.js';
import VideoCardComponent from '../pure/VideoCardComponent.jsx';

const ResultComponent = ({
  videos,
  setVideos,
  setPlaylist,
  playlist,
  queue,
  setQueue,
}) => {
  /* add to playlist */
  function toggleAddToPlaylist(videoInfo) {
    console.log(videoInfo);
    if (videoInfo.addedToPlayList === true) {
      console.log(videoInfo.addedToPlayList);
      removeFromPlaylist(videoInfo.videoId);
    } else if (videoInfo.addedToPlayList === false) {
      console.log(videoInfo.addedToPlayList);
      addToPlaylist(videoInfo);
    }

    //console.log(videos);
    const tempVideolist = [...videos];
    const index = tempVideolist.indexOf(videoInfo);
    tempVideolist[index].addedToPlayList =
      !tempVideolist[index].addedToPlayList;
    // console.log(tempVideolist[index]);
    setVideos(tempVideolist);
  }

  function removeFromPlaylist(videoId) {
    console.log('remove');
    console.log(queue);

    const tempPlaylist = [...playlist];
    let index = null;
    var iteracion = 0;
    for (let playlistItem of playlist) {
      if (playlistItem.videoId === videoId) {
        index = iteracion;
      }
      iteracion++;
    }
    if (index != null) {
      tempPlaylist.splice(index, 1);
      setPlaylist(tempPlaylist);
    }

    /* remove from queue */
    const tempQueue = [...queue];
    const indexQueueItem = tempQueue.indexOf(videoId);
    tempQueue.splice(indexQueueItem, 1);
    setQueue(tempQueue);
  }

  function addToPlaylist(info) {
    //console.log(videos);
    console.log('add');
    console.log(queue);

    const tempPlaylist = [...playlist];
    const playlistItem = new PlayListItem({
      title: info.title,
      directLink: '',
      poster: info.poster,
      videoId: info.videoId,
      state: PLAYLIST_ITEM_STATE.WAITING,
    });
    tempPlaylist.push(playlistItem);
    setPlaylist(tempPlaylist);

    /* add to queue */
    const tempQueue = [...queue];
    tempQueue.push(info.videoId);
    // console.log(tempQueue);
    setQueue(tempQueue);
  }

  return (
    <div className="row col-9">
      {videos.map((vf, idx) => (
        <VideoCardComponent
          removeFromPlaylist={removeFromPlaylist}
          key={idx}
          info={vf}
          toggleAddToPlaylist={toggleAddToPlaylist}
        />
      ))}
    </div>
  );
};

export default ResultComponent;
