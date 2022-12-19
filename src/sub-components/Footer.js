import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useStateContext } from "../context/StateContext";
import HomeIcon from "../images/HomeIcon";
import MyListIcon from "../images/MyListIcon";
import ProfileIcon from "../images/ProfileIcon";
import SeasonaIcon from "../images/SeasonIcon";

export default function Footer() {
  const { setCurrentSearchResult, setCurrentQuery, setAtHome } = useStateContext()
  const router = useRouter()
  const handleHome = () => {
    setCurrentQuery("")
    setCurrentSearchResult([])
    setAtHome(true)
    router.push("/")
  }
  return (
    <div className="w-full flex justify-around items-center h-[50px] bg-[color:var(--jet)] fixed bottom-0 rounded-tr-3xl rounded-tl-3xl z-10">
      <button onClick={handleHome}><HomeIcon /></button>
      <Link href="/anime/seasonal"><a><SeasonaIcon /></a></Link>
      <h1><MyListIcon /></h1>
      <h1><ProfileIcon /></h1>
    </div>
  );
}
