"use client";

import { createContext, useState } from "react";

export type ISignInContext = {
	twoFactorRequired: boolean;
	id: string;
	token: string;
	type: string;
	value: string;
	setTwoFactorRequired: (required: boolean) => void;
	setId: (id: string) => void;
	setToken: (token: string) => void;
	setType: (type: string) => void;
	setValue: (value: string) => void;
};

export const SignInContext = createContext<ISignInContext>({
	id: "",
	token: "",
	twoFactorRequired: false,
	type: "",
	value: "",
	setType: () => {},
	setValue: () => {},
	setTwoFactorRequired: () => {},
	setId: () => {},
	setToken: () => {}
});

export const SignInProvider = ({ children }: { children: React.ReactNode }) => {
	const [id, setId] = useState("");
	const [token, setToken] = useState("");
	const [twoFactorRequired, setTwoFactorRequired] = useState(false);
	const [type, setType] = useState("");
	const [value, setValue] = useState("");

	return (
		<SignInContext.Provider
			value={{
				id,
				setId,
				token,
				setToken,
				twoFactorRequired,
				setTwoFactorRequired,
				type,
				setType,
				value,
				setValue
			}}
		>
			{children}
		</SignInContext.Provider>
	);
};
