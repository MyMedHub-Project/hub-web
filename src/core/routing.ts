export const Routes = {
	ROOT: "/",
	ONBOARDING: "/auth/onboarding",
	AUTH: {
		ONBOARDING: {
			ROOT: "/auth/onboarding",
			INSTITUTION: {
				ROOT: "/auth/onboarding/institution",
				ADMIN: "/auth/onboarding/institution/admin"
			},
			PATIENT: "/auth/onboarding/patient",
			SUCCESS: "/auth/onboarding/success",
			VERIFY_EMAIL: "/auth/onboarding/verify-email",
			VERIFY_PHONE: "/auth/onboarding/verify-phone"
		},
		FORGOT_PASSWORD: {
			ROOT: "/auth/forgot-password",
			RESET: "/auth/forgot-password/reset",
			SUCCESS: "/auth/forgot-password/success",
			VERIFICATION: "/auth/forgot-password/verification"
		},
		SIGN_IN: {
			ROOT: "/auth/sign-in",
			VERIFICATION: "/auth/sign-in/verification"
		}
	},
	PROFILE: {
		ROOT: "/profile",
		EDIT: "/profile/edit"
	},
	DASHBOARD: {
		ROOT: "/home",
		PATIENTS: "/dashboard/patients",
		APPOINTMENTS: "/dashboard/appointments",
		SETTINGS: "/dashboard/settings"
	},
	NOT_FOUND: "/404"
};
