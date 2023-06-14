import React from 'react';
import PropTypes from 'prop-types';
import PlaylistItem from '../../models/PlaylistItem.class.js';

const PlaylistItemComponent = ({ itemInfo }) => {
  return (
    <div className="p-1">
      <p>{itemInfo.title}</p>
      <p>{itemInfo.state}</p>
    </div>
  );
};

PlaylistItemComponent.propTypes = {
  itemInfo: PropTypes.instanceOf(PlaylistItem).isRequired,
};

export default PlaylistItemComponent;
