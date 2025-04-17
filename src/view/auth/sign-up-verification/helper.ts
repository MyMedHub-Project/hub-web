import { VerificationDataTypes } from "@/app/auth/onboarding/context";
import { ResendVerificationReq } from "@/types/api.types";

export const getResendVerificationData = (
	data: VerificationDataTypes & { type: "phone" | "email" }
): ResendVerificationReq => ({
	type: data.role === "patient" ? "user" : "institution",
	data: {
		id: data.type === "email" ? data.email : data.phone,
		countryCode: data.countryCode,
		type: data.type
	}
});
