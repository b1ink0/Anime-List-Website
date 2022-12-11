import { useRouter } from "next/router";
import Footer from "../../../src/components/Footer";
import Navbar from "../../../src/components/Navbar";
import NotFound from "../../../src/components/NotFound";
import RankingMain from "../../../src/components/RankingMain";
import { useStateContext } from "../../../src/context/StateContext";

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
        <Navbar searchOn={false} prevRoute={prevRoute} />
        <NotFound />
        <Footer />
      </>
    )
  //
  return (
    <>
      <Navbar searchOn={false} prevRoute={prevRoute} />
      <RankingMain
        rankingList={rankingList}
        setRankingList={setRankingList}
        rankingListScroll={rankingListScroll}
        setRankingListScroll={setRankingListScroll}
        currentQuery={router.query.id}
      />
      <Footer />
    </>
  );
}
