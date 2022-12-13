import Footer from "../../../src/sub-components/Footer";
import Navbar from "../../../src/sub-components/Navbar";
import AnimeSeasonal from "../../../src/components/AnimeSeasonal";

export default function Seasonal({ prevRoute }) {
  return (
    <>
      <Navbar searchOn={false} prevRoute={prevRoute} />
      <AnimeSeasonal/>
      <Footer />
    </>
  );
}
