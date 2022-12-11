const MAL = require("myanimelist-api-wrapper");

export default function useFunctionsServer() {
  const anime = MAL().anime;
  //
  const handleSearchAnimeByName = async (query) => {
    let data = {};
    let config = {
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      q: query.q,
      limit: query.limit ? query.limit : undefined,
      offset: query.offset ? query.offset : undefined,
      fields: query.fields ? query.fields : undefined,
    };
    await anime(config)
      .anime_list()()
      .then((d) => (data = d))
      .catch((err) => { });
    return data;
  };
  //
  const handleAnimeDetails = async (query) => {
    let data = {};
    let config = {
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      anime_id: query.anime_id,
      fields: query.fields ? query.fields : undefined,
    };
    await anime(config)
      .anime_details()()
      .then((d) => (data = d))
      .catch((err) => { });
    return data;
  };

  //
  const handleAnimeRanking = async (
    query
  ) => {
    console.log(query)
    let data = {};
    await anime({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      ranking_type: query.ranking_type,
      limit: query.limit ? query.limit : undefined,
      offset: query.offset ? query.offset : undefined,
      fields: query.fields ? query.offset : undefined,
    })
      .anime_ranking()()
      .then((d) => (data = d))
      .catch((err) => { console.log(err) });
    return data;
  };

  return { handleSearchAnimeByName, handleAnimeDetails, handleAnimeRanking };
}
