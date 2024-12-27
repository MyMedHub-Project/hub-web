"use server";

import axiosInstance from "@/core/axios";
import { AxiosError } from "axios";

export const verifyPhone = async (
	verData: any,
	role: string | undefined = "user"
) => {
	try {
		console.log(verData);
		const res = await axiosInstance.post(
			process.env.NEXT_APP_API_URL + "/auth/verification/" + role,
			{
				countryCode: verData.countryCode,
				type: "phone",
				id: verData.id,
				token: verData.token
			}
		);

		console.log(res.data);
		return res.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			const errData = error.response?.data;

			console.error(errData);
			return errData;
		}

		console.error(error);
		return { status: "failed" };
	}
};
