"use server";

import axiosInstance from "@/core/axios";
import { AxiosError } from "axios";

export const createAdmin = async (values: any) => {
	try {
		const res = await axiosInstance.post(
			process.env.NEXT_APP_API_URL + "/auth/sign-up/institution-admin",
			values
		);

		console.log(res.data);
	} catch (error) {
		if (error instanceof AxiosError) {
			const errData = error.response?.data;

			console.error(errData);
			return errData.message;
		}

		console.error(error);
		return "An error occured. Please try again";
	}
};
