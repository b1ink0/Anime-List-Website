import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useFunctionsClient from "../hooks/useFunctionsClient";
import Tiles_1Icon from "../images/Tiles_1Icon";
import Tiles_2Icon from "../images/Tiles_2Icon";
import Skeleton from "../sub-components/Skeleton";

export default function AnimeSearchResult({ currentQuery }) {
  //
  const { handleSearchAnimeByName } = useFunctionsClient();
  const [currentSearchResult, setCurrentSearchResult] = useState([])
  const [card, setCard] = useState(true)
  const [offset, setOffset] = useState(0);
  const [flag, setFlag] = useState(false)
  const router = useRouter();
  const scrollDivRef = useRef(null);
  //
  const handleScroll = () => {
    console.log("offset: ", offset)
    handleSearchAnimeByName(
      currentQuery,
      6,
      offset,
      // "id,title,main_picture,mean,genres,start_season,status,synopsis,rank"
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
        setOffset((offset) => offset + 6);
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
  const handleCardState = () => {
    setCard(() => !card)
    localStorage.setItem("card_state", JSON.stringify(!card))
  }
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
  useEffect(() => {
    const ls = localStorage.getItem("card_state")
    if (ls !== null) {
      setCard(() => JSON.parse(ls))
    } else {
      localStorage.setItem("card_state", "true")
      console.log(ls)
    }
  }, [])
  //
  return (
    <section className="relative w-full h-full full-flex">
      <div
        id="scrollableDiv"
        ref={scrollDivRef}
        className="fixed w-full top-[var(--nav-size)] h-[calc(100%_-_120px)]"
        style={{ overflow: "auto" }}
      >
        <button className="mt-3" onClick={() => handleCardState()}>
          {
            card ? <Tiles_2Icon /> : <Tiles_1Icon />
          }
        </button>
        <InfiniteScroll

          dataLength={currentSearchResult.length}
          next={handleScroll}
          hasMore={true}
          loader={card ? <Skeleton count={6} w={36} h={52} s={"mt-4"} /> : <Skeleton count={6} w={"full"} h={36} s={"mt-4"} />}
          scrollableTarget="scrollableDiv"
        >
          {currentSearchResult.map((d, i) => (
            <div
              onClick={() => handleLink(d.node.id)}
              key={Math.random()}
              className={`${card ? "w-36 h-52 flex-col full-flex" : "w-full flex justify-start align-top h-36"} mt-4 overflow-hidden relative rounded-lg border-[2px] border-[color:var(--red-border)]`}
            >
              <img
                className={`${card ? "w-36 flex-col absolute top-0 translate-y-[0px] scale-[1.15]" : "w-24 border-r-2 border-r-[color:var(--red-border)]"}   transition-opacity  select-none drag-none`}
                src={d.node.main_picture.medium}
                alt={d.node.title}
              />
              {card &&
                <h1 className="w-12 h-6 bottom-8 bg-[color:var(--black)] rounded-tl-lg absolute right-0">{d.node.mean}</h1>
              }
              <div className={`${card ? "w-full bottom-0 absolute h-8" : "w-full flex justify-end items-end flex-col-reverse"} bg-[color:var(--black)]`}>
                {!card &&
                  <div className="w-full overflow-auto pl-2 pr-2">
                    <div className="w-full flex justify-between">
                      <h1 className="w-12 h-6 bg-[color:var(--black)] rounded-tl-lg">#{d.node.rank}</h1>
                      <h1 className="w-12 h-6 bg-[color:var(--black)] rounded-tl-lg mr-2">⭐{d.node.mean}</h1>
                    </div>
                    {
                      d.node.start_season.year && d.node.start_season.season &&
                      <h3 className="w-full text-left">Season: {d.node.start_season.year}  {d.node.start_season.season}</h3>
                    }
                    <div className="flex flex-wrap">
                      {d.node.genres.length && d.node.genres.map((genre) => <h3 key={Math.random()} className="mr-2 bg-[color:var(--red-border)] pr-3 pl-3 mt-1 rounded-3xl">{genre.name}</h3>)}
                    </div>
                  </div>
                }
                <div className="w-full relative h-2 overflow-hidden border-t-2 border-b-2 border-t-[color:var(--red-border)] border-b-[color:var(--red-border)]">
                  <div className="rate h-[4px] w-full" ></div>
                  <div className="absolute bg-[color:var(--black)] h-[4px] top-0 right-0" style={{ width: `${100 - d.node.mean * 10}%` }}></div>
                </div>
                <h1 className={`${card ? "truncate h-7" : ""} w-full pb-1 pl-1 pr-1`}>{d.node.title}</h1>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </section>
  );
}