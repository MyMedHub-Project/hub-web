export const routeMappings: Record<
	"patient" | "institution_provider" | "institution",
	Record<string, string>
> = {
	patient: {
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
	institution_provider: {
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
	institution: {
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
