import React from 'react';
import PropTypes from 'prop-types';
import PlaylistItem from '../../models/PlaylistItem.class.js';
import PLAYLIST_ITEM_STATE from '../../models/PlaylistItemState.enum.js';

const PlaylistItemComponent = ({ itemInfo, play }) => {
  return (
    <div onClick={(itemInfo.state===PLAYLIST_ITEM_STATE.READY)?() => play(itemInfo.videoId):()=>console.log("no listo")} className="p-1">
      <p>{itemInfo.title}</p>
      <p>{itemInfo.state}</p>
    </div>
  );
};

PlaylistItemComponent.propTypes = {
  itemInfo: PropTypes.instanceOf(PlaylistItem).isRequired,
};

export default PlaylistItemComponent;
