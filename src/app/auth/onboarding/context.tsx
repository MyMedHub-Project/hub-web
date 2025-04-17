"use client";

import { createContext, useEffect, useState } from "react";

export type VerificationRole = "patient" | "institution";

/**
 * @todo token to be removed from types for production
 */
export type VerificationDataTypes = {
	countryCode: string;
	email: string;
	phone: string;
	role: VerificationRole;
	onboardingToken?: string;
	emailToken?: string;
	phoneToken?: string;
	emailVerified?: boolean;
	phoneVerified?: boolean;
};

type OnboardingVariableTypes = {
	role: VerificationRole;
	setRole: React.Dispatch<React.SetStateAction<VerificationRole>>;
	termsAgreed: boolean;
	setTermsAgreed: React.Dispatch<boolean>;
	verificationData: VerificationDataTypes;
	setVerificationData: React.Dispatch<VerificationDataTypes>;
};

const OnboardingContext = createContext<OnboardingVariableTypes>(
	{} as OnboardingVariableTypes
);

export const OnboardingProvider = ({ children }: { children: any }) => {
	const [role, setRole] = useState<VerificationRole>("patient");
	const [termsAgreed, setTermsAgreed] = useState(false);
	const [verificationData, setVerificationDataState] = useState(
		{} as VerificationDataTypes
	);

	const setVerificationData = (data: VerificationDataTypes) => {
		localStorage.setItem("verification_data", JSON.stringify(data));
		setVerificationDataState(data); // Update the state
	};

	useEffect(() => {
		(() => {
			const storedData = window.localStorage.getItem("verification_data");
			setVerificationDataState(storedData ? JSON.parse(storedData) : {});
		})();
	}, []);

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
