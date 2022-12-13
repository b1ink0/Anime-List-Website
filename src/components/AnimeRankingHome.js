import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import useFunctionsClient from '../hooks/useFunctionsClient'
import ArrowIcon from '../images/ArrowIcon';
import Skeleton from 'react-loading-skeleton'
import { useStateContext } from '../context/StateContext';

function Ranking() {
    const { topAiringList,
        setTopAiringList,
        allTimeTopList,
        setAllTimeTopList,
        topMoviesList,
        setTopMoviesList,
        topUpcomingList,
        setTopUpcomingList } = useStateContext()
    const { handleAnimeRanking, handleTextCrop } = useFunctionsClient();
    const router = useRouter();
    //
    const handleLink = (id) => {
        // setScroll(scrollDivRef.current.scrollTop);
        router.push(`/anime/${id}`);
    };
    //
    useEffect(() => {
        handleAnimeRanking("airing", 10)
            .then((d) => {
                console.log(d.data);
                setTopAiringList(d.data)
            })
            .catch((err) => {
                console.log(err);
            });
        handleAnimeRanking("all", 10)
            .then((d) => {
                console.log(d.data);
                setAllTimeTopList(d.data)
            })
            .catch((err) => {
                console.log(err);
            });
        handleAnimeRanking("movie", 10)
            .then((d) => {
                console.log(d.data);
                setTopMoviesList(d.data)
            })
            .catch((err) => {
                console.log(err);
            });
        handleAnimeRanking("upcoming", 10)
            .then((d) => {
                console.log(d.data);
                setTopUpcomingList(d.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
    //
    return (
        <section className="bg-[color:var(--black)] relative w-full full-flex flex-col mb-[60px]">
            <div className="full-flex flex-col">
                <h4 className="mt-3 mb-3 rounded-full border-2 w-40 border-[color:var(--red-border)]">Top Airing</h4>
                <div className='flex w-screen overflow-x-auto scrollable_div pb-3'>
                    <div className="flex h-48">
                        {topAiringList.length ?
                            topAiringList.map((d) => (
                                <div
                                    onClick={() => handleLink(d.node.id)}
                                    key={Math.random()}
                                    className="w-28 h-48 ml-3 overflow-hidden relative full-flex flex-col rounded-lg border-2 border-[color:var(--red-border)]"
                                >
                                    <img
                                        className="w-28 translate-y-[0px] scale-[1.15] absolute top-0"
                                        src={d.node.main_picture.medium}
                                        alt={d.node.title}
                                    />
                                    <h1 className="w-full h-7 pb-1 pl-1 pr-1 absolute bottom-0 bg-[color:var(--black)] truncate border-t-2 border-[color:var(--red-border)]">{handleTextCrop(d.node.title, 15)}</h1>
                                </div>
                            )) : <h4>Loading...</h4>}
                        {topAiringList.length && (
                            <div
                                onClick={() => handleLink("ranking/airing")}
                                className="w-28 h-auto full-flex flex-col"
                            >
                                <div className="w-12 h-12 full-flex rounded-xl border-2 border-[color:var(--red-border)]">
                                    <ArrowIcon />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="full-flex flex-col">
                <h4 className="mt-3 mb-3 rounded-full border-2 w-40 border-[color:var(--red-border)]">All Time Top</h4>
                <div className='flex w-screen overflow-x-auto scrollable_div pb-3'>
                    <div className="flex h-48">
                        {allTimeTopList.length ?
                            allTimeTopList.map((d) => (
                                <div
                                    onClick={() => handleLink(d.node.id)}
                                    key={Math.random()}
                                    className="w-28 h-48 ml-3 overflow-hidden relative full-flex flex-col rounded-lg border-2 border-[color:var(--red-border)]"
                                >
                                    <img
                                        className="w-28 translate-y-[0px] scale-[1.15] absolute top-0"
                                        src={d.node.main_picture.medium}
                                        alt={d.node.title}
                                    />
                                    <h1 className="w-full h-7 pb-1 pl-1 pr-1 absolute bottom-0 bg-[color:var(--black)] truncate border-t-2 border-[color:var(--red-border)]">{handleTextCrop(d.node.title, 15)}</h1>
                                </div>
                            )) : <h4>Loading...</h4>}
                        {allTimeTopList.length && (
                            <div
                                onClick={() => handleLink("ranking/all")}
                                className="w-28 h-auto full-flex flex-col"
                            >
                                <div className="w-12 h-12 full-flex rounded-xl border-2 border-[color:var(--red-border)]">
                                    <ArrowIcon />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="full-flex flex-col">
                <h4 className="mt-3 mb-3 rounded-full border-2 w-40 border-[color:var(--red-border)]">Top Movies</h4>
                <div className='flex w-screen overflow-x-auto scrollable_div pb-3'>
                    <div className="flex h-48">
                        {topMoviesList.length ?
                            topMoviesList.map((d) => (
                                <div
                                    onClick={() => handleLink(d.node.id)}
                                    key={Math.random()}
                                    className="w-28 h-48 ml-3 overflow-hidden relative full-flex flex-col rounded-lg border-2 border-[color:var(--red-border)]"
                                >
                                    <img
                                        className="w-28 translate-y-[0px] scale-[1.15] absolute top-0"
                                        src={d.node.main_picture.medium}
                                        alt={d.node.title}
                                    />
                                    <h1 className="w-full h-7 pb-1 pl-1 pr-1 absolute bottom-0 bg-[color:var(--black)] truncate border-t-2 border-[color:var(--red-border)]">{handleTextCrop(d.node.title, 15)}</h1>
                                </div>
                            )) : <h4>Loading...</h4>}
                        {topMoviesList.length && (
                            <div
                                onClick={() => handleLink("ranking/movie")}
                                className="w-28 h-auto full-flex flex-col"
                            >
                                <div className="w-12 h-12 full-flex rounded-xl border-2 border-[color:var(--red-border)]">
                                    <ArrowIcon />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="full-flex flex-col mb-3">
                <h4 className="mt-3 mb-3 rounded-full border-2 w-40 border-[color:var(--red-border)]">Top Upcoming</h4>
                <div className='flex w-screen overflow-x-auto scrollable_div pb-3'>
                    <div className="flex h-48">
                        {topUpcomingList.length ?
                            topUpcomingList.map((d) => (
                                <div
                                    onClick={() => handleLink(d.node.id)}
                                    key={Math.random()}
                                    className="w-28 h-48 ml-3 overflow-hidden relative full-flex flex-col rounded-lg border-2 border-[color:var(--red-border)]"
                                >
                                    <img
                                        className="w-28 translate-y-[0px] scale-[1.15] absolute top-0"
                                        src={d.node.main_picture.medium}
                                        alt={d.node.title}
                                    />
                                    <h1 className="w-full h-7 pb-1 pl-1 pr-1 absolute bottom-0 bg-[color:var(--black)] truncate border-t-2 border-[color:var(--red-border)]">{handleTextCrop(d.node.title, 15)}</h1>
                                </div>
                            )) : <h4>Loading...</h4>}
                        {topAiringList.length && (
                            <div
                                onClick={() => handleLink("ranking/upcoming")}
                                className="w-28 h-auto full-flex flex-col"
                            >
                                <div className="w-12 h-12 full-flex rounded-xl border-2 border-[color:var(--red-border)]">
                                    <ArrowIcon />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Ranking