"use server";

import axiosInstance from "@/core/axios";
import { Endpoints } from "@/core/endpoints";
import { AxiosError } from "axios";

export const handleSignUp = async (
	userData: any,
	signUpType: string | undefined = "user"
) => {
	try {
		const res = await axiosInstance.post(
			Endpoints.auth["sign-up"] + signUpType,
			userData
		);

		const data = res.data;

		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response && error.response.data) {
				let message = error.response.data.message;

				if (message["validation-error"]) {
					message = Object.values(message["validation-error"])[0];
				}

				if (
					message ===
					'ERROR: duplicate key value violates unique constraint "uni_users_email" (SQLSTATE 23505)'
				) {
					return "User with given email already exist";
				}

				if (
					message ===
					'ERROR: duplicate key value violates unique constraint "uni_users_phone" (SQLSTATE 23505)'
				) {
					return "User with given phone number already exist";
				}

				console.error(error.response.data);
				return message || "Error! Invalid data provided";
			}
		}

		return "An unexpected error occured, please try again.";
	}
};
