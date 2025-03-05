// types/routing.ts
export type RouteMapping = {
	[Key in "patient" | "institution_provider" | "institution"]: {
		[RouteKey: string]: string;
	};
};

export const routeMappings: RouteMapping = {
	patient: {
		dashboard: "/patient/",
		conditions: "/patient/",
		appointments: "/patient/",
		orders: "/patient/orders",
		messaging: "/patient/messaging",
		family: "/patient/",
		settings: "/patient/settings",
		support: "/patient/support",

		profile: "/patient/profile"
	},
	institution_provider: {
		dashboard: "/doctor/",
		treatment: "/doctor/",
		appointments: "/doctor/",
		orders: "/patient/orders",
		results: "/doctor/",
		messaging: "/patient/messaging",
		family: "/doctor/",
		settings: "/patient/settings",
		support: "/doctor/",

		profile: "/patient/profile"
	},
	institution: {
		dashboard: "/institution/",
		conditions: "/institution/",
		appointments: "/institution/",
		orders: "/patient/orders",
		messaging: "/patient/messaging",
		family: "/institution/",
		settings: "/patient/settings",
		support: "/institution/",

		profile: "/patient/profile"
	}
};
