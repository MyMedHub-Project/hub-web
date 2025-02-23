import { OnboardingProvider } from "./onboarding-context";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => (
	<OnboardingProvider>{children}</OnboardingProvider>
);

export default OnboardingLayout;
