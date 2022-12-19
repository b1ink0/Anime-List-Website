// import Styles from "../../../styles/Navbar.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import useFunctionsClient from "../hooks/useFunctionsClient";
import { useStateContext } from "../context/StateContext";
import { useEffect } from "react";
import SearchIcon from "../images/SearchIcon";
import Logo from "../images/Logo";
import Tiles_2Icon from "../images/Tiles_2Icon";
import Tiles_1Icon from "../images/Tiles_1Icon";

export default function Navbar({
  searchOn = true,
  query = "",
  prevRoute = undefined,
  tiles = false
}) {
  const { currentQuery, setCurrentQuery, card, setCard } = useStateContext()
  const { handleSearchAnimeByName } = useFunctionsClient();
  const router = useRouter();
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/anime/search",
      query: { name: currentQuery }
    })
  };
  //
  const handleCardState = () => {
    setCard(() => !card)
    localStorage.setItem("card_state", JSON.stringify(!card))
  }
  //
  useEffect(() => {
    const ls = localStorage.getItem("card_state")
    if (ls !== null) {
      setCard(() => JSON.parse(ls))
    } else {
      localStorage.setItem("card_state", "true")
      console.log(ls)
    }
  }, [])
  //
  useEffect(() => {
    if (query !== "")
      setCurrentQuery(query)
    console.log("Query:", query)
  }, [query])
  //
  return (
    <nav className="w-full pb-3 full-flex flex-col h-[var(--nav-size)] bg-[color:var(--jet)] rounded-br-3xl rounded-bl-3xl fixed z-10 top-0">
      <Link href="/">
        <h1 className="text-skin-flick mt-2 mb-2"><Logo /></h1>
      </Link>
      <form className="full-flex relative w-2/3" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="w-full h-7 pl-3 pr-8 bg-[color:var(--black)] outline-none border-2 rounded-full border-[color:var(--red-border)]"
          type="text"
          value={currentQuery}
          minLength="3"
          placeholder="Search..."
          onChange={(e) => setCurrentQuery(e.target.value)}
        />
        <button className="absolute right-3"><SearchIcon /></button>
      </form>
      {
        tiles &&
        <button className="absolute right-6 bottom-[10px]" onClick={() => handleCardState()}>
          {
            card ? <Tiles_2Icon /> : <Tiles_1Icon />
          }
        </button>
      }
    </nav>
  );
}
