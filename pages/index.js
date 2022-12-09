import Head from "next/head";
import { useEffect } from "react";
import Footer from "../src/components/Footer";
import Navbar from "../src/components/Navbar";
import Ranking from "../src/components/Ranking";
import SearchResult from "../src/components/SearchResult";
import { useStateContext } from "../src/context/StateContext";
import useFunctionsClient from "../src/hooks/useFunctionsClient";

export default function Home() {
  const {
    currentSearchResult,
    setCurrentSearchResult,
    atHome, setAtHome,
    currentQuery,
    setCurrentQuery,
    scroll,
    setScroll,
  } = useStateContext();

  return (
    <>
      <Head>
        <title>WatashiNoAnimeList</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        setCurrentSearchResult={setCurrentSearchResult}
        currentSearchResult={currentSearchResult}
        currentQuery={currentQuery}
        setCurrentQuery={setCurrentQuery}
        setAtHome={setAtHome}
      />
      {atHome ? <Ranking /> :
        <SearchResult
          currentSearchResult={currentSearchResult}
          setCurrentSearchResult={setCurrentSearchResult}
          currentQuery={currentQuery}
          scroll={scroll}
          setScroll={setScroll}
        />}
      <Footer setCurrentSearchResult={setCurrentSearchResult}
        setCurrentQuery={setCurrentQuery}
        setAtHome={setAtHome} />
    </>
  );
}
