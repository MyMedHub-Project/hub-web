// import { getToken } from "next-auth/jwt";
// import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
// import axiosInstance from "@/core/axios";
import { Routes } from "@/core/routing";
import LoginAuthPage from "@/view/auth/login-auth-page";
import { TokenDisplay } from "@/app/(roles)/chunks";

const LoginAuth = async () => {
	const session = await auth();

	if (!session) {
		redirect(Routes.auth["sign-in"]);
	}

	if (session.loginVerified) {
		redirect(Routes.root);
	}

	return (
		<>
			<TokenDisplay token={session.user?.twoFactor?.token} />
			<LoginAuthPage />
		</>
	);
};

export default LoginAuth;
