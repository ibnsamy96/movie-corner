export const addToFavorites = (payload) => ({
	type: "ADD_MOVIE",
	payload,
});

export const removeFromFavorites = (payload) => ({
	type: "Remove_MOVIE",
	payload,
});
