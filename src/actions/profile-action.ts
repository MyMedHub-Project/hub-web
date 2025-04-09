"use server";

import { AxiosError } from "axios";
import axiosInstance from "@/core/axios";
import { Endpoints } from "@/core/endpoints";
import { UserTypes } from "@/constants/enums";
import { getEndPoint } from "@/lib/utils";

export const getProfile = async (cat: string, role: UserTypes) => {
	// console.log(role);
	try {
		const profile = await axiosInstance.get(
			Endpoints.profile + getEndPoint(role),
			{
				headers: {
					cat
				}
			}
		);

		return profile.data.data ?? null;
	} catch (error) {
		if (error instanceof AxiosError) {
			console.log(error.response?.data);
		} else console.log(error);
	}
};
