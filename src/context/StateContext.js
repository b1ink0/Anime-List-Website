import React, { useRef, useState } from "react";

const { useContext } = React;
const StateContext = React.createContext();

export const useStateContext = () => {
  return useContext(StateContext);
};

export const StateProvider = ({ children }) => {
  const rootRef = useRef(null);
  const [currentSearchResult, setCurrentSearchResult] = useState([]);
  const [topAiringList, setTopAiringList] = useState([])
  const [allTimeTopList, setAllTimeTopList] = useState([])
  const [topMoviesList, setTopMoviesList] = useState([])
  const [topUpcomingList, setTopUpcomingList] = useState([])
  const [rankingList, setRankingList] = useState({airing: [], all: [], moive: [], upcoming: []})
  const [rankingListScroll, setRankingListScroll] = useState({airing: 0, all: 0, moive: 0, upcoming: 0})
  const [atHome, setAtHome] = useState(true)
  const [currentQuery, setCurrentQuery] = useState("");
  const [scroll, setScroll] = useState(0);
  const [card, setCard] = useState(true)
  const values = {
    rootRef,
    currentSearchResult,
    setCurrentSearchResult,
    topAiringList,
    setTopAiringList,
    allTimeTopList,
    setAllTimeTopList,
    topMoviesList,
    setTopMoviesList,
    topUpcomingList,
    setTopUpcomingList,
    rankingList,
    setRankingList,
    rankingListScroll,
    setRankingListScroll,
    atHome,
    setAtHome,
    currentQuery,
    setCurrentQuery,
    scroll,
    setScroll,
    card,
    setCard
  };
  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
};
