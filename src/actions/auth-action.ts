import axiosInstance from "@/core/axios";
import { AxiosError } from "axios";
import { AuthError, User } from "next-auth";

/**
 * @todo get valid device object
 */
export const retrieveUser = async (email: string, passwordHash: string) => {
	const password = passwordHash;
	const loginCred = {
		email: email,
		password: password,
		device: {
			id: "device123",
			name: "My Laptop",
			version: "v2.0",
			ipAddress: "192.168.1.100",
			os: "Windows 10",
			platform: "web",
			pushNotificationToken:
				"dEnFPzweKQI:APA91bFZ2o2WZr0v2cV1ljZGv0GxJZxou3K9bYlsf1U1D7K-Bzkt3iHc4KPU3Wi_jxJCDzZT8X9cFZu1Fbc_LMvi-L8d02DJVKHAGXrf9Ue1tJbH5XoUeqc1Kl0P_1XHmDPqHe5i7R1y"
		}
	};

	try {
		let userObj: User | null = null;

		const res = await axiosInstance.post(
			process.env.NEXT_APP_API_URL + "/auth/login",
			loginCred
		);

		if (!res || !res.data) {
			throw new AuthError(
				"Unexpected Error: API did not return user data."
			);
		}

		// console.log(res.data.data);
		// return;

		const { user, ...otherData } = res.data.data;
		const userResponse: any = {
			...user,
			...otherData
		};

		userObj = userResponse as User;

		return userObj;
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response && error.response.data) {
				throw new AuthError(
					error.response.data.message || "Authentication failed."
				);
			}
		} else {
			throw new AuthError("Authentication failed: Try again.");
		}

		return null;
	}
};
