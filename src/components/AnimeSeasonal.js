import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import useFunctionsClient from '../hooks/useFunctionsClient'

export default function AnimeSeasonal() {
    const { handleAnimeSeasonal, handleCurrentSeason, handleCurrentYear, handleSeasonExist } = useFunctionsClient();
    const [seasonalList, setSeasonalList] = useState([])
    const [currentYear, setCurrentYear] = useState(handleCurrentYear())
    const [currentSeason, setCurrentSeason] = useState(handleCurrentSeason())
    const [offset, setOffset] = useState(0);
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
            5,
            offset,
            "id,title,main_picture,mean"
        )
            .then((d) => {
                let tempList = seasonalList.concat(d.data)
                setSeasonalList(() => tempList)
                setOffset((offset) => offset + 5);
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
    const handleLink = (id) => {
        // setScroll(scrollDivRef.current.scrollTop);
        router.push(`/anime/${id}`);
    };
    //
    useEffect(() => {
        setFlag(true)
        handleScroll();
    }, [])
    //
    useEffect(() => {
        if (flag){
            setSeasonalList(() => [])
        }
    }, [currentYear, currentSeason])
    //
    useEffect(() => {
        if (flag && !seasonalList.length)
        {
            handleReset()
        }
    }, [seasonalList])
    //
    useEffect(() => {
        if (flag && offset == 0){
            handleScroll()
        }
    }, [offset])
    //
    return (
        <section className="relative w-full full-flex">
            <div className="flex flex-col w-full">
                <div className="flex w-full h-8 justify-evenly items-center">
                    <button className='border-2 pr-1 pl-1' onClick={() => handleYearSeasonChange("next")}>Next</button>
                    <h1>{currentYear}</h1>
                    <button className='border-2 pr-1 pl-1' onClick={() => handleYearSeasonChange("prev")}>Prev</button>
                </div>
                <div className='flex w-full h-8 justify-evenly items-center'>
                    <button className={`border-2 pr-1 pl-1 ${currentSeason === "winter" ? "bg-red-400" : ""}`} onClick={() => handleYearSeasonChange("winter")}>Winter</button>
                    <button className={`border-2 pr-1 pl-1 ${currentSeason === "spring" ? "bg-red-400" : ""}`} onClick={() => handleYearSeasonChange("spring")}>Spring</button>
                    <button className={`border-2 pr-1 pl-1 ${currentSeason === "summer" ? "bg-red-400" : ""}`} onClick={() => handleYearSeasonChange("summer")}>Summer</button>
                    <button className={`border-2 pr-1 pl-1 ${currentSeason === "fall" ? "bg-red-400" : ""}`} onClick={() => handleYearSeasonChange("fall")}>Fall</button>
                </div>
            </div>
            <div
                id="scrollableDiv"
                ref={scrollDivRef}
                className="fixed w-full top-[124px] h-[calc(100%_-_184px)]"
                style={{ overflow: "auto" }}
            >
                <InfiniteScroll
                    dataLength={seasonalList.length}
                    next={handleScroll}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    {seasonalList.length &&
                        seasonalList.map((d) => (
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
    )
}
