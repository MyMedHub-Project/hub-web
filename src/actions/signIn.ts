"use server";

import { User } from "next-auth";
import { signIn } from "@/auth";
import axiosInstance, { transformError } from "@/core/axios";
import { ApiEndpoint } from "@/core/apiEndpoint";
import { getServerSession } from "@/hooks/getServerSession";

export namespace Login {
	export interface Request {
		email: string;
		password: string;
		device?: {
			id: string;
			name: string;
			version: string;
			ipAddress: string;
			os: string;
			platform: string;
			pushNotificationToken: string;
		};
	}

	export interface Response {
		message: string;
		status: string;

		data: {
			cat?: string;
			refreshCat?: string;
			twoFactor?: {
				id: string;
				token: string;
				type: string;
				value: string;
			};
			user?: {
				id: string;
				type: string;
				firstname: string;
				lastname: string;
				email: string;
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
				isVerified: boolean;
				timezone: string;
			};
		};
	}
}

export const login = async (
	request: Login.Request
): Promise<Login.Response["data"] | Error> => {
	const path = ApiEndpoint.AUTH.SIGN_IN;

	try {
		const res = await axiosInstance.post<Login.Response>(path, request);
		return res.data.data;
	} catch (error) {
		return transformError("login", error);
	}
};

export const resolveLogin = async (
	request: Login.Request
): Promise<Error | User | void> => {
	const authType = "credentials";

	try {
		await signIn(authType, {
			email: request.email,
			password: request.password,
			redirect: false
		});

		const session = await getServerSession();
		return session?.user;
	} catch (err) {
		return transformError("resolveLogin", err);
	}
};
