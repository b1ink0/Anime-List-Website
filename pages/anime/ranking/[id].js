import { useRouter } from "next/router";
import Footer from "../../../src/sub-components/Footer";
import Navbar from "../../../src/sub-components/Navbar";
import NotFound from "../../../src/sub-components/NotFound";
import RankingMain from "../../../src/components/AnimeRankingMain";
import { useStateContext } from "../../../src/context/StateContext";
import { useState } from "react";

export default function Ranking({ prevRoute }) {
  const {
    rankingList,
    setRankingList,
    rankingListScroll,
    setRankingListScroll,
  } = useStateContext();
  const router = useRouter();
  //
  if (!["upcoming", "movie", "all", "airing"].includes(router.query.id))
    return (
      <>
        <Navbar searchOn={true} prevRoute={prevRoute} />
        <NotFound />
        <Footer />
      </>
    )
  //
  return (
    <>
      <Navbar tiles={true} prevRoute={prevRoute} />
      <RankingMain currentQuery={router.query.id}/>
      <Footer />
    </>
  );
}
