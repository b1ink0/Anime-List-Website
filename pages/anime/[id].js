import { useRouter } from "next/router";
import Footer from "../../src/sub-components/Footer";
import Navbar from "../../src/sub-components/Navbar";
import AnimeDetails from "../../src/components/AnimeDetails";
import { useStateContext } from "../../src/context/StateContext";

export default function Anime({ prevRoute }) {
  const router = useRouter();
  return (
    <>
      <Navbar prevRoute={prevRoute} />
      {router.query.id && <AnimeDetails animeId={router.query.id} />}
      <Footer />
    </>
  );
}
