export interface Profile {
	id: string;
	type: string;
	firstname: string;
	lastname: string;
	emailVerified: string;
	email: string;
	phone: string;
	phoneVerified: boolean;
	address: {
		street: string;
		city: string;
		state: string;
		country: string;
	};
	gender: string;
	dob: string;
	language: string;
	passwordRecoveryMode: string;
	emergencyContact: {};
	lastLogin: string;
}

export type ProfileResponse = {
	data: Profile;
	message: string;
	status: string;
};

export type ResendVerificationReq = {
	type: "user" | "institution";
	data: {
		countryCode?: string;
		id: string;
		type: "phone" | "email";
	};
};

export type ResendVerificationResponse = {
	message: string;
	status: string;
};
