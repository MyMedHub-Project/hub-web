// "use client";

// import appConfig from "../../config";

// // Cache for mock data to avoid repeated calculations
// const mockDataCache = new Map<string, any>();

// // Define types for better type checking
// interface MockDataOptions {
// 	endpoint: string;
// 	params?: Record<string, any>;
// 	method?: string;
// }

// /**
//  * Returns true if the application is running in development mode
//  * and the focus path environment variable is set
//  */
// export const isDevMode = (): boolean => {
// 	if (typeof window === "undefined") return false;

// 	return appConfig.env.IS_DEV && !!process.env.NEXT_PUBLIC_FOCUS_PATH;
// };

// /**
//  * Gets the current focus path for development
//  */
// export const getDevFocusPath = (): string | null => {
// 	if (!isDevMode()) return null;

// 	return process.env.NEXT_PUBLIC_FOCUS_PATH || null;
// };

// /**
//  * Gets mock data for a given endpoint in development mode
//  * Uses caching to avoid repeated calculations
//  */
// export const getDevMockData = (options: MockDataOptions): any => {
// 	const { endpoint, method = "GET", params = {} } = options;

// 	if (!isDevMode()) return null;

// 	// Create a cache key based on endpoint, params, and method
// 	const cacheKey = `${method}_${endpoint}_${JSON.stringify(params)}`;

// 	// Return cached data if available
// 	if (mockDataCache.has(cacheKey)) {
// 		return mockDataCache.get(cacheKey);
// 	}

// 	// Generate mock data based on endpoint
// 	let mockData: any = null;

// 	switch (endpoint) {
// 		case "/api/auth/session":
// 			// Mock authentication session
// 			const focusPath = getDevFocusPath();
// 			mockData = {
// 				user: {
// 					id: "123456",
// 					email: "dev@example.com",
// 					firstname: "Dev",
// 					lastname: "User",
// 					// Set type based on focus path
// 					type:
// 						focusPath === "patient"
// 							? "patient"
// 							: focusPath === "doctor"
// 								? "doctor"
// 								: focusPath === "institution"
// 									? "institution"
// 									: "patient"
// 				},
// 				expires: new Date(
// 					Date.now() + 24 * 60 * 60 * 1000
// 				).toISOString()
// 			};
// 			break;

// 		case "/api/profile":
// 			// Mock profile data
// 			mockData = {
// 				id: "123456",
// 				email: "dev@example.com",
// 				firstname: "Dev",
// 				lastname: "User",
// 				phone: "+123456789",
// 				address: {
// 					street: "123 Dev Street",
// 					city: "Dev City",
// 					state: "Dev State",
// 					country: "Dev Country"
// 				}
// 			};
// 			break;

// 		case "/api/appointments":
// 			// Mock appointments
// 			mockData = {
// 				appointments: [
// 					{
// 						id: "1",
// 						title: "Mock Appointment 1",
// 						date: new Date(
// 							Date.now() + 24 * 60 * 60 * 1000
// 						).toISOString(),
// 						doctor: "Dr. Mock Doctor",
// 						status: "scheduled"
// 					},
// 					{
// 						id: "2",
// 						title: "Mock Appointment 2",
// 						date: new Date(
// 							Date.now() + 48 * 60 * 60 * 1000
// 						).toISOString(),
// 						doctor: "Dr. Mock Specialist",
// 						status: "scheduled"
// 					}
// 				]
// 			};
// 			break;

// 		// Add more mock data for other endpoints as needed

// 		default:
// 			// Return null for unknown endpoints
// 			mockData = null;
// 	}

// 	// Cache the result if it's not null
// 	if (mockData) {
// 		mockDataCache.set(cacheKey, mockData);

// 		// Ensure the cache doesn't get too large
// 		if (mockDataCache.size > 100) {
// 			// Remove the oldest items when the cache gets too large
// 			const oldestKey = mockDataCache.keys().next().value;
// 			oldestKey && mockDataCache.delete(oldestKey);
// 		}
// 	}

// 	return mockData;
// };

// /**
//  * Utility to log messages only in development mode
//  */
// export const logDev = (message: string, emoji = "🔧"): void => {
// 	if (!appConfig.env.IS_DEV) return;

// 	console.log(`${emoji} DEV: ${message}`);
// };
