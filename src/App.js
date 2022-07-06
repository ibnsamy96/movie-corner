// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext, useState } from "react";
import LanguageSwitcher from "./context/language.js";
import Favorites from "./pages/Favorites/Favorites.jsx";
import Search from "./pages/Search/Search.jsx";
import Home from "./pages/Home/Home.jsx";
import Movie from "./pages/Movie/Movie.jsx";

function App() {
	const [selectedLanguage, setSelectedLanguage] = useState("en");

	return (
		<Router>
			<LanguageSwitcher.Provider
				value={{ selectedLanguage, setSelectedLanguage }}
			>
				<Navbar />
				<main className='container-fluid p-5 pt-4 h-100 '>
					<Switch>
						<Route path='/' exact render={() => <Home />} />
						<Route path='/favorites' render={() => <Favorites />} />
						<Route path='/movie/:movieId' render={() => <Movie />} />
						<Route path='/search' render={() => <Search />} />
						<Route path='*' component={() => <h1>Not Found</h1>} />
					</Switch>
				</main>
			</LanguageSwitcher.Provider>
		</Router>
	);
}

export default App;
