import React, { useRef } from 'react';

const PlayerComponent = ({ playerSrc }) => {
  const htmlplayerRef = useRef();

  return (
    <div>
      <audio
        ref={htmlplayerRef}
        hidden
        autoPlay
        controls
        src={playerSrc}
      ></audio>
      <div
        className="row bg-warning player-container"
        style={{ height: '20px' }}
        
      ></div>
    </div>
  );
};

export default PlayerComponent;
