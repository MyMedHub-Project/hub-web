import { AxiosError } from "axios";
import { AuthError, User } from "next-auth";
import axiosInstance from "@/core/axios";
import { Endpoints } from "@/core/endpoints";

/**
 * @todo get valid device object
 */
export const retrieveUser = async (
	email: string,
	password: string,
	resData?: any
) => {
	const formatData = (data: any) => {
		const { user, ...otherData } = data;
		const formattedData: any = { ...user, ...otherData };

		return formattedData;
	};

	if (resData) {
		const data = JSON.parse(resData);

		console.log(data);
		return formatData(data) as User;
	}

	try {
		const res = await axiosInstance.post(Endpoints.auth["sign-in"], {
			email,
			password,
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
		});

		if (!res || !res.data) {
			return null;
		}

		return formatData(res.data.data) as User;
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response && error.response.data) {
				throw new AuthError(
					error.response.data.message || "Authentication failed."
				);
			}
		} else {
			throw new AuthError("Authentication failed. Try again.");
		}

		return null;
	}
};
