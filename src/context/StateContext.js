import React, { useRef, useState } from "react";

const { useContext } = React;
const StateContext = React.createContext();

export const useStateContext = () => {
  return useContext(StateContext);
};

export const StateProvider = ({ children }) => {
  const rootRef = useRef(null);
  const [currentSearchResult, setCurrentSearchResult] = useState([]);
  const [atHome, setAtHome] = useState(true)
  const [currentQuery, setCurrentQuery] = useState("");
  const [scroll, setScroll] = useState(0);
  const values = {
    rootRef,
    currentSearchResult,
    setCurrentSearchResult,
    atHome,
    setAtHome,
    currentQuery,
    setCurrentQuery,
    scroll,
    setScroll,
  };
  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
};
