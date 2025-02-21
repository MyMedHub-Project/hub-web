"use client";

import { createContext, useEffect, useState } from "react";

/**
 * @todo token to be removed from types for production
 */
type VerificationDataTypes = {
	countryCode: string;
	email: string;
	phone: string;
	role: "patient" | "institution";
	onboardingToken?: string;
};

type OnboardingVariableTypes = {
	role: "patient" | "institution";
	setRole: React.Dispatch<React.SetStateAction<"patient" | "institution">>;
	termsAgreed: boolean;
	setTermsAgreed: React.Dispatch<boolean>;
	verificationData: VerificationDataTypes;
	setVerificationData: React.Dispatch<VerificationDataTypes>;
};

const OnboardingContext = createContext<OnboardingVariableTypes>(
	{} as OnboardingVariableTypes
);

export const OnboardingProvider = ({ children }: { children: any }) => {
	const [role, setRole] = useState<"patient" | "institution">("patient");
	const [termsAgreed, setTermsAgreed] = useState(false);
	const [verificationData, setVerificationDataState] = useState(
		{} as VerificationDataTypes
	);

	const setVerificationData = (data: VerificationDataTypes) => {
		localStorage.setItem("verification_data", JSON.stringify(data));
		setVerificationDataState(data); // Update the state
	};

	useEffect(() => {
		const getVerificationData = () => {
			const storedData = window.localStorage.getItem("verification_data");
			setVerificationDataState(storedData ? JSON.parse(storedData) : {});
		};

		getVerificationData();
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
