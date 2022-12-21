import { useRouter } from "next/router";
import AnimeUserList from "../../../src/components/AnimeUserList";
import Footer from "../../../src/sub-components/Footer";
import Navbar from "../../../src/sub-components/Navbar";

export default function User({ prevRoute }) {
    const router = useRouter();
    return (
        <>
            <Navbar prevRoute={prevRoute} />
            <AnimeUserList/>
            <Footer />
        </>
    );
}
