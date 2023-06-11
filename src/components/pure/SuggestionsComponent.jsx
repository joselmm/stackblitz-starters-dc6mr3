import React from 'react';
const SuggestionsComponent = ({
  suggestionSelectedIdx,
  suggestionList,
  query,
}) => {
  //console.log(query);
  function renderSuggestions() {
    const elementArray = [];
    suggestionList.forEach((s, idx) => {
      var cut = s.slice(query.length);
      var content =
        idx === suggestionSelectedIdx && suggestionSelectedIdx != 0 ? (
          <span className="bg-dark">
            {query}
            {cut}
          </span>
        ) : (
          <span>
            <b>{query}</b>
            {cut}
          </span>
        );
      elementArray.push(
        <li key={idx} className="list-group-item p-0 pl-1">
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
