"use client";

import { createContext, useState } from "react";

type VerificationCodeTypes = { countryCode: string; phone: string };

type OnboardingVariableTypes = {
	role: string;
	setRole: React.Dispatch<React.SetStateAction<string>>;
	termsAgreed: boolean;
	setTermsAgreed: React.Dispatch<boolean>;
	verificationData: VerificationCodeTypes;
	setVerificationData: React.Dispatch<VerificationCodeTypes>;
};

const OnboardingContext = createContext<OnboardingVariableTypes>(
	{} as OnboardingVariableTypes
);

export const OnboardingProvider = ({ children }: { children: any }) => {
	const [role, setRole] = useState("patient");
	const [termsAgreed, setTermsAgreed] = useState(false);
	const [verificationData, setVerificationData] = useState(
		{} as VerificationCodeTypes
	);

	return (
		<OnboardingContext.Provider
			value={{
				role,
				setRole,
				termsAgreed,
				setTermsAgreed,
				verificationData,
				setVerificationData
			}}
		>
			{children}
		</OnboardingContext.Provider>
	);
};

export default OnboardingContext;
