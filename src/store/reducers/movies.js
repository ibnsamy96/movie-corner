const initialMoviesState = [];

function moviesReducer(state = initialMoviesState, action) {
	// const newArr = [...state];
	switch (action.type) {
		case "GET_MOVIES":
			return [...action.payload];
			// newArr.push(action.payload);
			break;
		case "SEARCH_FOR_MOVIE":
			return [...action.payload];
			// newArr.push(action.payload);
			break;

		default:
			// break;
			return state;
	}

	// state = newArr;
}

export default moviesReducer;
