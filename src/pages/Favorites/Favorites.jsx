import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MoviesList from "../../components/MoviesList/MoviesList";
import { TbBookmarkOff } from "react-icons/tb";

function Favorites(props) {
	const favorites = useSelector((state) => state.favorites);

	useEffect(() => {
		console.log(favorites);
	}, [favorites]);

	return (
		<>
			{favorites.length > 0 ? (
				<MoviesList moviesList={favorites} />
			) : (
				<div className='h-100 d-flex flex-column justify-content-center align-items-center'>
					<h2 className=' h1 text-center fs-1 fw-lighter mb-3'>
						<TbBookmarkOff />
					</h2>
					<h2 className=' h4 text-center  fw-lighter mb-3'>
						Add movies to your bookmarks so that they appear here.
					</h2>
				</div>
			)}
		</>
	);
}

export default Favorites;
