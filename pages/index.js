import Head from "next/head";
import Footer from "../src/sub-components/Footer";
import Navbar from "../src/sub-components/Navbar";
import Ranking from "../src/components/AnimeRankingHome";
import { useStateContext } from "../src/context/StateContext";

export default function Home() {
  const {
    card,
    setCard
  } = useStateContext();

  return (
    <>
      <Head>
        <title>AnimeVoid</title>
        <meta name="description" content="Keep Track Of Animes Using AnimeVoid!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar card={card} setCard={setCard}/>
      <Ranking />
      <Footer />
    </>
  );
}
