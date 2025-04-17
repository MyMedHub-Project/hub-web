"use server";

import axiosInstance, { transformError } from "@/core/axios";
import { ApiEndpoint } from "@/core/apiEndpoint";
import { VerificationRole } from "@/app/auth/onboarding/context";

interface Request {
	email: string;
	password: string;
	firstname: string;
	lastname: string;
}

interface Response {
	message: string;
	status: string;
	data: {
		token: {
			emailToken: string;
			phoneToken: string;
		};
		onboardingToken?: string;
		institution?: {
			id: string;
			name: string;
			address: {
				street: string;
				city: string;
				state: string;
				country: string;
			};
			logo: null;
			email: string;
			emailVerififed: boolean;
			phone: string;
			phoneVerified: boolean;
			status: string;
			createdAt: string;
		};
		user?: {
			id: string;
			type: string;
			firstname: string;
			lastname: string;
			emailVerified: string;
			phone: string;
			address: {
				street: string;
				city: string;
				state: string;
				country: string;
			};
			language: string;
			status: string;
			createdAt: string;
		};
	};
}

export const signUp = async (
	request: Request,
	role: VerificationRole
): Promise<Response["data"] | Error> => {
	const path =
		ApiEndpoint.AUTH.SIGN_UP + (role === "patient" ? "user" : role);

	try {
		const res = await axiosInstance.post<Response>(path, request);

		return res.data.data;
	} catch (err) {
		return transformError("signUp", err);
	}
};
