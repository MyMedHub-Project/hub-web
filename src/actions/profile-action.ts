import axiosInstance from "@/core/axios";

export const getProfile = async (
	cat: string,
	role: string | undefined = "patient"
) => {
	const profile = await axiosInstance.get(
		process.env.NEXT_APP_API_URL + "/account/profile/" + role,
		{
			headers: {
				cat: cat
			}
		}
	);

	return profile.data.data ?? null;
};
