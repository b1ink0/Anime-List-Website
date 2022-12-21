import useFunctionsServer from "../../src/hooks/useFunctionsServer";

export default function Handler(req, res) {
  const { handleGetMALUserAnimeList } = useFunctionsServer();
      handleGetMALUserAnimeList(req.query).then((d) => {
        res.status(200).json(d);
      }).catch((err) => {
        res.status(200).json({ error: "Server Error!" });
      })
}
