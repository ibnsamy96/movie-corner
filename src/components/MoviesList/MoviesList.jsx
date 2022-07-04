import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MoviesList.css";

function MoviesList(props) {
	return (
		<div className='moviesList row pt-1 pb-5  gy-2 gy-md-3 gy-xl-4 '>
			{props.moviesList.map((movieInfo) => {
				// console.log(movieInfo);
				return (
					<MovieCard
						key={movieInfo.id}
						movieInfo={movieInfo}
						addMovieToFavorites={props.addMovieToFavorites}
					/>
				);
			})}
		</div>
	);
}

export default MoviesList;
