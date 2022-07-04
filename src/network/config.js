import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
	params: {
		api_key: "532501a7d11a9097e5a247b634f261a1",
	},
});

export default axiosInstance;
