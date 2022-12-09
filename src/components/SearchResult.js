import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useFunctionsClient from "../hooks/useFunctionsClient";

export default function SearchResult({
  currentSearchResult,
  setCurrentSearchResult,
  currentQuery,
  scroll,
  setScroll,
}) {
  const { handleSearchAnimeByName } = useFunctionsClient();
  const [offset, setOffset] = useState(20);
  const router = useRouter();
  const scrollDivRef = useRef(null);
  //
  const handleScroll = () => {
    handleSearchAnimeByName(
      currentQuery,
      5,
      offset,
      "id,title,main_picture,mean"
    )
      .then((d) => {
        setCurrentSearchResult((currentQuery) => currentQuery.concat(d));
        setOffset((offset) => offset + 5);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //
  const handleLink = (id) => {
    setScroll(scrollDivRef.current.scrollTop);
    router.push(`/anime/${id}`);
  };
  //
  useEffect(() => {
    console.log(currentSearchResult);
    if (scroll > 0) {
      scrollDivRef.current.scrollTop = scroll;
    }
  }, []);
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
