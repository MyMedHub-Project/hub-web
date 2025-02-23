"use server";

import { AxiosError } from "axios";
import axiosInstance from "@/core/axios";
import { Endpoints } from "@/core/endpoints";

export const resendVerificationCode = async (data: any) => {
	try {
		const res = await axiosInstance.post(
			Endpoints.auth["resend-verification"] + data.role,
			data
		);

		if (res.data) {
			return res.data;
		}
	} catch (err) {
		if (err instanceof AxiosError) {
			console.log(err.response?.data);
		} else {
			console.log(err);
		}
	}
};
