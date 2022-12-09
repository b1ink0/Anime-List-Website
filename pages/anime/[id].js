import { useRouter } from "next/router";
import Footer from "../../src/components/Footer";
import Navbar from "../../src/components/Navbar";
import AnimeDetails from "../../src/components/AnimeDetails";
import { useStateContext } from "../../src/context/StateContext";

export default function Anime({ prevRoute }) {
  const router = useRouter();
  return (
    <>
      <Navbar searchOn={false} prevRoute={prevRoute} />
      {router.query.id && <AnimeDetails animeId={router.query.id} />}
      <Footer />
    </>
  );
}
