"use server";

import { cache } from "react";
import axiosInstance, { transformError } from "@/core/axios";
import { ApiEndpoint } from "@/core/apiEndpoint";

interface Request {
	type: string;
	email?: string;
	countryCode?: string;
	phone?: string;
}

interface Response {
	status: string;
	message: string;
	data: {
		id: string;
		devToken: string;
	};
}
export const forgotPassword = cache(
	async (request: Request): Promise<Response["data"] | Error> => {
		const path = ApiEndpoint.AUTH.FORGOT_PASSWORD;

		try {
			const response = await axiosInstance.post<Response>(path, request);
			return response.data.data;
		} catch (error) {
			return transformError("forgotPassword", error);
		}
	}
);
