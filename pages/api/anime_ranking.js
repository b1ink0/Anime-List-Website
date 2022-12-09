import useFunctionsServer from "../../src/hooks/useFunctionsServer";

export default function Handler(req, res) {
    const { handleAnimeRanking } = useFunctionsServer();
    handleAnimeRanking(req.query)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ error: "Server Error!" });
        });
}
