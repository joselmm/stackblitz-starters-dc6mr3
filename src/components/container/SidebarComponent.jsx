import React, { useContext } from 'react';
import PlaylistItemComponent from '../pure/PlaylistItemComponent';

const SideBarContext = React.createContext();

const PlaylistComponent = () => {
  const state = useContext(SideBarContext);

  return (
    <div>
      {state.playlist.map((item, idx) => (
        <PlaylistItemComponent key={idx} itemInfo={item} />
      ))}
    </div>
  );
};

const SidebarComponent = (props) => {
  return (
    <SideBarContext.Provider value={props}>
      <div className="col-3 bg-primary">
        <PlaylistComponent />
      </div>
    </SideBarContext.Provider>
  );
};

export default SidebarComponent;
