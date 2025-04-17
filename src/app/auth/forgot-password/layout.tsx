import { ForgotPasswordProvider } from "@/app/auth/forgot-password/context";

interface ForgotPasswordLayoutProps {
	children: React.ReactNode;
}

export default function ForgotPasswordLayout({
	children
}: ForgotPasswordLayoutProps) {
	return <ForgotPasswordProvider>{children}</ForgotPasswordProvider>;
}
