import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "350dbfc1290e2bd66f6d193ffc932a75";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img, title, overview }) => (
  <div className="card">
      <img src={img || "path/to/fallback/image.jpg"} alt="cover" /> {/* Fallback image */}
      <h3>{title}</h3>
      <p>{overview}</p>
  </div>
);

const Row = ({ title, arr = [] }) => (
  <div className="row">
      <h2>{title}</h2>
      <div>
          {arr.map((item, index) => (
              <Card
                  key={index}
                  img={`${imgUrl}/${item.poster_path}`}
                  title={item.original_title}
                  overview={item.overview}
              />
          ))}
      </div>
  </div>
);

const Home = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        // Fetch movies by IDs from the array passed to the function
        const fetchMovies = async (idList) => {
            const movies = [];
            for (let id of idList) {
                try {
                    const { data } = await axios.get(`${url}/movie/${id}?api_key=${apiKey}`);
                    movies.push(data);
                } catch (error) {
                    console.error("Error fetching movie with ID", id, error);
                }
            }
            return movies;
        };

        const fetchUpcoming = async () => {
            const movies = await fetchMovies([550, 551, 552, 553, 554, 555]); // Example movie IDs, adjust as needed
            setUpcomingMovies(movies);
        };

        const fetchNowPlaying = async () => {
            const movies = await fetchMovies([556, 557, 558, 559, 560]); // Example movie IDs, adjust as needed
            setNowPlayingMovies(movies);
        };

        const fetchPopular = async () => {
            const movies = await fetchMovies([561, 562, 563, 564, 565]); // Example movie IDs, adjust as needed
            setPopularMovies(movies);
        };

        const fetchTopRated = async () => {
            const movies = await fetchMovies([566, 567, 568, 569, 570]); // Example movie IDs, adjust as needed
            setTopRatedMovies(movies);
        };

        const getAllGenre = async () => {
            const {
                data: { genres },
            } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
            setGenre(genres);
            console.log(genres);
        };

        getAllGenre();

        fetchUpcoming();
        fetchNowPlaying();
        fetchPopular();
        fetchTopRated();
    }, []);

    return (
        <section className="home">
            <div
                className="banner"
                style={{
                    backgroundImage: popularMovies[0]
                        ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
                        : "rgb(16, 16, 16)",
                }}
            >
                {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
                {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

                <div>
                    <button><BiPlay /> Play </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>
            </div>

            <Row title={"Upcoming"} arr={upcomingMovies} />
            <Row title={"Now Playing"} arr={nowPlayingMovies} />
            <Row title={"Popular"} arr={popularMovies} />
            <Row title={"Top Rated"} arr={topRatedMovies} />

            <div className="genreBox">
                {genre.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Home;
