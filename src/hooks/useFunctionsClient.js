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
    await axios.get("/api/anime_search", { params: config }).then((d) => {
      console.log(d.data);
      if (Object.keys(d.data).length === 0) {
        data = { error: "Empty Object!" };
      } else if (d.data.error) {
        data = { error: d.data.error };
      } else {
        data = d.data.data;
      }
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
      console.log("offset: ",offset)
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
    console.log(data)
    return data;
  };
  //
  const handleTextCrop = (text, crop) => {
    if (text.length > crop)
      return text.slice(0,crop) + "..."
    else return text
  }
  //
  return { handleSearchAnimeByName, handleAnimeDetails, handleAnimeRanking, handleTextCrop };
}
