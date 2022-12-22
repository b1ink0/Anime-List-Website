import { useRouter } from 'next/router';
import React, { memo, useEffect } from 'react'
import useFunctionsClient from '../hooks/useFunctionsClient';

function Cards({ list, card, count = 0, rate = true }) {
    const { handleTextCrop } = useFunctionsClient()
    const router = useRouter()
    const handleLink = (id) => {
        // setScroll(scrollDivRef.current.scrollTop);
        router.push(`/anime/${id}`);
    };
    console.log(list.length, count)
    return (
        <>
            {list.length === undefined ? "" :
                list.map((d, i) => (
                    <div
                        onClick={() => handleLink(d.node.id)}
                        key={Math.random()}
                        className={`${count === 0 ? "ranking_card" : count - 1 >= i ? "" : "ranking_card"} ${card ? "w-36 h-52 flex-col full-flex" : "w-full flex justify-start align-top h-36"} mt-4 overflow-hidden relative rounded-lg border-[2px] border-[color:var(--red-border)]`}
                    >
                        <img
                            className={`${card ? "w-36 flex-col absolute top-0 translate-y-[0px] scale-[1.15]" : "w-24 border-r-2 border-r-[color:var(--red-border)]"}   transition-opacity  select-none drag-none`}
                            src={d.node.main_picture.medium}
                            alt={d.node.title}
                        />
                        {card &&
                            <h1 className="w-12 h-6 bottom-8 bg-[color:var(--black)] rounded-tl-lg absolute right-0">{d.node.mean === undefined ? "N/A" : d.node.mean}</h1>
                        }
                        <div className={`${card ? "w-full bottom-0 absolute h-8" : "w-full flex justify-end items-end flex-col-reverse"} bg-[color:var(--black)]`}>
                            {!card &&
                                <div className="w-full overflow-auto pl-2 pr-2">
                                    <div className="w-full flex justify-between">
                                        <h1 className="w-12 h-6 bg-[color:var(--black)] rounded-tl-lg">#{d.node.rank === undefined ? "N/A" : d.node.rank}</h1>
                                        <h1 className="w-12 h-6 bg-[color:var(--black)] rounded-tl-lg mr-2">⭐{d.node.mean === undefined ? "N/A" : d.node.mean}</h1>
                                    </div>
                                    {
                                        (d.node.start_season !== undefined && d.node.start_season !== undefined) ?
                                            <h3 className="w-full text-left">Season: {d.node.start_season.year}  {d.node.start_season.season}</h3> : <h3 className="w-full text-left">Season: Unknown</h3>
                                    }
                                    <div className="flex flex-wrap">
                                        {
                                            d.node.genres !== undefined ?
                                                d.node.genres.length && d.node.genres.map((genre) => <h3 key={Math.random()} className="mr-2 bg-[color:var(--red-border)] pr-3 pl-3 mt-1 rounded-3xl">{genre.name}</h3>) : ""
                                        }
                                    </div>
                                </div>
                            }
                            <div className="w-full relative h-2 overflow-hidden border-t-2 border-b-2 border-t-[color:var(--red-border)] border-b-[color:var(--red-border)]">
                                <div className="rate h-[4px] w-full" ></div>
                                <div className="absolute bg-[color:var(--black)] h-[4px] top-0 right-0" style={{ width: `${100 - d.node.mean * 10}%` }}></div>
                            </div>
                            <h1 className={`${card ? "truncate h-7" : ""} w-full pb-1 pl-1 pr-1`}>{handleTextCrop(d.node.title, 40)}</h1>
                        </div>
                    </div>
                ))}
        </>
    )
}
export default memo(Cards)