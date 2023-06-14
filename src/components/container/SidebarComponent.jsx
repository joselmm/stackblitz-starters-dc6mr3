import React, { useContext, useState } from 'react';
import PlayerComponent from '../pure/PlayerComponent';
import PlaylistItemComponent from '../pure/PlaylistItemComponent';

const SideBarContext = React.createContext();

const PlaylistComponent = () => {
  const state = useContext(SideBarContext);
  function play(videoId) {
    state.setCurrentPlayingId(videoId);
  }
  return (
    <div>
      {state.playlist.map((item, idx) => (
        <PlaylistItemComponent play={play} key={idx} itemInfo={item} />
      ))}
    </div>
  );
};

const SidebarComponent = (props) => {
  return (
    <SideBarContext.Provider value={props}>
      <div className="col-3 bg-primary">
        <PlayerComponent
          currentPlayingId={props.currentPlayingId}
          playlist={props.playlist}
        />
        <PlaylistComponent />
      </div>
    </SideBarContext.Provider>
  );
};

export default SidebarComponent;
