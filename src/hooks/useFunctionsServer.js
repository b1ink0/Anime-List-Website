import axios from "axios";
import fetch from "cross-fetch"

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
    let data = {};
    await anime({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      ranking_type: query.ranking_type,
      limit: query.limit ? query.limit : undefined,
      offset: query.offset ? `=${query.offset}` : undefined,
      fields: query.fields ? query.offset : undefined,
    })
      .anime_ranking()()
      .then((d) => (data = d))
      .catch((err) => { console.log(err) });
    return data;
  };
  //
  const handleAnimeSeasonal = async (
    query
  ) => {
    let data = {};
    await anime({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      year: query.year ? query.year : undefined,
      season: query.season ? query.season : undefined,
      sort: query.sort ? query.sort : undefined,
      limit: query.limit ? query.limit : undefined,
      offset: query.offset ? query.offset : undefined,
      fields: query.fields ? query.offset : undefined,
    })
      .seasonal_anime()()
      .then((d) => (data = d))
      .catch((err) => { console.log(err) });
    return data;
  };
  //
  const handleGetMALUserAnimeList = async (query) => {
    let data = {}
    await axios("https://api.myanimelist.net/v2/anime?q=one", {
      headers: {
        "X-MAL-CLIENT-ID": process.env.NEXT_PUBLIC_CLIENT_ID
      }
    }).then(d => console.log(d)).catch(e => console.log(e))
  //   await anime({
  //     client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  //     user_name: query.user_name ? query.user_name : undefined,
  //     limit: query.limit ? query.limit : undefined,
  //     offset: query.offset ? query.offset : undefined,
  //     status: query.status ? query.status : undefined,
  //   })
  //     .anime_mal_user_list()()
  //     .then((d) => (data = d))
  //     .catch((err) => { console.log(err) });
  }
  
  return { handleSearchAnimeByName, handleAnimeDetails, handleAnimeSeasonal, handleAnimeRanking, handleGetMALUserAnimeList };
}
