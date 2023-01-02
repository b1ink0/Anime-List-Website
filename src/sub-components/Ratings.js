import React from "react";

export default function Ratings({ rating = 0, rank = 0 }) {
  return (
    <div className="ratings_container full-flex flex-col absolute top-[20px] right-0 w-[150px] h-[150px] ">
      <div className="svg_container w-full h-full full-flex relative">
        <svg className="w-full h-full full-flex">
          <circle xmlns="http://www.w3.org/2000/svg" cx="75" cy="75" r="40" />
        </svg>
        <h1 className="absolute">⭐{rating}</h1>
      </div>
      <div className="full-flex flex-col">
        <h2>Rank</h2>
        <h2 className="bg-[color:var(--red-border)] pr-3 pl-3 mt-1 rounded-3xl">#{rank}</h2>
      </div>
    </div>
  );
}
