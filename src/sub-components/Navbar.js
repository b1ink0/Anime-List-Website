// import Styles from "../../../styles/Navbar.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import useFunctionsClient from "../hooks/useFunctionsClient";

export default function Navbar({
  currentSearchResult,
  setCurrentSearchResult,
  currentQuery,
  setCurrentQuery,
  searchOn = true,
  prevRoute = undefined,
  setAtHome
}) {
  const { handleSearchAnimeByName } = useFunctionsClient();
  const router = useRouter();
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchAnimeByName(currentQuery, 5, 0, "id,title,main_picture,mean")
      .then((d) => {
        setCurrentSearchResult(d);
        setAtHome(false)
      })
      .catch((err) => {
        setCurrentSearchResult([]);
      });
  };

  return (
    <nav className="bg-main full-flex flex-col h-[60px] bg-blue-400">
      <Link href="/">
        <h1 className="text-skin-flick">WAL</h1>
      </Link>
      {searchOn ? (
        <form className="full-flex" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="bg-blue-600"
            type="text"
            value={currentQuery}
            minLength="3"
            onChange={(e) => setCurrentQuery(e.target.value)}
          />
          <button>Search</button>
        </form>
      ) : (
        <Link href="/">
          <a>Back</a>
        </Link>
      )}
    </nav>
  );
}
