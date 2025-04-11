import { redirect } from "next/navigation";
import { TokenDisplay } from "@/app/(roles)/chunks";
import { Routes } from "@/core/routing";
import { getServerSession } from "@/hooks/getServerSession";
import LoginAuthPage from "@/view/auth/login-auth-page";

const LoginAuth = async () => {
	const { isAuthenticated, session, user } = await getServerSession();

	if (!isAuthenticated) redirect(Routes.auth["sign-in"]);
	if (session?.loginVerified) redirect(Routes.root);

	return (
		<>
			<TokenDisplay token={user?.twoFactor?.token} />
			<LoginAuthPage />
		</>
	);
};

export default LoginAuth;
