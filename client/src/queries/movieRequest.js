const { TMDB_API_KEY } = process.env;

const requests = [
  {
    title: "NEXTFLIX ORIGINALS",
    path: `/discover/tv?api_key=${TMDB_API_KEY}&with_networks=213`
  },
  {
    title: "Trending Now",
    path: `/trending/all/week?api_key=${TMDB_API_KEY}&language=es-US`
  },
  {
    title: "Top Rated",
    path: `/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US`
  },
  {
    title: "Action Movies",
    path: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28`
  },
  {
    title: "Comedy Movies",
    path: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=35`
  },
  {
    title: "Horror Movies",
    path: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=27`
  },
  {
    title: "Romance Movies",
    path: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=10749`
  },
  {
    title: "Documentaries",
    path: `/discover/movie?api_key=${TMDB_API_KEY}&with_genres=99`
  }
];

export default requests;
