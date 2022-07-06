import React, { useContext, useState } from "react";
import { FcVideoFile, FcBookmark } from "react-icons/fc";
import "./Navbar.css";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LanguageContext from "../../context/language.js";

function Navbar() {
	const [searchQuery, setSearchQuery] = useState("");
	const favorites = useSelector((state) => state.favorites);

	const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);

	const history = useHistory();

	const submitSearch = (e) => {
		e.preventDefault();
		history.push("/search?q=" + searchQuery);
		console.log(searchQuery);
	};

	function handleSearchInput(e) {
		setSearchQuery(e.target.value);
	}

	return (
		<nav
			className='navbar navbar-expand-lg bg-light navbar-light'
			dir={selectedLanguage === "en" ? "ltr" : "rtl"}
		>
			<div className='container-fluid'>
				<NavLink
					className='navbar-brand text-info d-flex justify-content-center align-items-center'
					to='/'
				>
					<i className='d-flex justify-content-center align-items-center me-1'>
						<FcVideoFile />
					</i>
					{selectedLanguage === "en" ? "Movies Corner" : "رواق الأفلام"}
				</NavLink>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<NavLink
								className={(isActive) => {
									let linkClasses =
										"nav-link link-danger d-flex justify-content-center align-items-center fs-6 rounded-3";
									return isActive ? linkClasses + " selected" : linkClasses;
								}}
								to='favorites'
							>
								<i className='d-flex justify-content-center align-items-center me-1'>
									<FcBookmark />
								</i>{" "}
								{selectedLanguage === "en"
									? `Favorites (${favorites.length})`
									: `المفضلة (${favorites.length})`}
								{}
							</NavLink>
						</li>
					</ul>
					<form className='d-flex' role='search' onSubmit={submitSearch}>
						<button
							className='btn'
							type='button'
							onClick={() => {
								setSelectedLanguage(selectedLanguage === "en" ? "ar" : "en");
							}}
						>
							{selectedLanguage === "en" ? "العربية" : "English"}
						</button>
						<input
							className='form-control me-2'
							type='search'
							placeholder={
								selectedLanguage === "en"
									? "Type search query"
									: "عمّ تريد أن تبحث؟"
							}
							aria-label='Search'
							value={searchQuery}
							onChange={handleSearchInput}
						/>
						<button className='btn btn-outline-info' type='submit'>
							{selectedLanguage === "en" ? "Search" : "ابحث"}
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
