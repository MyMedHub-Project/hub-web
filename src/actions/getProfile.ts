"use server";

import axiosInstance, { transformError } from "@/core/axios";
import { ApiEndpoint } from "@/core/apiEndpoint";
import { UserTypes } from "@/constants/enums";
import { getEndPoint } from "@/lib/utils";

interface Request {
	cat: string;
	role: UserTypes;
}

interface Response {
	status: string;
	message: string;
	data: {
		id: string;
		type: string;
		firstname: string;
		lastname: string;
		emailVerified: string;
		email: string;
		phone: string;
		phoneVerified: boolean;
		address: {
			street: string;
			city: string;
			state: string;
			country: string;
		};
		gender: string;
		dob: string;
		language: string;
		passwordRecoveryMode: string;
		emergencyContact: {};
		lastLogin: string;
	};
}

export const getProfile = async ({
	cat,
	role
}: Request): Promise<Response["data"] | Error> => {
	const path = ApiEndpoint.PROFILE + getEndPoint(role);

	try {
		const response = await axiosInstance.get<Response>(path, {
			headers: { cat }
		});

		return response.data.data;
	} catch (error) {
		return transformError("getProfile", error);
	}
};
