"use server";

import axiosInstance from "@/core/axios";
import { Endpoints } from "@/core/endpoints";
import { AxiosError } from "axios";

export const createAdmin = async (values: any) => {
	try {
		const res = await axiosInstance.post(
			Endpoints.auth["create-admin"],
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
