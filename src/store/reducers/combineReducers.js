import { combineReducers } from "redux";

import favoritesReducer from "./favorites.js";
import moviesReducer from "./movies.js";

export default combineReducers({
	favorites: favoritesReducer,
	movies: moviesReducer,
});
