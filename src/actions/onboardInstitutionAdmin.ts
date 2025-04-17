"use server";

import axiosInstance, { transformError } from "@/core/axios";
import { ApiEndpoint } from "@/core/apiEndpoint";

interface Request {
	onboardingToken: string;
	firstname: string;
	lastname: string;
	language: string;
}

interface Response {
	status: string;
	message: string;
	data: {
		token: {
			emailToken: string;
			phoneToken: string;
		};
		user: {
			id: string;
			type: string;
			firstname: string;
			lastname: string;
			emailVerified: string;
			phone: string;
			address: {};
			status: string;
			createdAt: string;
		};
	};
}

export const onboardInstitutionAdmin = async (
	request: Request
): Promise<Error | void> => {
	const path = ApiEndpoint.AUTH.CREATE_ADMIN;

	try {
		await axiosInstance.post<Response>(path, request);
	} catch (error) {
		return transformError("onboardInstitutionAdmin", error);
	}
};
