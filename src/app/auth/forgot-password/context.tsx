"use client";

import { createContext, useState } from "react";

export type IForgotPasswordContext = {
	id: string;
	email: string;
	devToken: string;
	tokenVerified: boolean;
	passwordReset: boolean;
	setId: (id: string) => void;
	setEmail: (email: string) => void;
	setDevToken: (devToken: string) => void;
	setTokenVerified: (tokenVerified: boolean) => void;
	setPasswordReset: (passwordReset: boolean) => void;
};

export const ForgotPasswordContext = createContext<IForgotPasswordContext>({
	id: "",
	email: "",
	devToken: "",
	tokenVerified: false,
	passwordReset: false,
	setId: () => {},
	setEmail: () => {},
	setDevToken: () => {},
	setTokenVerified: () => {},
	setPasswordReset: () => {}
});

export const ForgotPasswordProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const [id, setId] = useState("");
	const [email, setEmail] = useState("");
	const [devToken, setDevToken] = useState("");
	const [tokenVerified, setTokenVerified] = useState(false);
	const [passwordReset, setPasswordReset] = useState(false);

	return (
		<ForgotPasswordContext.Provider
			value={{
				id,
				setId,
				email,
				setEmail,
				devToken,
				setDevToken,
				tokenVerified,
				setTokenVerified,
				passwordReset,
				setPasswordReset
			}}
		>
			{children}
		</ForgotPasswordContext.Provider>
	);
};
