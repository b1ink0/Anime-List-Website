import Footer from "../../../src/sub-components/Footer";
import Navbar from "../../../src/sub-components/Navbar";
import AnimeSearchResult from "../../../src/components/AnimeSearchResult";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Search({ prevRoute }) {
    const router = useRouter()
    const [currentQuery, setCurrentQuery] = useState("")
    useEffect(() => {
        if (!router.isReady) return;
        console.log("change")

        if (router.query["name"] !== undefined && router.query["name"].length >= 3) {
            console.log("OK")
            setCurrentQuery(() => router.query["name"])
        }
    }, [router.isReady, router])
    //
    return (
        <>
            <Navbar tiles={true} query={currentQuery} prevRoute={prevRoute} />
            {
                currentQuery.length !== 0 ? 
                <AnimeSearchResult currentQuery={currentQuery} /> : ""
            }
            <Footer />
        </>
    );
}
