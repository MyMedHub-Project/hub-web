"use server";

import { signIn } from "@/auth";
import axiosInstance, { transformError } from "@/core/axios";
import { ApiEndpoint } from "@/core/apiEndpoint";

interface Request {
	id: string;
	token: string;
}

interface Response {
	status: "success";
	message: string;
	data: {
		cat: string;
		refreshCat: string;
		user: {
			id: string;
			institutionId: string;
			type: string;
			providerRole: string;
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

export const signInVerification = async (
	request: Request
): Promise<Error | void> => {
	const path = ApiEndpoint.AUTH.SIGN_IN_VERIFICATION;

	try {
		const response = await axiosInstance.post<Response>(path, request);

		if (response?.data && response?.data?.status === "success") {
			await signIn("credentials", {
				data: JSON.stringify(response.data.data),
				redirect: false
			});
		}
	} catch (error) {
		return transformError("signInVerification", error);
	}
};
