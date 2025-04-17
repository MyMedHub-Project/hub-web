import { SignInProvider } from "@/app/auth/sign-in/context";

interface SignInLayoutProps {
	children: React.ReactNode;
}

export default function SignInLayout({ children }: SignInLayoutProps) {
	return <SignInProvider>{children}</SignInProvider>;
}
