import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useStateContext } from "../context/StateContext";

export default function Footer() {
  const {setCurrentSearchResult, setCurrentQuery, setAtHome} = useStateContext()
  const router = useRouter()
  const handleHome = () => {
    setCurrentQuery("")
    setCurrentSearchResult([])
    setAtHome(true)
    router.push("/")
  }
  return (
    <div className="w-full flex justify-evenly items-center h-[60px] bg-[color:var(--black)] border-t-2 border-[color:var(--red-border)] fixed bottom-0">
      <button onClick={handleHome}>Home</button>
      <h1><Link href="/anime/seasonal">Seasonal</Link></h1>
      <h1>MyList</h1>
      <h1>Profile</h1>
    </div>
  );
}
