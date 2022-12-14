import Head from "next/head";
import Footer from "../src/sub-components/Footer";
import Navbar from "../src/sub-components/Navbar";
import Ranking from "../src/components/AnimeRankingHome";
import { useStateContext } from "../src/context/StateContext";

export default function Home() {
  const {
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
    atHome,
    setAtHome,
    currentQuery,
    setCurrentQuery,
    scroll,
    setScroll,
  } = useStateContext();

  return (
    <>
      <Head>
        <title>AnimeVoid</title>
        <meta name="description" content="Keep Track Of Animes Using AnimeVoid!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Ranking />
      <Footer />
    </>
  );
}
