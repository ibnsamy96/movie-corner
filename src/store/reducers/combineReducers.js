import { combineReducers } from "redux";

import favoritesReducer from "./favorites.js";

export default combineReducers({
	favorites: favoritesReducer,
});
