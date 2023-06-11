import React from 'react';
const SuggestionsComponent = ({
  btnSearchRef,
  suggestionSelectedIdx,
  inputSearchRef,
  suggestionList,
  query,
}) => {
  //console.log(query);
  function renderSuggestions() {
    const elementArray = [];
    suggestionList.forEach((s, idx) => {
      var cut = s.slice(query.length);
      var content =
        idx === suggestionSelectedIdx ? (
          <div className="bg-dark text-light">
            <span>
              {query}
              {cut}
            </span>
          </div>
        ) : (
          <span>
            <b>{query}</b>
            {cut}
          </span>
        );
      elementArray.push(
        <li
          style={{ cursor: 'default' }}
          key={idx}
          className="list-group-item p-0 pl-1"
          onClick={() => {
            /* setSuggestionSelectedIdx(idx); */
            inputSearchRef.current.value = s;
            btnSearchRef.current.click();
          }}
        >
          {content}
        </li>
      );
    });

    return elementArray;
  }

  return (
    <div className="position-absolute" style={{ zIndex: '5' }}>
      <ul className="list-group">{renderSuggestions()}</ul>
    </div>
  );
};

export default SuggestionsComponent;
