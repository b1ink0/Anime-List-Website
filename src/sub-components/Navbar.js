// import Styles from "../../../styles/Navbar.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import useFunctionsClient from "../hooks/useFunctionsClient";
import { useStateContext } from "../context/StateContext";
import { useEffect } from "react";
import SearchIcon from "../images/SearchIcon";

export default function Navbar({
  searchOn = true,
  query = "",
  prevRoute = undefined
}) {

  const { setCurrentSearchResult, currentQuery, setCurrentQuery, setAtHome} = useStateContext()
  const { handleSearchAnimeByName } = useFunctionsClient();
  const router = useRouter();
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/anime/search",
      query: {name: currentQuery}
    })
  };
  //
  useEffect(() => {
    if (query !== "")
      setCurrentQuery(query)
    console.log("Query:", query)
  }, [query])
  //
  return (
    <nav className="bg-[color:var(--black)] w-full pb-3 full-flex flex-col h-[60px] bg-[color:var(--jet)] rounded-br-3xl rounded-bl-3xl">
      <Link href="/">
        <h1 className="text-skin-flick">AnimeVoid</h1>
      </Link>
      {searchOn ? (
        <form className="full-flex relative w-2/3" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="w-full h-7 pl-3 pr-8 bg-[color:var(--black)] outline-none border-2 rounded-full border-[color:var(--red-border)]"
            type="text"
            value={currentQuery}
            minLength="3"
            placeholder="Search..."
            onChange={(e) => setCurrentQuery(e.target.value)}
          />
          <button className="absolute right-3"><SearchIcon/></button>
        </form>
      ) : (
        <Link href="/">
          <a>Back</a>
        </Link>
      )}
    </nav>
  );
}
