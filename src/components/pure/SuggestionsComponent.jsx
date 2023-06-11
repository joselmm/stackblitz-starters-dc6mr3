import React from 'react';
const SuggestionsComponent = ({ suggestionList, query }) => {
  //console.log(query);
  function renderSuggestions() {
    const elementArray = [];
    suggestionList.forEach((s, idx) => {
      var cut = s.slice(query.length);
      elementArray.push(
        <li key={idx} className="list-group-item p-0 pl-1">
          <span>
            <b>{query}</b>
            {cut}
          </span>
        </li>
      );
    });

    return elementArray;
  }

  return (
    <div>
      <ul className="list-group">{renderSuggestions()}</ul>
    </div>
  );
};

export default SuggestionsComponent;
