import React, { useContext, useState } from 'react';
import PLAYLIST_ITEM_STATE from '../../models/PlaylistItemState.enum';
import PlayerComponent from '../pure/PlayerComponent';
import PlaylistItemComponent from '../pure/PlaylistItemComponent';

const SideBarContext = React.createContext();

const PlaylistComponent = () => {
  const state = useContext(SideBarContext);
  function playTrack(videoId) {
    console.log('reproduciendo');
    state.setCurrentPlayingId(videoId);
  }

  function nextTrack(info) {
    const index = state.playlist.findIndex((item) => item.videoId === videoId);
    if (index === -1) {
      const firstAvailableItemIndex = state.playlist.findIndex(
        (item) => item.state === PLAYLIST_ITEM_STATE.READY
      );
      if(firstAvailableItemIndex===-1){
        state.setCurrentPlayingId("");
        return
      }
      state.setCurrentPlayingId(state.playlist[firstAvailableItemIndex]);


    }
  }
  return (
    <div>
      {state.playlist.map((item, idx) => (
        <PlaylistItemComponent
          play={playTrack}
          next={nextTrack}
          key={idx}
          itemInfo={item}
        />
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
