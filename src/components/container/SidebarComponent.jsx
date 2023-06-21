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
    //console.log('reproduciendo: ' + videoId);
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
      props.setCurrentPlayingId(
        props.playlist[firstAvailableItemIndex].videoId
      );
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
      console.log('NO PASE LA PRUEBA DE SI HAY ALGO SIGUIENTE PARA REPRODUCIR');
      const firstAvailableItemIndex = props.playlist.findIndex(
        (item) => item.state === PLAYLIST_ITEM_STATE.READY
      );
      if (firstAvailableItemIndex === -1) {
        console.log('NO PASE LA PRUEBA DE SI HAY ALGO PRIMERO PARA REPRODUCIR');
        props.setCurrentPlayingId('');
        return;
      }
      props.setCurrentPlayingId(
        props.playlist[firstAvailableItemIndex].videoId
      );
      return;
    }
    console.log('2---Pase la pruba de si hay algo siguiente para reproducir');
    props.setCurrentPlayingId(props.playlist[nextAvailableItemIndex].videoId);
  }

  function prevTrack() {
    if (props.setCurrentPlayingId === '') return;
    console.log('pase la prueba de si hay algo reproduciendo');
    const indexCurrentlyPlaying = props.playlist.findIndex(
      (item) => item.videoId === props.currentPlayingId
    );
    if (indexCurrentlyPlaying === -1) {
      console.log(
        'NOOOO pase la prueba de si aun esta el actual reproduciendo en la lista'
      );

      const lastAvailableItemIndex = props.playlist
        .slice()
        .reverse()
        .findIndex((item) => item.state === PLAYLIST_ITEM_STATE.READY);

      if (lastAvailableItemIndex === -1) {
        console.log(
          'NOOOO pase la prueba de si hay algo de ultimo para reproducir'
        );
        props.setCurrentPlayingId('');
        return;
      }
      console.log(
        '1---SIIII pase la prueba de si hay algo de ultimo para reproducir'
      );
      props.setCurrentPlayingId(
        props.playlist[props.playlist.length - lastAvailableItemIndex - 1]
          .videoId
      );
      return;
    }
    console.log(
      'pase la prueba de si aun esta el actual reproduciendo en la lista'
    );

    const prevAvailableItemIndex = props.playlist
      .slice(0, indexCurrentlyPlaying)
      .reverse()
      .findIndex((item) => item.state === PLAYLIST_ITEM_STATE.READY);

    if (prevAvailableItemIndex === -1) {
      console.log('NO PASE LA PRUEBA DE SI HAY ALGO ANTERIOR PARA REPRODUCIR');
      const lastAvailableItemIndex = props.playlist
        .slice()
        .reverse()
        .findIndex((item) => item.state === PLAYLIST_ITEM_STATE.READY);

      if (lastAvailableItemIndex === -1) {
        console.log('NO PASE LA PRUEBA DE SI HAY ALGO ULTIMO PARA REPRODUCIR');
        props.setCurrentPlayingId('');
        return;
      }
      props.setCurrentPlayingId(
        props.playlist[props.playlist.length - lastAvailableItemIndex - 1]
          .videoId
      );
      return;
    }
    console.log('2---Pase la pruba de si hay algo anterior para reproducir');
    props.setCurrentPlayingId(
      props.playlist[indexCurrentlyPlaying - prevAvailableItemIndex - 1].videoId
    );
  }

  function moveItemUp(videoId) {
    const tempPlaylist = [...props.playlist];
    const itemIdx = tempPlaylist.findIndex((item) => item.videoId === videoId);
    if (itemIdx === -1) return;

    if (itemIdx === 0) {
      const item = tempPlaylist[itemIdx];
      for (let i = 0; i < tempPlaylist.length - 1; i++) {
        tempPlaylist[i] = tempPlaylist[i + 1];
      }
      tempPlaylist[tempPlaylist.length - 1] = item;
      props.setPlaylist(tempPlaylist);
      return;
    }

    const previousItem = tempPlaylist[itemIdx - 1];
    tempPlaylist[itemIdx - 1] = tempPlaylist[itemIdx];
    tempPlaylist[itemIdx] = previousItem;
    props.setPlaylist(tempPlaylist);
  }

  function moveItemDown(videoId) {
    const tempPlaylist = [...props.playlist];
    const itemIdx = tempPlaylist.findIndex((item) => item.videoId === videoId);
    if (itemIdx === -1) return;
    // Intercambia el elemento en la posición "itemIdx" con el elemento en la posición siguiente

    if (itemIdx === tempPlaylist.length - 1) {
      const item = tempPlaylist[itemIdx];
      for (let i = 1; i < tempPlaylist.length; i++) {
        tempPlaylist[i] = tempPlaylist[i - 1];
      }
      tempPlaylist[0] = item;
      props.setPlaylist(tempPlaylist);
      return;
    }

    const nextItem = tempPlaylist[itemIdx + 1];
    tempPlaylist[itemIdx + 1] = tempPlaylist[itemIdx];
    tempPlaylist[itemIdx] = nextItem;
    props.setPlaylist(tempPlaylist);
  }

  return (
    <SideBarContext.Provider value={props}>
      <div className="col-3 bg-primary">
        <PlayerComponent
          currentPlayingId={props.currentPlayingId}
          playlist={props.playlist}
          next={nextTrack}
          previous={prevTrack}
        />
        <PlaylistComponent
          play={playSelectedTrack}
          moveDown={moveItemDown}
          moveUp={moveItemUp}
        />
      </div>
    </SideBarContext.Provider>
  );
};

export default SidebarComponent;
