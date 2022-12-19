import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useStateContext } from "../context/StateContext";
import useFunctionsClient from "../hooks/useFunctionsClient";
import Cards from "../sub-components/Cards";
import Skeleton from "../sub-components/Skeleton";

export default function AnimeSearchResult({ currentQuery }) {
  //
  const { handleSearchAnimeByName } = useFunctionsClient();
  const { card } = useStateContext()
  const [currentSearchResult, setCurrentSearchResult] = useState([])
  const [offset, setOffset] = useState(0);
  const [flag, setFlag] = useState(false)
  const router = useRouter();
  const scrollDivRef = useRef(null);
  //
  const handleScroll = () => {
    console.log("offset: ", offset)
    handleSearchAnimeByName(
      currentQuery,
      10,
      offset,
      "id,title,main_picture,mean,genres,start_season,status,synopsis,rank"
    )
      .then((d) => {
        let tempResult = currentSearchResult.concat(d)
        tempResult = tempResult.filter((value, index) => {
          const _value = JSON.stringify(value);
          return index === tempResult.findIndex(obj => {
            return JSON.stringify(obj) === _value;
          });
        });
        setCurrentSearchResult(() => tempResult);
        setOffset((offset) => offset + 10);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //
  const handleLink = (id) => {
    router.push(`/anime/${id}`);
  };
  //
  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  //
  useEffect(() => {
    console.log(currentSearchResult);
    handleScroll()
    setFlag(true)
  }, []);
  //
  useEffect(() => {
    if (flag) {
      console.log("HMM")
      setCurrentSearchResult(() => [])
    }
  }, [currentQuery])
  //
  useEffect(() => {
    if (flag && currentSearchResult.length === 0) {
      setOffset(() => 0)
    }
  }, [currentSearchResult])
  //
  useEffect(() => {
    if (flag && offset === 0) {
      console.log("OFFSET")
      handleScroll()
    }
  }, [offset])
  //
  return (
    <section className="relative w-full h-full full-flex">
      <div
        id="scrollableDiv"
        ref={scrollDivRef}
        className="fixed w-full top-[var(--nav-size)] h-[calc(100%_-_120px)]"
        style={{ overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={currentSearchResult.length}
          next={handleScroll}
          hasMore={true}
          loader={card ? <Skeleton count={6} w={36} h={52} s={"mt-4"} /> : <Skeleton count={6} w={"full"} h={36} s={"mt-4"} />}
          scrollableTarget="scrollableDiv"
        >
          <Cards list={currentSearchResult} card={card} />
        </InfiniteScroll>
      </div>
    </section>
  );
}