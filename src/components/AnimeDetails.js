import React, { useEffect, useState } from "react";
import useFunctionsClient from "../hooks/useFunctionsClient";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Styles from "../../styles/AnimeDetails.module.scss";
import { useRouter } from "next/router";
import Rating from "react-rating";
import EmptyStar from "../images/emptyStar.svg";
import FullStar from "../images/fullStar.svg";
import Ratings from "../sub-components/Ratings";
import CloseIcon from "../images/CloseIcon";

export default function AnimeDetails({ animeId }) {
  const { handleAnimeDetails } = useFunctionsClient();
  const [details, setDetails] = useState({});
  const [pictures, setPictures] = useState([]);
  const [showDot, setShowDot] = useState(true);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [showFullscreenSynopsis, setShowFullscreenSynopsis] = useState(false);
  const router = useRouter();
  //
  useEffect(() => {
    handleAnimeDetails(animeId)
      .then((data) => setDetails(data))
      .catch((err) => console.log(err));
  }, []);
  //
  useEffect(() => {
    console.log(details)
    if (details.mean) {
      console.log(details)
      document
        .getElementById("root")
        .style.setProperty(
          "--dash-offset",
          Math.floor(252 - 25.2 * details.mean)
        );
    } else {
      console.log(details)
      document
        .getElementById("root")
        .style.setProperty(
          "--dash-offset",
          252
        );
    }
    if (details.pictures && !pictures.length) {
      details.pictures.forEach((picture) => {
        setPictures((pic) => [
          ...pic,
          <img
            className="m-auto w-[150px] rounded-lg border-2 border-[color:var(--red-border)]"
            key={Math.random()}
            src={picture.medium}
            onDragStart={handleDragStart}
            role="presentation"
            onClick={() => setShowFullscreen(true)}
          />,
        ]);
      });
    }
  }, [details]);
  //
  useEffect(() => {
    if (pictures.length > 5) {
      setShowDot(false);
    } else {
      setShowDot(true);
    }
  }, [pictures]);
  //
  const handleSynopsis = () => {
    setShowFullscreenSynopsis(!showFullscreenSynopsis)
  }
  //
  const handleDragStart = (e) => e.preventDefault();
  return (
    <section
      className={`${!showDot ? "hide_dot" : ""} transition_image rating_size_fix relative mt-[var(--nav-size)] mb-[60px] pt-5`}
    >
      <div className="translate-25">
        <div
          className={`alice-container`}
        >
          <AliceCarousel
            infinite="true"
            autoPlayInterval={2000}
            renderSlideInfo="true"
            mouseTracking
            items={pictures}
          />
        </div>
      </div>
      <div className="full-flex flex-col">
        <Ratings rating={details.mean} rank={details.rank} />
      </div>
      <div className="full-flex flex-col">
        <h1 className="border-b-2 border-[color:var(--red-border)]">{details.title}</h1>
        <div className="flex items-center justify-evenly w-full mt-5">
          <div>
            <h1>Episodes</h1>
            {"num_episodes" in details &&
              <h1 className="capitalize bg-[color:var(--red-border)] pr-3 pl-3 mt-1 rounded-3xl">
                {details.num_episodes}
              </h1>
            }
          </div>
          <div>
            <h1>Season</h1>
            {"start_season" in details && ("year" in details.start_season && "season" in details.start_season) &&
              <h1 className="capitalize bg-[color:var(--red-border)] pr-3 pl-3 mt-1 rounded-3xl">
                {details.start_season.season} {details.start_season.year}
              </h1>
            }
          </div>
          <div>
            <h1>Status</h1>
            {"status" in details &&
              <h1 className="capitalize bg-[color:var(--red-border)] pr-3 pl-3 mt-1 rounded-3xl">
                {details.status === "finished_airing" ? "Finished" : "Airing"}
              </h1>
            }
          </div>
        </div>
        <div className="mt-5 full-flex w-full flex-wrap flex-col">
          <h1>Genres</h1>
          <div className="full-flex flex-wrap">
            {
              "genres" in details && details.genres.map((g, i) => (
                <h3 className="m-2 bg-[color:var(--red-border)] pr-3 pl-3 mt-1 rounded-3xl" key={i}>{g.name}</h3>
              ))
            }
          </div>
        </div>
        <div className={"pr-3 pl-3 mb-5"}>
          <div className={`full-flex `}>
            <h1 className="border-b-2 border-[color:var(--red-border)] w-fit text-center">Synopsis</h1>
            {/* {
              showFullscreenSynopsis &&
              <button className="absolute top-4 right-0" onClick={handleSynopsis}><CloseIcon /></button>
            } */}
          </div>
          {
            "synopsis" in details && <>{details.synopsis.length > 200 && !showFullscreenSynopsis ? <p className="mt-3 text-justify">{details.synopsis.substring(0, 200)}<button className="[color:var(--red-border)]" onClick={handleSynopsis}>...read more</button></p> : <p className="mt-3 text-justify">{details.synopsis}<button className="[color:var(--red-border)]" onClick={handleSynopsis}>...read less</button></p>}</>
          }
        </div>
      </div>
    </section>
  );
}
