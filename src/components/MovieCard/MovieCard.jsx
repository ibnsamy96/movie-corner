import React, { useState, useContext, useEffect } from "react";
import "./MovieCard.css";
import { BsBookmarkHeartFill, BsBookmarkHeart } from "react-icons/bs";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	addToFavorites,
	removeFromFavorites,
} from "../../store/actions/favorites.js";
import LanguageContext from "../../context/language.js";

function MovieCard(props) {
	const [cardInfo, setCardInfo] = useState({ ...props.movieInfo });
	// const history = useHistory();
	const dispatch = useDispatch();
	const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);

	useEffect(() => {
		console.log(cardInfo);
	}, [cardInfo]);

	// const isBookmarked = props.props.movieInfo.isBookmarked;

	return (
		<div
			key={cardInfo.id}
			dir={selectedLanguage === "en" ? "ltr" : "rtl"}
			className='cardContainer col-12 col-sm-6 col-lg-4 col-xl-3 px-1 px-md-2 px-xl-2'
		>
			<div className='card h-100 position-relative'>
				<img
					src={
						cardInfo.poster_path
							? `https://image.tmdb.org/t/p/w500${cardInfo.poster_path}`
							: "https://cloud.filmfed.com/defaults/movie-poster/m_movie_poster_default.png"
					}
					className='card-img-top'
					alt={cardInfo.title}
				/>
				<div className='card-body'>
					<h5 className='card-title'>
						<Link
							className=' text-dark text-decoration-none'
							to={"./movie/" + cardInfo.id}
						>
							{cardInfo?.title}
						</Link>
					</h5>
					<p className='card-text'>{cardInfo.overview}</p>
				</div>

				<div
					className='bookmark position-absolute fs-3 border border-info border-2 text-info rounded-circle d-flex justify-content-center align-items-center'
					onClick={() => {
						console.log(cardInfo.doBookmark);
						const nextDoBookmarkState = !cardInfo.doBookmark;
						setCardInfo({ ...cardInfo, doBookmark: nextDoBookmarkState });
						// cardInfo.isBookmarked = !cardInfo.isBookmarked;
						// console.log({ ...cardInfo, doBookmark: nextDoBookmarkState });

						if (nextDoBookmarkState) {
							dispatch(
								addToFavorites({ ...cardInfo, doBookmark: nextDoBookmarkState })
							);
						} else {
							dispatch(removeFromFavorites(cardInfo));
						}

						// props.addMovieToFavorites(cardInfo);
					}}
				>
					<i className='d-flex justify-content-center align-items-center'>
						{cardInfo.doBookmark ? (
							<BsBookmarkHeartFill />
						) : (
							<BsBookmarkHeart />
						)}
						{/* <BsBookmarkHeartFill /> */}
					</i>
				</div>
			</div>
		</div>
	);
}

export default MovieCard;
