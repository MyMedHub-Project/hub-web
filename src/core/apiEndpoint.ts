const base = process.env.NEXT_APP_API_URL;

export const ApiEndpoint = {
	AUTH: {
		SIGN_IN: `${base}/auth/login`,
		SIGN_IN_VERIFICATION: `${base}/auth/login/v-2fa`,
		SIGN_IN_VERIFICATION_RESEND: `${base}/auth/login/r-2fa`,
		SIGN_UP: `${base}/auth/sign-up/`,
		VERIFICATION: `${base}/auth/verification/`,
		RESEND_VERIFICATION: `${base}/auth/resend-verification/`,
		CREATE_ADMIN: `${base}/auth/sign-up/institution-admin`,
		FORGOT_PASSWORD: `${base}/auth/forgot-password`,
		FORGOT_PASSWORD_VERIFICATION: `${base}/auth/verify-forgot-password`,
		RESET_PASSWORD: `${base}/auth/reset-password`
	},

	PROFILE: `${base}/account/profile/`
};
