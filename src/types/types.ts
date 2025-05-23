import { Session, User } from "next-auth";
import { Profile } from "@/types/api.types";

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

export interface UserSession {
	session: Session | null;
	user: User | undefined;
	isAuthenticated: boolean;
	isLoading: boolean;
}

export interface SessionProfile extends UserSession {
	profile: Profile | undefined;
}

export type LoaderState = "verified" | "verifying" | "failed" | "error";

export type BtnStatus = "active" | "loading" | "disabled";

export interface AppointmentCardData {
	id: string;
	doctorName: string;
	doctorSpecialization: string;
	appointmentDate: string;
	appointmentTime: string;
	profileImage: string;
}

export interface NavItemData {
	icon: React.ReactNode;
	label: string;
	href: string;
}

export type NavState = "open" | "closed";

export interface Medication {
	planId: string;
	condition: string;
	description: string;
	reminder: string;
}

export interface ProvidersMiniCardProps {
	name: string;
	specialty: string;
	image: string;
}
