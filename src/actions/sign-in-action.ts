"use server";

import { signIn } from "@/auth";
import { Routes } from "@/core/routing";
import { AuthError } from "next-auth";
import { permanentRedirect, redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const handleSignIn = async (values: any) => {
	try {
		await signIn("credentials", {
			email: values.email,
			password: values.password,
			redirect: false,
			redirectTo: Routes.root
		});
	} catch (error) {
		if (error instanceof AuthError) {
			if (error.name === "CredentialsSignin") {
				return "An unexpected error occured, please try again.";
			} else return error.message;
		}
	}
};
