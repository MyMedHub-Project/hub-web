"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export const handleSignIn = async (values: any) => {
	try {
		await signIn("credentials", {
			email: values.email,
			password: values.password,
			redirect: false
		});
	} catch (error) {
		if (error instanceof AuthError) {
			if (error.name === "CredentialsSignin") {
				return "An unexpected error occured. please try again.";
			} else {
				const errMessage = error.message
					.split(":")[0]
					?.split(".")[0]
					?.trim();

				return errMessage;
			}
		}
	}
};
