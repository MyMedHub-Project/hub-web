"use server";

import { AxiosError } from "axios";
import axiosInstance from "@/core/axios";
import { Endpoints } from "@/core/endpoints";

export const getProfile = async (
	cat: string,
	role: string | undefined = "patient"
) => {
	try {
		const profile = await axiosInstance.get(Endpoints.profile + role, {
			headers: {
				cat
			}
		});

		return profile.data.data ?? null;
	} catch (error) {
		if (error instanceof AxiosError) {
			console.log(error.response?.data);
		} else console.log(error);
	}
};
