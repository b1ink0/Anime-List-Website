import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useFunctionsClient from "../hooks/useFunctionsClient";

export default function RankingMain({
    rankingList,
    setRankingList,
    currentQuery,
    rankingListScroll,
    setRankingListScroll,
}) {
    const { handleAnimeRanking } = useFunctionsClient();
    const [offset, setOffset] = useState(100);
    const [list, setList] = useState([])
    const router = useRouter();
    const scrollDivRef = useRef(null);
    //
    const handleRankingListUpdate = (tempList) => {
        if (currentQuery == "airing")
            setRankingList(rankingList => ({ ...rankingList, airing: tempList }));
        if (currentQuery == "all")
            setRankingList(rankingList => ({ ...rankingList, all: tempList }));
        if (currentQuery == "upcoming")
            setRankingList(rankingList => ({ ...rankingList, upcoming: tempList }));
        if (currentQuery == "movie")
            setRankingList(rankingList => ({ ...rankingList, movie: tempList }));
    }
    //
    const handleScroll = () => {
        handleAnimeRanking(
            currentQuery,
            5,
            offset,
            "id,title,main_picture,mean"
        )
            .then((d) => {
                console.log(d, offset)
                let tempList = rankingList[currentQuery].concat(d.data)
                console.log(rankingList);
                handleRankingListUpdate(tempList)
                setOffset((offset) => offset + 5);
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
    useEffect(() => {
        console.log(rankingList);
        handleScroll();
        // if (scroll > 0) {
        //     scrollDivRef.current.scrollTop = scroll;
        // }
    }, []);
    //
    useEffect(()=>{
        setList(rankingList[currentQuery])
    },[rankingList])
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
                    dataLength={list.length}
                    next={handleScroll}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    {list.length &&
                        list.map((d) => (
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
