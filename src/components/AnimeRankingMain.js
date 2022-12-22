import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useStateContext } from "../context/StateContext";
import useFunctionsClient from "../hooks/useFunctionsClient";
import Cards from "../sub-components/Cards";
import Skeleton from "../sub-components/Skeleton";

export default function RankingMain({
    currentQuery
}) {
    const { handleAnimeRanking } = useFunctionsClient();
    const { card } = useStateContext()
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0)
    const [rankingList, setRankingList] = useState([])
    const [flag, setFlag] = useState(false)
    const router = useRouter();
    const scrollDivRef = useRef(null);
    //
    const handleScroll = () => {
        handleAnimeRanking(
            currentQuery,
            6,
            offset,
        )
            .then((d) => {
                console.log(d, offset)
                let tempList = rankingList.concat(d.data)
                console.log(rankingList);
                setCount(rankingList.length)
                setRankingList(() => tempList)
                setOffset((offset) => offset + 6);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //
    const handleLink = (id) => {
        // setScroll(scrollDivRef.current.scrollTop);
        router.push(`/anime/${id}`);
    };
    //
    const handleReset = () => {
        setOffset(0)
    }
    //
    useEffect(() => {
        setFlag(true)
        handleScroll();
    }, [])
    //
    useEffect(() => {
        if (flag) {
            setRankingList(() => [])
        }
    }, [currentQuery])
    //
    useEffect(() => {
        if (flag && !rankingList.length) {
            handleReset()
        }
        console.log(rankingList)
    }, [rankingList])
    //
    useEffect(() => {
        if (flag && offset == 0) {
            handleScroll()
        }
    }, [offset])
    //
    return (
        <section className="relative w-full full-flex">
            <div
                id="scrollableDiv"
                ref={scrollDivRef}
                className="flex flex-col items-center fixed w-full top-[var(--nav-size)] h-[calc(100%_-_120px)]"
                style={{ overflow: "auto" }}
            >
                <div className="w-full flex justify-evenly items-center">
                    <h1 onClick={() => handleLink("ranking/airing")} className={`capitalize w-fit rounded-lg pt-1 pb-1 pr-3 pl-3 mt-3 ${currentQuery === "airing" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`}>Airing</h1>
                    <h1 onClick={() => handleLink("ranking/all")} className={`capitalize w-fit rounded-lg pt-1 pb-1 pr-3 pl-3 mt-3 ${currentQuery === "all" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`}>All</h1>
                    <h1 onClick={() => handleLink("ranking/movie")} className={`capitalize w-fit rounded-lg pt-1 pb-1 pr-3 pl-3 mt-3 ${currentQuery === "movie" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`}>Movies</h1>
                    <h1 onClick={() => handleLink("ranking/upcoming")} className={`capitalize w-fit rounded-lg pt-1 pb-1 pr-3 pl-3 mt-3 ${currentQuery === "upcoming" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`}>Upcoming</h1>
                </div>
                <InfiniteScroll
                    dataLength={rankingList.length}
                    next={handleScroll}
                    hasMore={true}
                    loader={card ? <Skeleton count={6} w={36} h={52} s={"mt-4"} /> : <Skeleton count={6} w={"full"} h={36} s={"mt-4"} />}
                    scrollableTarget="scrollableDiv"
                >
                    <Cards list={rankingList} card={card} rate={false} count={count}/>
                </InfiniteScroll>
            </div>
        </section>
    );
}
