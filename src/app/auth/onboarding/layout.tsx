import { OnboardingProvider } from "./context";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => (
	<OnboardingProvider>{children}</OnboardingProvider>
);

export default OnboardingLayout;
