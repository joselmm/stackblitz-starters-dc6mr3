import React, { useContext, useState } from 'react';
import PLAYLIST_ITEM_STATE from '../../models/PlaylistItemState.enum';
import PlayerComponent from '../pure/PlayerComponent';
import PlaylistItemComponent from '../pure/PlaylistItemComponent';

const SideBarContext = React.createContext();

const PlaylistComponent = ({ play }) => {
  const state = useContext(SideBarContext);

  return (
    <div>
      {state.playlist.map((item, idx) => (
        <PlaylistItemComponent play={play} key={idx} itemInfo={item} />
      ))}
    </div>
  );
};

const SidebarComponent = (props) => {
  

  function playSelectedTrack(videoId) {
    console.log('reproduciendo: ' + videoId);
    props.setCurrentPlayingId(videoId);
  }
  function nextTrack() {
    if (props.setCurrentPlayingId === '') return;
    console.log('pase la prueba de si hay algo reproduciendo');
    const indexCurrentlyPlaying = props.playlist.findIndex(
      (item) => item.videoId === props.currentPlayingId
    );
    if (indexCurrentlyPlaying === -1) {
      console.log(
        'NOOOO pase la prueba de si aun esta el actual reproduciendo en la lista'
      );

      const firstAvailableItemIndex = props.playlist.findIndex(
        (item) => item.state === PLAYLIST_ITEM_STATE.READY
      );
      if (firstAvailableItemIndex === -1) {
        console.log(
          'NOOOO pase la prueba de si hay algo de primero para reproducir'
        );
        props.setCurrentPlayingId('');
        return;
      }
      console.log(
        '1---SIIII pase la prueba de si hay algo de primero para reproducir'
      );
      props.setCurrentPlayingId(props.playlist[firstAvailableItemIndex].videoId);
      return;
    }
    console.log(
      'pase la prueba de si aun esta el actual reproduciendo en la lista'
    );

    const nextAvailableItemIndex = props.playlist.findIndex(
      (item, idx) =>
        item.state === PLAYLIST_ITEM_STATE.READY && idx > indexCurrentlyPlaying
    );
    if (nextAvailableItemIndex === -1) {
      console.log(
        'NO PASE LA PRUEBA DE SI HAY ALGO SIGUIENTE PARA REPRODUCIR'
      );
      const firstAvailableItemIndex = props.playlist.findIndex(
        (item) => item.state === PLAYLIST_ITEM_STATE.READY
      );
      if (firstAvailableItemIndex === -1) {
        console.log(
          'NO PASE LA PRUEBA DE SI HAY ALGO PRIMERO PARA REPRODUCIR'
        );
        props.setCurrentPlayingId('');
        return;
      }
      props.setCurrentPlayingId(props.playlist[firstAvailableItemIndex].videoId);
      return;
    }
    console.log(
      '2---Pase la pruba de si hay algo siguiente para reproducir'
    );
    props.setCurrentPlayingId(props.playlist[nextAvailableItemIndex].videoId);
  }
  return (
    <SideBarContext.Provider value={props}>
      <div className="col-3 bg-primary">
        <PlayerComponent
          currentPlayingId={props.currentPlayingId}
          playlist={props.playlist}
          next={nextTrack}
        />
        <PlaylistComponent play={playSelectedTrack} />
      </div>
    </SideBarContext.Provider>
  );
};

export default SidebarComponent;
