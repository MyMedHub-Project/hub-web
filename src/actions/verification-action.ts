"use server";

import axiosInstance from "@/core/axios";
import { Endpoints } from "@/core/endpoints";
import { AxiosError } from "axios";

export const verify = async (verData: any, role: string) => {
	if (role === "patient") {
		role = "user";
	}

	try {
		const res = await axiosInstance.post(
			Endpoints.auth["verification"] + role,
			{
				countryCode: verData.countryCode,
				type: verData.type,
				id: verData.id,
				token: verData.token
			}
		);

		return res.data;
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
