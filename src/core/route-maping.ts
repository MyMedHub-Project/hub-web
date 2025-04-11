import { UserTypes } from "@/constants/enums";

export const routeMappings: Record<string, Record<string, string>> = {
	[UserTypes.PATIENT]: {
		dashboard: "/patient/",
		conditions: "/patient/conditions",
		appointments: "/sections/appointments",
		orders: "/sections/orders",
		messaging: "/sections/messaging",
		family: "/sections/family",
		settings: "/sections/settings",
		support: "/sections/support",

		profile: "/patient/profile"
	},
	[UserTypes.DOCTOR]: {
		dashboard: "/doctor/",
		"treatment-plans": "/doctor/treatment-plans",
		appointments: "/sections/appointments",
		orders: "/sections/orders",
		results: "/doctor/results",
		messaging: "/sections/messaging",
		family: "/sections/family",
		settings: "/sections/settings",
		support: "/sections/support",

		profile: "/doctor/profile"
	},
	[UserTypes.INSTITUTION]: {
		dashboard: "/institution/",
		conditions: "/institution/conditions",
		appointments: "/sections/appointments",
		orders: "/sections/orders",
		messaging: "/sections/messaging",
		family: "/sections/family",
		settings: "/sections/settings",
		support: "/sections/support",

		profile: "/institution/profile"
	}
};
