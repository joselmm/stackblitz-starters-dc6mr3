import React from 'react';
import PropTypes from 'prop-types';
import PlaylistItem from '../../models/PlaylistItem.class.js';
import PLAYLIST_ITEM_STATE from '../../models/PlaylistItemState.enum.js';

const PlaylistItemComponent = ({
  itemInfo,
  play,
  moveDown,
  moveUp,
  remove,
}) => {
  //depends on item state
  let classes = '';
  switch (itemInfo.state) {
    case PLAYLIST_ITEM_STATE.WAITING: {
      classes = 'bg-secondary';
      break;
    }
    case PLAYLIST_ITEM_STATE.READY: {
      classes = 'bg-info';
      break;
    }
    case PLAYLIST_ITEM_STATE.ERROR: {
      classes = 'bg-danger';
      break;
    }
    case PLAYLIST_ITEM_STATE.PLAYING: {
      classes = 'bg-success';
      break;
    }
  }

  return (
    <div className={'p-1 ' + classes}>
      <p
        onClick={
          itemInfo.state === PLAYLIST_ITEM_STATE.READY
            ? () => play(itemInfo.videoId)
            : () => console.log('no listo')
        }
        className="cursor-pointer"
        title={itemInfo.title}
        style={{ whiteSpace: 'nowrap', overflow: 'hidden', margin: '0' }}
      >
        {itemInfo.title}
      </p>
      <i
        onClick={() => moveUp(itemInfo.videoId)}
        className="bi bi-arrow-up cursor-pointer"
      ></i>
      <i
        onClick={() => moveDown(itemInfo.videoId)}
        className="bi bi-arrow-down cursor-pointer"
      ></i>
      <i
        onClick={() => remove(itemInfo.videoId)}
        className="bi bi-trash cursor-pointer"
      ></i>
    </div>
  );
};

PlaylistItemComponent.propTypes = {
  itemInfo: PropTypes.instanceOf(PlaylistItem).isRequired,
};

export default PlaylistItemComponent;
