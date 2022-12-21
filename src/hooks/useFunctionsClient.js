import axios from "axios";

export default function useFunctionsClient() {
  const handleSearchAnimeByName = async (
    animeName,
    limit = undefined,
    offset = undefined,
    fields = undefined
  ) => {
    let data = {};
    let config = {
      q: animeName,
      limit: limit,
      offset: offset,
      fields: fields,
    };
    let config1 = {
      user_name: animeName,
      limit: 5,
      offset: 0,
    } 
    await axios.get("/api/anime_search", { params: config }).then( async (d) => {
      console.log(d.data);
      await axios.get("/api/anime_userlist", {params: config1}).then((d1) => {
        console.log(d1)
        if (Object.keys(d1.data).length === 0){
          data = {...data, userlist : []}
        } else if (d1.data.error) {
          data = {...data, userlist : []}
        } else {
          data = {...data, userlist : d1.data.data}
        }
        if (Object.keys(d.data).length === 0) {
          data = {...data, error: "Empty Object!" };
        } else if (d.data.error) {
          data = {...data, error: d.data.error };
        } else {
          data = {...data, list: d.data.data};
        }
      }).catch((err) => {
          console.log(err)
      })
    });
    return data;
  };
  //
  const handleAnimeDetails = async (animeId, fields = undefined) => {
    let data = {};
    let config = {
      anime_id: animeId,
      fields: fields,
    };
    await axios.get("/api/anime_details", { params: config }).then((d) => {
      if (d.data.error) {
        data = { error: d.data.error };
      } else {
        data = d.data;
      }
    });
    return data;
  };
  //
  const handleAnimeRanking = async (ranking_type = "all", limit = undefined, offset = undefined,
    fields = undefined) => {
    let data = {};
    let config = {
      ranking_type: ranking_type,
      limit: limit,
      offset: offset,
      fields: fields,
    };
    await axios.get("/api/anime_ranking", { params: config }).then((d) => {
      if (d.data.error) {
        data = { error: d.data.error };
      } else {
        data = d.data;
      }
    });
    return data;
  };
  //
  const handleAnimeSeasonal = async (year = handleCurrentYear, season = handleCurrentSeason(), sort = "anime_num_list_users",limit = undefined, offset = undefined,
    fields = undefined) => {
    let data = {};
    let config = {
      year: year,
      season: season,
      sort: sort,
      limit: limit,
      offset: offset,
      fields: fields,
    };
    console.log(config)
    await axios.get("/api/anime_seasonal", { params: config }).then((d) => {
      if (d.data.error) {
        data = { error: d.data.error };
      } else {
        data = d.data;
      }
    });
    return data;
  };
  //
  const handleTextCrop = (text, crop) => {
    if (text.length > crop)
      return text.slice(0, crop) + "..."
    else return text
  }
  //
  const handleCurrentSeason = () => {
    const monthIndex = new Date().getMonth()
    if (monthIndex >= 0 && monthIndex <= 2)
      return "winter"
    if (monthIndex >= 3 && monthIndex <= 5)
      return "spring"
    if (monthIndex >= 6 && monthIndex <= 8)
      return "summer"
    if (monthIndex >= 9 && monthIndex <= 11)
      return "fall"
  }
  //
  const handleCurrentYear = () => {
    const year = new Date().getFullYear()
    return year
  }
  //
  const handleSeasonExist = (season) => {
    let seasons = ["winter", "spring", "summer", "fall"]
    seasons = seasons.slice(0, seasons.indexOf(handleCurrentSeason()) + 1) 
    if (seasons.indexOf(season) >= 0)
      return true
    return false
  }
  //
  return { handleSearchAnimeByName, handleAnimeDetails, handleAnimeRanking, handleAnimeSeasonal, handleTextCrop, handleCurrentSeason, handleCurrentYear, handleSeasonExist };
}
