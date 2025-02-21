"use server";

import axiosInstance from "@/core/axios";
import { Endpoints } from "@/core/endpoints";
import { AxiosError } from "axios";

export const getProfile = async (
	cat: string,
	role: string | undefined = "patient"
) => {
	try {
		const profile = await axiosInstance.get(Endpoints.profile + role, {
			headers: {
				cat: cat
			}
		});

		return profile.data.data ?? null;
	} catch (error) {
		if (error instanceof AxiosError) {
			console.log(error.response?.data);
		} else console.log(error);
	}
};
