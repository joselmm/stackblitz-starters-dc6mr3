import React, { useRef, useEffect, useState } from 'react';
import etiquetarNumero from '../../models/etiquetarNumero.function';
import VideoCardInfo from '../../models/VideoCardInfo.class';
import SuggestionsComponent from './SuggestionsComponent.jsx';

//import fetch from 'node-fetch';

const SearchVideoComponent = ({ setVideos, playlist }) => {
  /* suggestion list state */

  const [suggestionList, setSuggestionList] = useState([]);
  const [query, setQuery] = useState('');
  let [suggestionSelectedIdx, setSuggestionSelectedIdx] = useState(0);
  const inputSearchRef = useRef();
  const btnSearchRef = useRef();

  /* functiion to search videos */
  async function searchVideos(e) {
    console.log('ejecutando busqueda');
    e.preventDefault();
    /* if the input is empty then nothing is going to execute */
    if (inputSearchRef.current.value === '') return;

    /* set suggestionList value as an empty array */
    setSuggestionList([]);
    /* disable button */
    btnSearchRef.current.disabled = true;
    /* inputSearchRef.current.value */

    var encodedQuery = encodeURIComponent(query);
    console.log(encodedQuery);
    var searchResults = await fetch(
      `https://wlkkpr-3000.csb.app/search-yt/${encodedQuery}/12/1`
    )
      .then((res) => res.json())
      .then((res) => res);
    const tempArray = [];
    for (let videoItem of searchResults) {
      if (videoItem.type != 'video') continue;

      let addedToPlayList = false;

      for (let playlistItem of playlist) {
        if (playlistItem.videoId === videoItem.id) {
          // console.log(playlistItem);
          addedToPlayList = true;
          //break;
        }
      }
      const videoCardInfo = new VideoCardInfo({
        title: videoItem.title,
        poster: `https://i.ytimg.com/vi/${videoItem.id}/0.jpg`,
        addedToPlayList: addedToPlayList,
        videoId: videoItem.id,
        duration: videoItem.durationFormatted,
        views: etiquetarNumero(videoItem.views),
      });
      //console.log(videoCardInfo);
      tempArray.push(videoCardInfo);
    }
    /* console.log(tempArray.slice(0, 5)); */
    setVideos(tempArray);
    /* disable button */
    btnSearchRef.current.disabled = false;
  }

  /* Function that retrieves and renders search suggestions.*/

  async function suggestions() {
    /**
     * No, la función setQuery no es asíncrona. Es una función síncrona que actualiza el estado de forma inmediata. Sin embargo, ten en cuenta que en React, la actualización del estado es un proceso asincrónico. Cuando llamas a una función para actualizar el estado, React no actualiza el estado inmediatamente, sino que encola la actualización y la realiza de forma asincrónica en un momento posterior.
     *
     * POR ESTO USO inputSearchRef.current.value en lugar de query
     */
    setQuery(inputSearchRef.current.value);
    //console.log(query);
    if (inputSearchRef.current.value === '') {
      setSuggestionList([]);
      return;
    }
    const encodedQuery = encodeURIComponent(inputSearchRef.current.value);
    /* https://wlkkpr-3000.csb.app/suggestions/harry */
    /* const uri = `https://script.google.com/macros/s/AKfycbyn-92JTOxCjFR-U3zFUB4GOhoUp06zomignavKvCx_oP2T_I2sii-7kf57X6xs9krO/exec?query=${encodedQuery}`; */
    const uri = `https://wlkkpr-3000.csb.app/suggestions/${encodedQuery}`;
    await fetch(uri)
      .then((res) => res.text())
      .then((text) => {
        const regex = /\(.+\)/;
        const sugs = text.match(regex)[0];
        const json = sugs.slice(1, sugs.length - 1);
        var items = JSON.parse(json)[1];

        var sugerencias = items.map((s) => s[0]);
        /* console.log(sugerencias); */
        if (inputSearchRef.current.value != '') {
          setSuggestionList(sugerencias);
        }
      });
  }
  /* watch changes of suggestionList state */
  useEffect(() => {
    console.log(`cambio estado de suggestionList`);
    setSuggestionSelectedIdx(-1);
  }, [suggestionList]);
  /* watch changes of suggestionSelectedIdx state */
  useEffect(() => {
    console.log(
      `cambio de estado de suggestionSelectedIdx: ${suggestionSelectedIdx}`
    );
    if (suggestionSelectedIdx >= 0) {
      console.log(suggestionSelectedIdx);
      inputSearchRef.current.value =
        suggestionList[suggestionSelectedIdx] || '';

      setTimeout(() => {
        inputSearchRef.current.focus();
        inputSearchRef.current.selectionStart =
          suggestionList[suggestionSelectedIdx]?.length ||
          inputSearchRef.current.value.length;
        inputSearchRef.current.selectionEnd =
          suggestionList[suggestionSelectedIdx]?.length ||
          inputSearchRef.current.value.length;
      }, 0);
      console.log(
        inputSearchRef.current.selectionStart,
        inputSearchRef.current.selectionEnd
      );
    }
  }, [suggestionSelectedIdx]);

  /* event listener of keydown */
  function handleKeyDown(e) {
    if (suggestionList.length === 0) return;
    if (e.key === 'ArrowDown') {
      setSuggestionSelectedIdx((prevIdx) =>
        prevIdx < suggestionList.length - 1 ? prevIdx + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      setSuggestionSelectedIdx((prevIdx) =>
        prevIdx > 0 ? prevIdx - 1 : suggestionList.length - 1
      );
    }
  }

  return (
    <div className="col-6">
      <form onSubmit={(e) => searchVideos(e)} className="input-group">
        <input
          /* disabled */
          onChange={suggestions}
          onKeyDown={handleKeyDown}
          ref={inputSearchRef}
          type="search"
          className="form-control"
          /* placeholder="Search a video" */
        />
        <div className="input-group-append">
          <button
            ref={btnSearchRef}
            type="submit"
            className="input-group-text bg-success text-light cursor-pointer"
            id="basic-addon2"
          >
            Search
          </button>
        </div>
      </form>

      <SuggestionsComponent
        inputSearchRef={inputSearchRef}
        btnSearchRef={btnSearchRef}
        setSuggestionSelectedIdx={setSuggestionSelectedIdx}
        suggestionSelectedIdx={suggestionSelectedIdx}
        query={query}
        suggestionList={suggestionList}
      />
    </div>
  );
};

export default SearchVideoComponent;
