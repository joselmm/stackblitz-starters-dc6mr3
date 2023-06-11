import React from 'react';
import VideoCardComponent from '../pure/VideoCardComponent.jsx';
import { Context } from '../../App.js';
const ResultComponent = ({ videos, setVideos }) => {
  /* add to playlist */
  function toggleAddToPlaylist(videoInfo) {
    console.log(videos);
    const tempVideolist = [...videos];
    const index = tempVideolist.indexOf(videoInfo);
    tempVideolist[index].addedToPlayList =
      !tempVideolist[index].addedToPlayList;
    console.log(tempVideolist[index]);

    setVideos(tempVideolist);
  }
  return (
    <div className="row col-9">
      {videos.map((vf, idx) => (
        <VideoCardComponent
          key={idx}
          info={vf}
          toggleAddToPlaylist={toggleAddToPlaylist}
        />
      ))}
    </div>
  );
};

export default ResultComponent;
