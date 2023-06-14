import React from 'react';
import PropTypes from 'prop-types';
import PlaylistItem from '../../models/PlaylistItem.class.js';

const PlaylistItemComponent = ({ itemInfo, play }) => {
  return (
    <div onClick={() => play(itemInfo.videoId)} className="p-1">
      <p>{itemInfo.title}</p>
      <p>{itemInfo.state}</p>
    </div>
  );
};

PlaylistItemComponent.propTypes = {
  itemInfo: PropTypes.instanceOf(PlaylistItem).isRequired,
};

export default PlaylistItemComponent;
