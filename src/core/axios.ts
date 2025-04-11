import axios, { AxiosRequestConfig } from "axios";
import appConfig from "../../config";

// Create a simple in-memory cache for GET requests
interface CacheItem {
	data: any;
	timestamp: number;
	expiry: number; // cache TTL in ms
}

const cache = new Map<string, CacheItem>();
const DEFAULT_CACHE_TTL = 30 * 1000; // 30 seconds default TTL

// Cache helper functions
const getCacheKey = (config: AxiosRequestConfig): string =>
	`${config.method}_${config.url}_${JSON.stringify(config.params)}`;

const getCachedResponse = (config: AxiosRequestConfig): any | null => {
	if (config.method?.toLowerCase() !== "get") return null;

	const key = getCacheKey(config);
	const item = cache.get(key);

	if (!item) return null;

	// Check if cache is expired
	if (Date.now() > item.timestamp + item.expiry) {
		cache.delete(key);
		return null;
	}

	return item.data;
};

const setCachedResponse = (
	config: AxiosRequestConfig,
	data: any,
	ttl = DEFAULT_CACHE_TTL
): void => {
	if (config.method?.toLowerCase() !== "get") return;

	const key = getCacheKey(config);
	cache.set(key, {
		data,
		timestamp: Date.now(),
		expiry: ttl
	});
};

// Create optimized axios instance
const axiosInstance = axios.create({
	baseURL: `${appConfig.api.baseUrl}`,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	},
	timeout: 30 * 1000 // Reduced timeout for better performance
});

// Add request interceptor with caching
axiosInstance.interceptors.request.use(
	(config) => {
		// Check if we have a cached response for GET requests
		const cachedResponse = getCachedResponse(config);
		if (cachedResponse) {
			// Return a cancellation token and resolve with cached response in response interceptor
			const source = axios.CancelToken.source();
			config.cancelToken = source.token;
			source.cancel(JSON.stringify(cachedResponse));
			return config;
		}

		// Continue with regular request
		return config;
	},
	(error) => Promise.reject(error)
);

// Optimize response handling
axiosInstance.interceptors.response.use(
	(response) => {
		// Cache successful GET responses
		if (response.config.method?.toLowerCase() === "get") {
			setCachedResponse(response.config, response.data);
		}

		return response;
	},
	(error) => {
		// Check if error is due to canceled request (using cache)
		if (axios.isCancel(error)) {
			const errorMessage = error?.message || "";
			const errorConfig = error?.config || {};

			try {
				return Promise.resolve({
					data: JSON.parse(errorMessage),
					status: 200,
					statusText: "OK",
					headers: {},
					config: errorConfig,
					cached: true
				});
			} catch (e) {
				// If parsing fails, let it continue to error handling
			}
		}

		console.log(error);
		return Promise.reject(error);
	}
);

export default axiosInstance;
