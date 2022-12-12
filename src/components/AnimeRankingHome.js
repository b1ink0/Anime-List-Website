import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";

import useFunctionsClient from '../hooks/useFunctionsClient'

function Ranking({
    topAiringList,
    setTopAiringList,
    allTimeTopList,
    setAllTimeTopList,
    topMoviesList,
    setTopMoviesList,
    topUpcomingList,
    setTopUpcomingList,
}) {
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
        <section className="relative w-full full-flex flex-col mb-[60px]">
            <div>
                <h4>Top Airing</h4>
                <div className='flex w-screen overflow-x-auto'>
                    <div className='flex '>
                        {topAiringList.length ?
                            topAiringList.map((d) => (
                                <div
                                    onClick={() => handleLink(d.node.id)}
                                    key={Math.random()}
                                    className="w-28 full-flex flex-col"
                                >
                                    <img
                                        className='w-28'
                                        src={d.node.main_picture.medium}
                                        alt={d.node.title}
                                    />
                                    <h1>{handleTextCrop(d.node.title, 15)}</h1>
                                </div>
                            )) : <h4>Loading...</h4>}
                        {topAiringList.length && (
                            <div
                                onClick={() => handleLink("ranking/airing")}
                                className="w-28 h-auto full-flex flex-col"
                            >
                                <h1>View All</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <h4>All Time Top</h4>
                <div className='flex w-screen overflow-x-auto'>
                    <div className='flex '>
                        {allTimeTopList.length ?
                            allTimeTopList.map((d) => (
                                <div
                                    onClick={() => handleLink(d.node.id)}
                                    key={Math.random()}
                                    className="w-28 full-flex flex-col"
                                >
                                    <img
                                        className='w-28'
                                        src={d.node.main_picture.medium}
                                        alt={d.node.title}
                                    />
                                    <h1>{handleTextCrop(d.node.title, 15)}</h1>
                                </div>
                            )) : <h4>Loading...</h4>}
                        {allTimeTopList.length && (
                            <div
                                onClick={() => handleLink("ranking/all")}
                                className="w-28 h-auto full-flex flex-col"
                            >
                                <h1>View All</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <h4>Top Movies</h4>
                <div className='flex w-screen overflow-x-auto'>
                    <div className='flex '>
                        {topMoviesList.length ?
                            topMoviesList.map((d) => (
                                <div
                                    onClick={() => handleLink(d.node.id)}
                                    key={Math.random()}
                                    className="w-28 full-flex flex-col"
                                >
                                    <img
                                        className='w-28'
                                        src={d.node.main_picture.medium}
                                        alt={d.node.title}
                                    />
                                    <h1>{handleTextCrop(d.node.title, 15)}</h1>
                                </div>
                            )) : <h4>Loading...</h4>}
                        {topMoviesList.length && (
                            <div
                                onClick={() => handleLink("ranking/movie")}
                                className="w-28 h-auto full-flex flex-col"
                            >
                                <h1>View All</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <h4>Top Upcoming</h4>
                <div className='flex w-screen overflow-x-auto'>
                    <div className='flex '>
                        {topUpcomingList.length ?
                            topUpcomingList.map((d) => (
                                <div
                                    onClick={() => handleLink(d.node.id)}
                                    key={Math.random()}
                                    className="w-28 full-flex flex-col"
                                >
                                    <img
                                        className='w-28'
                                        src={d.node.main_picture.medium}
                                        alt={d.node.title}
                                    />
                                    <h1>{handleTextCrop(d.node.title, 15)}</h1>
                                </div>
                            )) : <h4>Loading...</h4>}
                        {topAiringList.length && (
                            <div
                                onClick={() => handleLink("ranking/upcoming")}
                                className="w-28 h-auto full-flex flex-col"
                            >
                                <h1>View All</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Ranking