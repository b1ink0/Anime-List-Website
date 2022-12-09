import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Footer({ setCurrentSearchResult, setCurrentQuery, setAtHome }) {
  const router = useRouter()
  const handleHome = () => {
    setCurrentQuery("")
    setCurrentSearchResult([])
    setAtHome(true)
    router.push("/")
  }
  return (
    <div className="w-full flex justify-evenly items-center h-[60px] bg-red-400 fixed bottom-0">
      <button onClick={handleHome}>Home</button>
      <h1>Seasonal</h1>
      <h1>MyList</h1>
      <h1>Profile</h1>
    </div>
  );
}
