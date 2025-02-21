const base = process.env.NEXT_APP_API_URL;

export const Endpoints = {
	auth: {
		"sign-in": base + "/auth/login",
		"sign-in-verification": base + "/auth/login/v-2fa",
		"sign-up": base + "/auth/sign-up/",
		verification: base + "/auth/verification/",
		"resend-verification": base + "/auth/resend-verification/",
		"create-admin": base + "/auth/sign-up/institution-admin",
		"forgot-password": "",
		"reset-password": ""
	},
	profile: base + "/account/profile/"
};
