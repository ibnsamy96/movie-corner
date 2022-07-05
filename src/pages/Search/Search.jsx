import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useLocation, useParams } from "react-router-dom";
import MoviesList from "../../components/MoviesList/MoviesList";
import axiosInstance from "../../network/config.js";
import { searchForAMovie } from "./../../store/actions/movies";

function Search(props) {
	// const [moviesList, setMoviesList] = useState([]);
	const [numberOfResults, setNumberOfResults] = useState(0);

	const moviesList = useSelector((state) => state.movies);
	const favorites = useSelector((state) => state.favorites);

	const location = useLocation();
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const searchQuery = new URLSearchParams(location.search).get("q");
		console.log("gotHere");
		setIsLoading(true);
		async function fetchData() {
			try {
				// const request = await axiosInstance.get(
				// 	"https://api.themoviedb.org/3/search/movie",
				// 	{
				// 		params: {
				// 			query: searchQuery,
				// 		},
				// 	}
				// );

				dispatch(searchForAMovie(searchQuery));

				// console.log(request.data.results);
				// const fetchedMovies = request.data.results;
				moviesList.forEach((movieInfo) => {
					const favoritesIds = favorites.map((obj) => obj.id);
					if (favoritesIds.includes(movieInfo.id)) movieInfo.doBookmark = true;
					else movieInfo.doBookmark = false;
				});

				// setMoviesList([...fetchedMovies]);
				// setNumberOfResults(request.data.total_results);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		}
		fetchData();
	}, [location]);

	return (
		<>
			{isLoading ? (
				<div className='h-100 row justify-content-center align-items-center'>
					<div className='spinner-grow text-info' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			) : (
				<>
					<h2 className=' h3 text-start  fw-lighter mb-3'>
						We found {numberOfResults} search results for "
						{new URLSearchParams(location.search).get("q")}"{" "}
					</h2>
					<MoviesList moviesList={moviesList} />
				</>
			)}
		</>
	);
}

export default Search;
