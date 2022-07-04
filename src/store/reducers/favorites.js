const initialFavoritesState = [];

function favoritesReducer(state = initialFavoritesState, action) {
	const newArr = [...state];
	switch (action.type) {
		case "ADD_MOVIE":
			newArr.push(action.payload);
			break;

		case "Remove_MOVIE":
			const index = state.findIndex(
				(favMovieInfo) => action.payload.id === favMovieInfo.id
			);
			if (index < 0) break;
			// const newArr = [...state];
			newArr.splice(index, 1);

			// state.push(action.payload);
			break;
		default:
			break;
	}

	state = newArr;
	return state;
}

export default favoritesReducer;
