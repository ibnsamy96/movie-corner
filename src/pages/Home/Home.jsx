import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import MoviesList from "../../components/MoviesList/MoviesList";
import axiosInstance from "../../network/config.js";
import { getMovies } from "./../../store/actions/movies";
import LanguageContext from "../../context/language.js";

function Home(props) {
	// const [moviesList, setMoviesList] = useState([]);

	const favorites = useSelector((state) => state.favorites);
	const moviesList = useSelector((state) => state.movies);
	const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);

	const [isLoading, setIsLoading] = useState(true);

	const location = useLocation();
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
	});

	const dispatch = useDispatch();

	useEffect(() => {
		const wantedPage = new URLSearchParams(location.search).get("page") || 1;
		setIsLoading(true);

		async function fetchData() {
			try {
				// const request = await axiosInstance.get("/movie/popular", {
				// 	params: {
				// 		page: wantedPage,
				// 	},
				// });

				dispatch(getMovies(selectedLanguage));

				// const fetchedMovies = request.data.results;
				moviesList.forEach((movieInfo) => {
					const favoritesIds = favorites.map((obj) => obj.id);
					if (favoritesIds.includes(movieInfo.id)) movieInfo.doBookmark = true;
					else movieInfo.doBookmark = false;
				});

				// setMoviesList([...fetchedMovies]);
				setIsLoading(false);
				// setPagination({
				// 	currentPage: request.data.page,
				// 	totalPages: request.data.total_pages,
				// });
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		}
		fetchData();
	}, [location, selectedLanguage]);

	return (
		<>
			{isLoading ? (
				<div
					dir={selectedLanguage === "en" ? "ltr" : "rtl"}
					className='h-100 row justify-content-center align-items-center'
				>
					<div className='spinner-grow text-info' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			) : (
				<>
					<h2
						dir={selectedLanguage === "en" ? "ltr" : "rtl"}
						className='text-center h1 mb-3'
					>
						{selectedLanguage === "en" ? "Popular Movies" : "أفلامنا المختارة"}
					</h2>
					<MoviesList addMovieToFavorites={props.addMovieToFavorites} />

					<nav aria-label='...'>
						<ul className='pagination  justify-content-center pb-5'>
							{new Array(pagination.totalPages)
								.slice(pagination.currentPage, pagination.currentPage + 8)
								.fill("3aa")
								.map((pageNum, index) => {
									console.log(index);
									return (
										<li
											className={
												"page-item fs-3  fw-lighter " +
												(index + 1 === pagination.currentPage
													? "active bg-info"
													: "")
											}
											aria-current={
												index + 1 === pagination.currentPage ? "page" : ""
											}
										>
											<Link className='page-link' to={"/?page=" + (index + 1)}>
												{index + 1}
											</Link>
										</li>
									);
								})}
						</ul>
					</nav>
				</>
			)}
		</>
	);
}

export default Home;
