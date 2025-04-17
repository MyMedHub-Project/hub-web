"use server";

import axiosInstance, { transformError } from "@/core/axios";
import { ApiEndpoint } from "@/core/apiEndpoint";

type UserRole = "patient" | "doctor" | "user" | string;

interface Request {
	countryCode: string;
	type: "email" | "phone";
	token: string;
	id: string;
}

interface Response {
	message: string;
	status: string;
	data: {
		emailVerified: boolean;
		id: string;
		phoneVerified: boolean;
	};
}

export const signUpVerification = async (
	request: Request,
	role: UserRole
): Promise<Response["data"] | Error> => {
	// Normalize role for API endpoint
	const normalizedRole = role === "patient" ? "user" : role;
	const path = ApiEndpoint.AUTH.VERIFICATION + normalizedRole;

	try {
		const res = await axiosInstance.post<Response>(path, {
			countryCode: request.countryCode,
			type: request.type,
			id: request.id,
			token: request.token
		});

		return res.data.data;
	} catch (error) {
		return transformError("signUpVerification", error);
	}
};
