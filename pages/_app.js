import { useEffect } from "react";
import { useRouter } from "next/router";
import { StateProvider } from "../src/context/StateContext";
import "../styles/globals.scss";
import "../styles/Ratings.scss";
import "../styles/Scroll.scss"
import "../styles/Skeleton.scss"
import "../styles/Ranking.scss"
import "../styles/Search.scss"
import 'react-loading-skeleton/dist/skeleton.css'

let prevRoute;
let currentRoute;
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  currentRoute = router.pathname;
  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      prevRoute = currentRoute;
      currentRoute = url;
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  });
  return (
    <StateProvider>
      <Component {...pageProps} prevRoute={prevRoute} />
    </StateProvider>
  );
}

export default MyApp;
