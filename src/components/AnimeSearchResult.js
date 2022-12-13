import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useFunctionsClient from "../hooks/useFunctionsClient";

export default function AnimeSearchResult({ currentQuery }){
  //
  const { handleSearchAnimeByName } = useFunctionsClient();
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
      5,
      offset,
      "id,title,main_picture,mean"
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
        setOffset((offset) => offset + 5);
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
  useEffect(() => {
    console.log(currentSearchResult);
    handleScroll()
    setFlag(true)
  }, []);
  //
  useEffect(() => {
    if (flag){
      console.log("HMM")
      setCurrentSearchResult(() => [])
    }
  }, [currentQuery])
  //
  useEffect(() => {
    if (flag && currentSearchResult.length === 0){
      setOffset(() => 0)
    }
  }, [currentSearchResult])
  //
  useEffect(() => {
    if (flag && offset === 0){
      console.log("OFFSET")
      handleScroll()
    }
  }, [offset])
  //
  return (
    <section className="relative w-full full-flex">
      <div
        id="scrollableDiv"
        ref={scrollDivRef}
        className="fixed w-full top-[60px] h-[calc(100%_-_120px)]"
        style={{ overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={currentSearchResult.length}
          next={handleScroll}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {currentSearchResult.length &&
            currentSearchResult.map((d) => (
              <div
                onClick={() => handleLink(d.node.id)}
                key={Math.random()}
                className="w-full full-flex flex-col"
              >
                <img
                  width="200px"
                  height="200px"
                  src={d.node.main_picture.medium}
                  alt={d.node.title}
                />
                <h1>{d.node.title}</h1>
              </div>
            ))}
        </InfiniteScroll>
      </div>
    </section>
  );
}