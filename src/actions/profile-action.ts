"use server";

import { AxiosError } from "axios";
import axiosInstance from "@/core/axios";
import { Endpoints } from "@/core/endpoints";
import { UserTypes } from "@/constants/enums";
import { getEndPoint } from "@/lib/utils";
import { ProfileResponse } from "@/types/api.types";

export const getProfile = async (cat: string, role: UserTypes) => {
	const path = Endpoints.profile + getEndPoint(role);

	try {
		const profile = await axiosInstance.get<ProfileResponse>(path, {
			headers: { cat }
		});
		return profile.data.data ?? null;
	} catch (error) {
		if (error instanceof AxiosError) {
			console.log(error.response?.data);
		} else console.log(error);
	}
};
