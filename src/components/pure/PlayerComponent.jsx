import React, { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

/* import '../../styles/player.scss';
 */
const tracks = [
  {
    url: 'https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3',
    title: 'Madza - Chords of Life',
    tags: ['house'],
  },
  {
    url: 'https://audioplayer.madza.dev/Madza-Late_Night_Drive.mp3',
    title: 'Madza - Late Night Drive',
    tags: ['dnb'],
  },
  {
    url: 'https://audioplayer.madza.dev/Madza-Persistence.mp3',
    title: 'Madza - Persistence',
    tags: ['dubstep'],
  },
];

// para rescatar: https://script.google.com/macros/s/AKfycbxbo8pCIXSVEaL3o9XYQrKqlyGq4tr1-eAXBrTUZ7PdTwOjFdzHaTC9fBFokNrvOLal/exec?videoId=NO7EtdR3Dyw
const PlayerComponent = ({ playlist, currentPlayingId, next, previous }) => {
  //const htmlplayerRef = useRef();
  //console.log(playlist);
  let currentSrc = '';
  if (playlist.length > 0) {
    const currentPlayingItem = playlist.find(
      (item) => item.videoId === currentPlayingId
    );
    currentSrc = currentPlayingItem ? currentPlayingItem.directLink : '';
  }
  return (
    <div>
      <AudioPlayer
        onEnded={() => {
          console.log('ended event');
          next();
        }}
        showSkipControls={true}
        showJumpControls={false}
        src={currentSrc}
        onPlay={(e) => console.log('onPlay')}
        onClickNext={() => {
          next();
        }}
        onClickPrevious={() => {
          previous();
        }}
        // other props here
      />
    </div>
  );
};

export default PlayerComponent;
