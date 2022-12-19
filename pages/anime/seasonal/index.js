import Footer from "../../../src/sub-components/Footer";
import Navbar from "../../../src/sub-components/Navbar";
import AnimeSeasonal from "../../../src/components/AnimeSeasonal";
import { useState } from "react";

export default function Seasonal({ prevRoute }) {
  const [card, setCard] = useState(true)
  return (
    <>
      <Navbar tiles={true} card={card} setCard={setCard} searchOn={false} prevRoute={prevRoute} />
      <AnimeSeasonal card={card} setCard={setCard}/>
      <Footer />
    </>
  );
}
