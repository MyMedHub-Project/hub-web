"use server";

import axiosInstance, { transformError } from "@/core/axios";
import { ApiEndpoint } from "@/core/apiEndpoint";

interface Request {
	id: string;
}

interface Response {
	message: string;
	status: string;
	data: {
		id: string;
		token: string;
		type: string;
		value: string;
	};
}

export const signInVerificationResend = async (
	request: Request
): Promise<Response["data"] | Error> => {
	const path = ApiEndpoint.AUTH.SIGN_IN_VERIFICATION_RESEND;

	try {
		const res = await axiosInstance.post<Response>(path, request);

		return res.data.data;
	} catch (err) {
		return transformError("signInVerificationResend", err);
	}
};
