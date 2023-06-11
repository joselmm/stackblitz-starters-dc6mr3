import React, { useRef, useEffect, useState } from 'react';
import etiquetarNumero from '../../models/etiquetarNumero.function';
import VideoCardInfo from '../../models/VideoCardInfo.class';
import SuggestionsComponent from './SuggestionsComponent.jsx';

//import fetch from 'node-fetch';

const SearchVideoComponent = ({ setVideos }) => {
  /* suggestion list state */

  const [suggestionList, setSuggestionList] = useState([]);
  const [query, setQuery] = useState('');

  const inputSearchRef = useRef();
  /* functiion to search videos */
  async function searchVideos(e) {
    e.preventDefault();
    console.log('ff');
    var query = inputSearchRef.current.value;
    var encodedQuery = encodeURIComponent(query);
    var searchResults = await fetch(
      `https://yt-info-1y11.onrender.com/buscarVideo/${encodedQuery}`
    )
      .then((res) => res.json())
      .then((res) => res);
    const tempArray = [];
    for (let videoItem of searchResults.items) {
      if (videoItem.type != 'video') continue;
      const videoCardInfo = new VideoCardInfo({
        title: videoItem.title,
        poster: `https://i.ytimg.com/vi/${videoItem.id}/0.jpg`,
        addedToPlayList: false,
        videoId: videoItem.id,
        duration: videoItem.duration,
        views: etiquetarNumero(videoItem.views),
      });
      tempArray.push(videoCardInfo);
    }
    /* console.log(tempArray.slice(0, 5)); */
    setVideos(tempArray);
  }

  /* Function that retrieves and renders search suggestions.*/

  function suggestions() {
    const query = inputSearchRef.current.value;

    if (query === '' ) return;
    setQuery(query);
    const encodedQuery = encodeURIComponent(query);
    /* https://wlkkpr-3000.csb.app/suggestions/harry */
    /* const uri = `https://script.google.com/macros/s/AKfycbyn-92JTOxCjFR-U3zFUB4GOhoUp06zomignavKvCx_oP2T_I2sii-7kf57X6xs9krO/exec?query=${encodedQuery}`; */
    const uri = `https://wlkkpr-3000.csb.app/suggestions/${encodedQuery}`;
    fetch(uri)
      .then((res) => res.text())
      .then((text) => {
        const regex = /\(.+\)/;
        const json = text
          .match(regex)[0]
          .slice(1, text.match(regex)[0].length - 1);
        var items = JSON.parse(json)[1];

        var sugerencias = items.map((s) => s[0]);
        console.log(sugerencias);
        setSuggestionList(sugerencias);
      });
  }

  return (
    <div className="col-6" onClick={console.log('f')}>
      <form onSubmit={(e) => searchVideos(e)} className="input-group mb-3 ">
        <input
          onChange={suggestions}
          ref={inputSearchRef}
          type="search"
          className="form-control"
          /* placeholder="Search a video" */
        />
        <div className="input-group-append">
          <button
            type="submit"
            className="input-group-text bg-success text-light cursor-pointer"
            id="basic-addon2"
          >
            Search
          </button>
        </div>
      </form>

      <SuggestionsComponent query={query} suggestionList={suggestionList} />
    </div>
  );
};

export default SearchVideoComponent;
