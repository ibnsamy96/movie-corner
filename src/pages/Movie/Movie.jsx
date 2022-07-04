import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../network/config.js";
import { FaImdb } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

import "./Movie.css";

function Movie(props) {
	const [movieFullInfo, setMovieFullInfo] = useState({});
	const { movieId } = useParams();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const request = await Promise.all([
					axiosInstance.get("https://api.themoviedb.org/3/movie/" + movieId),
					axiosInstance.get(
						"https://api.themoviedb.org/3/movie/" + movieId + "/recommendations"
					),
				]);
				// console.log(request);
				const fetchedMovie = request[0].data;
				fetchedMovie.recommendations = request[1].data;
				setMovieFullInfo(fetchedMovie);
				console.log(fetchedMovie);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		}
		fetchData();
	}, []);

	return (
		<div className='container h-100'>
			{isLoading ? (
				<div className='movieContent h-100 row justify-content-center align-items-center'>
					<div className='spinner-grow text-info' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			) : (
				<div className='movieContent row'>
					<div className='col-12 col-sm-4 col-md-4'>
						<img
							className='w-100  rounded'
							src={
								movieFullInfo.poster_path
									? `https://image.tmdb.org/t/p/w500${movieFullInfo.poster_path}`
									: "https://cloud.filmfed.com/defaults/movie-poster/m_movie_poster_default.png"
							}
							alt=''
						/>
					</div>

					<div className=' h-100 col-12 col-sm-8 col-md-8  align-self-center '>
						<h2 className='h1'>{movieFullInfo.title}</h2>
						<span className=' fs-6 fw-lighter'>
							{movieFullInfo.release_date}
						</span>
						<p className='h3 fw-lighter'>{movieFullInfo.overview}</p>
						<div className=' mb-2'>
							{movieFullInfo.genres.map((genre) => {
								return (
									<span className='rounded me-1 p-1 text-primary border border-primary d-inline-block'>
										#{genre.name}
									</span>
								);
							})}
						</div>
						<div>
							<a href={movieFullInfo.homepage} target='_blank' className='me-2'>
								<i>
									<FiExternalLink className='fs-2 text-info' />
								</i>
							</a>

							<a
								href={"https://www.imdb.com/title/" + movieFullInfo.imdb_id}
								target='_blank'
							>
								<i>
									<FaImdb className='fs-2 text-info' />
								</i>
							</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Movie;
