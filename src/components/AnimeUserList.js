import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useStateContext } from '../context/StateContext';
import useFunctionsClient from '../hooks/useFunctionsClient'
import Cards from '../sub-components/Cards'
import Skeleton from '../sub-components/Skeleton';
import EmptyIcon from "../images/EmptyIcon"

export default function AnimeUserList({ username }) {
    const { handleUserList } = useFunctionsClient();
    const { card } = useStateContext()
    const [list, setList] = useState([])
    const [status, setStatus] = useState("all")
    const [offset, setOffset] = useState(0)
    const [flag, setFlag] = useState(false)
    const [count, setCount] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [sort, setSort] = useState("anime_start_date")
    //
    const handleScroll = () => {
        handleUserList(
            username,
            status === "all" ? undefined : status,
            10,
            offset,
            sort
        )
            .then((d) => {
                if (d.length === 0){
                    setHasMore(false)
                } else {    
                    let tempList = list.concat(d)
                    setCount(list.length)
                    setList(() => tempList)
                    setOffset((offset) => offset + 6);
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
        if (flag && list.length !== 0) {
            setList(() => [])
        } else {
            if (!hasMore){
                console.log(status)
                setHasMore(true)
                handleReset()
            }
        }
    }, [status])
    //
    useEffect(() => {
        if (flag && !list.length) {
            handleReset()
        }
        console.log(list)
    }, [list])
    //
    useEffect(() => {
        if (flag && offset === 0) {
            handleScroll()
        }
    }, [offset])
    //
    return (
        <section className="relative w-full h-full full-flex">
            <div
                id="scrollableDiv"
                className="fixed w-full top-[var(--nav-size)] h-[calc(100%_-_124px)]"
                style={{ overflow: "auto" }}
            >
                <div className="flex flex-col w-full ranking_card">
                    <div className="flex w-full h-8 justify-evenly items-center mt-3">
                        <h1 className="bg-[color:var(--jet)] rounded-lg pt-1 pb-1 pr-3 pl-3">{username}</h1>
                    </div>
                    <div className="flex w-full h-12 pb-2 mt-3 overflow-x-auto scrollable_div">
                        <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-colors ml-5 whitespace-nowrap ${status === "all" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => setStatus(() => "all")}>All</button>
                        <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-colors ml-5 whitespace-nowrap ${status === "watching" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => setStatus(() => "watching")}>Watching</button>
                        <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-colors ml-5 whitespace-nowrap ${status === "completed" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => setStatus(() => "completed")}>Completed</button>
                        <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-colors ml-5 whitespace-nowrap ${status === "on_hold" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => setStatus(() => "on_hold")}>On Hold</button>
                        <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-colors ml-5 whitespace-nowrap ${status === "dropped" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => setStatus(() => "dropped")}>Dropped</button>
                        <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-colors ml-5 mr-5 whitespace-nowrap ${status === "plan_to_watch" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => setStatus(() => "plan_to_watch")}>Plan To Watch</button>
                    </div>
                </div>
                <InfiniteScroll
                    dataLength={list.length}
                    next={handleScroll}
                    hasMore={hasMore}
                    loader={card ? <Skeleton count={6} w={36} h={52} s={"mt-4"} /> : <Skeleton count={6} w={"full"} h={36} s={"mt-4"} />}
                    scrollableTarget="scrollableDiv"
                >
                    {
                        (list.length === 0 && hasMore === false) ?<div className="w-full h-full full-flex pt-[250px]"><EmptyIcon/></div>: ""
                    }
                    <Cards list={list} card={card} count={count} />
                </InfiniteScroll>
            </div>
        </section>
    )
}
