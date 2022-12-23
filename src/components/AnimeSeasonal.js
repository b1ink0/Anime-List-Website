import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useStateContext } from '../context/StateContext';
import useFunctionsClient from '../hooks/useFunctionsClient'
import NextPrevIcon from '../images/NextPrevIcon';
import Cards from '../sub-components/Cards';
import Skeleton from '../sub-components/Skeleton';

export default function AnimeSeasonal() {
    //
    const { handleAnimeSeasonal, handleCurrentSeason, handleCurrentYear, handleSeasonExist } = useFunctionsClient();
    const { card } = useStateContext()
    const [seasonalList, setSeasonalList] = useState([])
    const [currentYear, setCurrentYear] = useState(handleCurrentYear())
    const [currentSeason, setCurrentSeason] = useState(handleCurrentSeason())
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0)
    const [flag, setFlag] = useState(false)
    const scrollDivRef = useRef(null);
    const router = useRouter();
    //
    const handleSetYear = (year = currentYear) => {
        if (year == handleCurrentYear()) {
            if (handleSeasonExist(currentSeason) == true) {
                setCurrentYear(() => year)
            } else {
                setCurrentYear(() => year)
                handleSetSeason()
            }
        }
        else
            setCurrentYear(() => year)
    }
    //
    const handleSetSeason = (season = currentSeason) => {
        if (handleSeasonExist(season) == true)
            setCurrentSeason(season)
        else
            setCurrentSeason("winter")
    }
    //
    const handleYearSeasonChange = (choice) => {
        switch (choice) {
            case "prev":
                handleSetYear(currentYear - 1)
                break;
            case "next":
                if (currentYear !== handleCurrentYear() && currentYear < handleCurrentYear())
                    handleSetYear(currentYear + 1)
                break;
            case "winter":
                handleSetSeason("winter")
                break;
            case "spring":
                handleSetSeason("spring")
                break;
            case "summer":
                handleSetSeason("summer")
                break;
            case "fall":
                handleSetSeason("fall")
                break;
            default:
                break;
        }
    }
    //
    const handleScroll = () => {
        handleAnimeSeasonal(
            currentYear,
            currentSeason,
            "anime_num_list_users",
            6,
            offset,
            // "id,title,main_picture,mean,genres,start_season,status,synopsis,rank"
        )
            .then((d) => {
                let tempList = seasonalList.concat(d.data)
                setCount(seasonalList.length)
                setSeasonalList(() => tempList)
                setOffset((offset) => offset + 6);
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
        if (flag) {
            setSeasonalList(() => [])
        }
    }, [currentYear, currentSeason])
    //
    useEffect(() => {
        if (flag && !seasonalList.length) {
            handleReset()
        }
        console.log(seasonalList)
    }, [seasonalList])
    //
    useEffect(() => {
        if (flag && offset == 0) {
            handleScroll()
        }
    }, [offset])
    //
    return (
        <section className="relative w-full full-flex">
            <div className="flex flex-col w-full ranking_card mt-[var(--nav-size)]">
                <div className="flex w-full h-8 justify-evenly items-center mt-3">
                    <button className='bg-[color:var(--jet)] rounded-lg pt-1 pb-1 pr-3 pl-3' onClick={() => handleYearSeasonChange("next")}><NextPrevIcon right={false} /></button>
                    <h1 className="bg-[color:var(--jet)] rounded-lg pt-1 pb-1 pr-3 pl-3">{currentYear}</h1>
                    <button className='bg-[color:var(--jet)] rounded-lg pt-1 pb-1 pr-3 pl-3' onClick={() => handleYearSeasonChange("prev")}><NextPrevIcon /></button>
                </div>
                <div className='flex w-full h-8 justify-evenly items-center mt-2'>
                    <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-colors ${currentSeason === "winter" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => handleYearSeasonChange("winter")}>Winter</button>
                    <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-colors ${currentSeason === "spring" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => handleYearSeasonChange("spring")}>Spring</button>
                    <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-colors ${currentSeason === "summer" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => handleYearSeasonChange("summer")}>Summer</button>
                    <button className={`rounded-lg pt-1 pb-1 pr-3 pl-3 transition-colors ${currentSeason === "fall" ? "bg-[color:var(--red-border)]" : "bg-[color:var(--jet)]"}`} onClick={() => handleYearSeasonChange("fall")}>Fall</button>
                </div>
            </div>
            <div
                id="scrollableDiv"
                ref={scrollDivRef}
                className="fixed w-full top-[calc(var(--nav-size)_+_84px)] h-[calc(100%_-_208px)]"
                style={{ overflow: "auto" }}
            >
                <InfiniteScroll
                    dataLength={seasonalList.length}
                    next={handleScroll}
                    hasMore={true}
                    loader={card ? <Skeleton count={6} w={36} h={52} s={"mt-4"} /> : <Skeleton count={6} w={"full"} h={36} s={"mt-4"} />}
                    scrollableTarget="scrollableDiv"
                >
                    <Cards list={seasonalList} card={card} count={count} />
                </InfiniteScroll>
            </div>
        </section>
    )
}
