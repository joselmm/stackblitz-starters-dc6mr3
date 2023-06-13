import React, { useRef } from 'react';
import Player from '@madzadev/audio-player';
import '@madzadev/audio-player/dist/index.css';

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

// para rescatar: https://script.google.com/macros/s/AKfycbxbo8pCIXSVEaL3o9XYQrKqlyGq4tr1-eAXBrTUZ7PdTwOjFdzHaTC9fBFokNrvOLal/exec?videoId=FU-7mHUTJKk
const PlayerComponent = ({ playerSrc }) => {
  //const htmlplayerRef = useRef();

  return (
    <div>
      <Player trackList={tracks} />
    </div>
  );
};

export default PlayerComponent;
