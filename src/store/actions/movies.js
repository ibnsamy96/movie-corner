import axiosInstance from "../../network/config";

export const getMovies = (selectedLanguage) => async (dispatch) => {
	try {
		const response = await axiosInstance.get("/movie/popular", {
			params: {
				language: selectedLanguage,
			},
		});
		console.log(response.data.results);
		dispatch({ type: "GET_MOVIES", payload: response.data.results });
	} catch (error) {
		console.log("err");
	}
};

export const searchForAMovie = (searchQuery) => async (dispatch) => {
	try {
		const response = await axiosInstance.get("/search/movie", {
			params: {
				query: searchQuery,
			},
		});
		dispatch({ type: "SEARCH_FOR_MOVIE", payload: response.data.results });
	} catch (error) {
		console.log("err");
	}
};
