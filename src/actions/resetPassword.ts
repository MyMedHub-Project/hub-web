"use server";

import axiosInstance, { transformError } from "@/core/axios";
import { ApiEndpoint } from "@/core/apiEndpoint";

interface Request {
	id: string;
	password: string;
}

interface Response {
	status: string;
	message: string;
	data: null;
}

export const resetPassword = async (
	request: Request
): Promise<void | Error> => {
	const path = ApiEndpoint.AUTH.RESET_PASSWORD;

	try {
		await axiosInstance.post<Response>(path, request);
	} catch (error) {
		return transformError("resetPassword", error);
	}
};
