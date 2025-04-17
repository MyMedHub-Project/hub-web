"use server";

import { cache } from "react";
import axiosInstance, { transformError } from "@/core/axios";
import { ApiEndpoint } from "@/core/apiEndpoint";

interface Request {
	id: string;
	token: string;
}

interface Response {
	status: string;
	message: string;
	data: null;
}

// Using cache() to deduplicate identical requests during the same render pass
export const forgotPasswordVerification = cache(
	async (request: Request): Promise<void | Error> => {
		const path = ApiEndpoint.AUTH.FORGOT_PASSWORD_VERIFICATION;

		try {
			await axiosInstance.post<Response>(path, request);
		} catch (error) {
			return transformError("forgotPasswordVerification", error);
		}
	}
);
