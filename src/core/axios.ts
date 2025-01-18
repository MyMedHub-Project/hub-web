import axios from "axios";
// import { getCookie, deleteCookie } from "cookies-next";
// import { Routes } from "./routing";
import appConfig from "../../config";

const axiosInstance = axios.create({
	baseURL: `${appConfig.api.baseUrl}`,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	},
	timeout: 60 * 1000,
	timeoutErrorMessage: "An error occured, check your internet connection"
});

axiosInstance.interceptors.request.use(
	(config) => {
		// const token = getCookie(StorageKeys.TOKEN);
		// if (token) {
		// 	config.headers.cat = token;
		// }
		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log(error);
		// if (error.response && error.response.status === 401) {
		// 	wait(1000).then(() => {
		// 		deleteCookie(StorageKeys.TOKEN);
		// 		window.location.href = Routes.auth["sign-in"];
		// 	});
		// }
		return Promise.reject(error);
	}
);

export default axiosInstance;
