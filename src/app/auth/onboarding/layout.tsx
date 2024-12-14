import { OnboardingProvider } from "./onboarding-context";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
	return <OnboardingProvider>{children}</OnboardingProvider>;
};

export default OnboardingLayout;
