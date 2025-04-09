import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UserTypes } from "@/constants/enums";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getEndPoint = (role: UserTypes) => {
	switch (role) {
		case UserTypes.INSTITUTION:
			return "institution";
		case UserTypes.DOCTOR:
			return "provider";
		case UserTypes.PATIENT:
			return "patient";
		case UserTypes.ADMIN:
			return "admin";
		default:
			return "patient";
	}
};
