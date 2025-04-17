"use server";

import axiosInstance, { transformError } from "@/core/axios";
import { ApiEndpoint } from "@/core/apiEndpoint";

interface Request {
	type: "user" | "institution";
	data: {
		countryCode?: string;
		id: string;
		type: "phone" | "email";
	};
}

interface Response {
	message: string;
	status: string;
	data: {
		emailToken: string;
		phoneToken: string;
	};
}

export const signUpVerificationResend = async (
	request: Request
): Promise<Response["data"] | Error> => {
	const path = ApiEndpoint.AUTH.RESEND_VERIFICATION + request.type;

	try {
		const res = await axiosInstance.post<Response>(path, request.data);

		return res.data.data;
	} catch (err) {
		return transformError("signUpVerificationResend", err);
	}
};
