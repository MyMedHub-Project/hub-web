"use server";

import { auth } from "@/auth";
import axiosInstance from "@/core/axios";
import { AxiosError } from "axios";
import { signIn } from "@/auth";
import { Endpoints } from "@/core/endpoints";

export const verifyLogin = async (code: any) => {
	const session = await auth();

	try {
		const response = await axiosInstance.post(
			Endpoints.auth["sign-in-verification"],
			{
				id: session?.user?.twoFactor?.id,
				token: code
			}
		);

		if (response) {
			try {
				await signIn("credentials", {
					data: JSON.stringify(response.data.data),
					redirect: false
				});
			} catch (err) {
				console.log(err);
			}
		}
	} catch (error) {
		if (error instanceof AxiosError) {
			const errData = error.response?.data;

			console.error(errData);
			return errData;
		}

		console.error(error);
		return { status: "retry" };
	}
};
