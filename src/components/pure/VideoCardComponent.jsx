import React from 'react';
import PropTypes from 'prop-types';
import VideoCardInfo from '../../models/VideoCardInfo.class';

const VideoCardComponent = ({ info, toggleAddToPlaylist }) => {
  function addPlaylistElement() {
    return info.addedToPlayList ? (
      <span>
        {' '}
        Agregado{' '}
        <i className="bi bi-check-circle-fill" style={{ color: 'green' }}></i>
      </span>
    ) : (
      <span>
        {' '}
        Agregar <i className="bi bi-list-check"></i>
      </span>
    );
  }

  return (
    <div className="card col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
      <img src={info.poster} className="card-img-top" alt="Título del video" />
      <div className="card-body">
        <h5 className="card-title">{info.title}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button
              onClick={() => toggleAddToPlaylist(info)}
              type="button"
              className="btn btn-sm btn-outline-secondary font-weight-bold"
            >
              {addPlaylistElement()}
            </button>
          </div>
          <small className="text-muted font-weight-bold p-1">{info.views}</small>
          <small className="text-muted font-weight-bold p-1">{info.duration}</small>
        </div>
      </div>
    </div>
  );
};

VideoCardComponent.propTypes = {
  info: PropTypes.instanceOf(VideoCardInfo).isRequired,
};

export default VideoCardComponent;
