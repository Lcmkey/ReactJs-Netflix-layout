import React, { useEffect, useState } from "react";

import axios from "./../utils/axios";
import movieRequest from "./../queries/movieRequest";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let requestPath = "";
      movieRequest.map(movie => {
        const { title, path } = movie;
        if (title == "NEXTFLIX ORIGINALS") {
          requestPath = path;
        }
      });

      const request = await axios.get(requestPath);

      const movie =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ];

      setMovie(movie);
      return request;
    };

    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://images.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center"
      }}
    >
      <div className="banner-container">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>

        <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner-fadeBottom" />
    </header>
  );
};

export default Banner;
