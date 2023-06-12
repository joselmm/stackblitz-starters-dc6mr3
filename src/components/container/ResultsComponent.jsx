import React from 'react';
import PlayListItem from '../../models/PlaylistItem.class.js';
import PLAYLIST_ITEM_STATE from '../../models/PlaylistItemState.enum.js';
import VideoCardComponent from '../pure/VideoCardComponent.jsx';

const ResultComponent = ({ videos, setVideos, setPlaylist, playlist }) => {
  /* add to playlist */
  function toggleAddToPlaylist(videoInfo) {
    //console.log(videos);
    const tempVideolist = [...videos];
    const index = tempVideolist.indexOf(videoInfo);
    tempVideolist[index].addedToPlayList =
      !tempVideolist[index].addedToPlayList;
    console.log(tempVideolist[index]);
    setVideos(tempVideolist);

    switch (videoInfo.addedToPlaylist) {
      case true:
        {
          removeFromPlaylist(videoInfo.videoId);
        }
        break;
      case true:
        {
          addToPlaylist(videoInfo);
        }
        break;
    }
  }

  function removeFromPlaylist(videoId) {
    //console.log(videos);
    const tempPlaylist = [...playlist];
    const index = null;
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
  }

  function addToPlaylist(info) {
    //console.log(videos);
    const tempPlaylist = [...playlist];
    const playlistItem = new PlayListItem({
      title: info.title,
      directLink: '',
      poster: info.poster,
      videoId: info.videoId,
      state: PLAYLIST_ITEM_STATE.WAITING,
    });
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
