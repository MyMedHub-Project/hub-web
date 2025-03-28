export interface Provider {
	id: number;
	name: string;
	role: string;
	avatar?: string;
	gender: string;
	dob: string;
	speciality: string;
	licenseNumber: string;
}

export interface AppointDoctor {
	id: string;
	name: string;
	avatar: string;
	role: string;
	location: string;
	rating: number;
	reviews: string;
}

export interface AppointmentData {
	id: string;
	name: string;
	profileImage: string;
	appointment: {
		date: string;
		time: string;
		type: string;
	};
	// status: "confirmed" | "pending" | "cancelled";
}
