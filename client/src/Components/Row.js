import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

import axios from "./../utils/axios";

const BASIC_URL = "https://image.tmdb.org/t/p/original/";

const Row = props => {
  const { title, fetchUrl, isLargeRow } = props;
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      const result = request.data.results;

      setMovies(result);

      return request;
    };

    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // "https://developers.google.com/youtube/player_parameters",
      autoplay: 1
    }
  };

  const handleClick = movie => {
    console.log(movie);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch(error => console.log(error));
    }
  };

  const renderContent = () => {
    return movies.map(movie => (
      <img
        key={movie.id}
        onClick={() => handleClick(movie)}
        className={`row-poster ${isLargeRow && "row-poster-large"}`}
        src={`${BASIC_URL}${
          isLargeRow ? movie.poster_path : movie.backdrop_path
        }`}
        alt={movie.name}
      />
    ));
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-posters">{renderContent()}</div>

      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
