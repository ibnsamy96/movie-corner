import React, { useContext, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MoviesList.css";
import LanguageContext from "../../context/language.js";
import { useSelector } from "react-redux";

function MoviesList(props) {
	const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
	const moviesList = useSelector((state) => state.movies);

	useEffect(() => {
		console.log(moviesList);
	}, [moviesList]);

	return (
		<div
			dir={selectedLanguage === "en" ? "ltr" : "rtl"}
			className='moviesList row pt-1 pb-5  gy-2 gy-md-3 gy-xl-4 '
		>
			{moviesList.map((movieInfo, index) => {
				console.log(index);

				return (
					<MovieCard
						key={movieInfo.id + "-" + movieInfo.title}
						movieInfo={{ ...movieInfo }}
						addMovieToFavorites={props.addMovieToFavorites}
					/>
				);
			})}
		</div>
	);
}

export default MoviesList;
