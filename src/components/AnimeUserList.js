import React, { useEffect, useRef, useState, useTransition } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useStateContext } from '../context/StateContext';
import useFunctionsClient from '../hooks/useFunctionsClient'
import Cards from '../sub-components/Cards'
import Skeleton from '../sub-components/Skeleton';
import EmptyIcon from "../images/EmptyIcon"
import FilterIcon from '../images/FilterIcon';
import CloseIcon from '../images/CloseIcon';

export default function AnimeUserList({ username }) {
    const { handleUserList } = useFunctionsClient();
    const { card } = useStateContext()
    const refScroll = useRef(null)
    const [list, setList] = useState([])
    const [status, setStatus] = useState("all")
    const [offset, setOffset] = useState(0)
    const [flag, setFlag] = useState(false)
    const [count, setCount] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [userExist, setUserExist] = useState(true)
    const [sortDisplay, setSortDisplay] = useState(false)
    const [sort, setSort] = useState("anime_start_date")
    const [isPendingStatus, startTransitionStatus] = useTransition();
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
                console.log(d)
                if (d.error) {
                    setUserExist(false)
                } else {
                    if (d.data.length === 0) {
                        setHasMore(false)
                    } else {
                        let tempList = list.concat(d.data)
                        setHasMore(true)
                        setCount(list.length)
                        setList(() => tempList)
                        setOffset((offset) => offset + 6);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //
    const handleStatusChange = (status) => {
        console.log(isPendingStatus)
        startTransitionStatus(() => {
            setList([])
            setStatus(status)
            setOffset(0)
        })
    }
    //
    const handleSortChange = (status) => {
        console.log(isPendingStatus)
        startTransitionStatus(() => {
            setList([])
            setSort(status)
            setOffset(0)
        })
    }
    //
    const handleSortDisplay = (flag) => {
        if (flag)
            setSortDisplay(true)
        else
            setSortDisplay(false)
    }
    //
    useEffect(() => {
        setFlag(true)
        // handleScroll();
    }, [])
    //
    useEffect(() => {
        console.log("ue", isPendingStatus, status, offset, list)
        if (!isPendingStatus) {
            if (refScroll !== null) {
                if (refScroll.current !== null) {
                    refScroll.current.scrollTop = 0
                }
            }
            handleScroll()
        }
    }, [isPendingStatus])
    //
    return (
        <section className="relative w-full h-full full-flex flex-col">
            <div className="flex flex-col w-full ranking_card mt-[var(--nav-size)] relative">
                <div className="flex w-full h-8 justify-evenly items-center mt-3 relative">
                    <h1 className="bg-[color:var(--jet)] rounded-lg pt-1 pb-1 pr-3 pl-3">User: {username}</h1>
                    <button className="absolute right-6" onClick={() => handleSortDisplay(!sortDisplay)}>
                        {
                            sortDisplay ? <CloseIcon /> : <FilterIcon />
                        }
                    </button>
                </div>
                {
                    !sortDisplay ?
                        <div className="flex w-full h-12 pb-2 mt-3 overflow-x-auto scrollable_div">
                            <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-all ml-5 whitespace-nowrap ${status === "all" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => handleStatusChange("all")}>All</button>
                            <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-all ml-5 whitespace-nowrap ${status === "watching" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => handleStatusChange("watching")}>Watching</button>
                            <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-all ml-5 whitespace-nowrap ${status === "completed" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => handleStatusChange("completed")}>Completed</button>
                            <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-all ml-5 whitespace-nowrap ${status === "on_hold" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => handleStatusChange("on_hold")}>On Hold</button>
                            <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-all ml-5 whitespace-nowrap ${status === "dropped" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => handleStatusChange("dropped")}>Dropped</button>
                            <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-all ml-5 mr-5 whitespace-nowrap ${status === "plan_to_watch" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => handleStatusChange("plan_to_watch")}>Plan To Watch</button>
                        </div>
                        :
                        <div className="flex w-full h-12 pb-2 mt-3 overflow-x-auto scrollable_div">
                            <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-all ml-5 whitespace-nowrap ${sort === "anime_start_date" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => handleSortChange("anime_start_date")}>Anime Start Time</button>
                            <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-all ml-5 whitespace-nowrap ${sort === "anime_title" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => handleSortChange("anime_title")}>Anime Title</button>
                            <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-all ml-5 whitespace-nowrap ${sort === "list_score" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => handleSortChange("list_score")}>List Score</button>
                            <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-all ml-5 mr-5 whitespace-nowrap ${sort === "list_updated_at" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => handleSortChange("list_updated_at")}>List Updated At</button>
                        </div>
                }
            </div>
            {
                userExist ?
                    <div
                        id="scrollableDiv"
                        className="fixed w-full top-[calc(var(--nav-size)_+_104px)] h-[calc(100%_-_228px)]"
                        ref={refScroll}
                        style={{ overflow: "auto" }}
                    >
                        <InfiniteScroll
                            dataLength={list.length}
                            next={handleScroll}
                            hasMore={hasMore}
                            loader={card ? <Skeleton count={6} w={36} h={52} s={"mt-4"} /> : <Skeleton count={6} w={"full"} h={36} s={"mt-4"} />}
                            scrollableTarget="scrollableDiv"
                        >
                            {
                                (list.length === 0 && hasMore === false) ? <div className="w-full h-full full-flex pt-[250px]"><EmptyIcon /></div> :
                                    <Cards list={list} card={card} count={count} rate={false}/>
                            }
                        </InfiniteScroll>
                    </div> : <h1 className="ranking_card mt-[250px]">User Not Found!</h1>
            }
        </section>
    )
}
