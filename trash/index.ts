// ###################################################### env.mjs file ##########################################################
// import { cleanEnv, str, url } from 'envalid';

// const envVars = {
//   // Development variables
//   NEXT_PUBLIC_BASE_URL_DEV: process.env.NEXT_PUBLIC_BASE_URL_DEV,
//   NEXT_PUBLIC_APP_URL_DEV: process.env.NEXT_PUBLIC_APP_URL_DEV,
//   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEV: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEV,
//   STRIPE_SECRET_KEY_DEV: process.env.STRIPE_SECRET_KEY_DEV,

//   // Production variables
//   NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
//   NEXT_PUBLIC_X_DIALME_KEY: process.env.NEXT_PUBLIC_X_DIALME_KEY,
//   NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
//   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
//   STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

//   // Environment
//   NODE_ENV: process.env.NODE_ENV,
// };

// export const env = cleanEnv(envVars, {
//   // Development variables
//   NEXT_PUBLIC_BASE_URL_DEV: url(),
//   NEXT_PUBLIC_APP_URL_DEV: url(),
//   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEV: str({ startsWith: 'pk_test_' }),
//   STRIPE_SECRET_KEY_DEV: str({ startsWith: 'sk_test_' }),

//   // Production variables
//   NEXT_PUBLIC_BASE_URL: url(),
//   NEXT_PUBLIC_X_DIALME_KEY: str(),
//   NEXT_PUBLIC_APP_URL: url(),
//   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: str({ startsWith: 'pk_' }),
//   STRIPE_SECRET_KEY: str({ startsWith: 'sk_' }),

//   // Environment
//   NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
// });

// export const isDev = env.NODE_ENV === 'development';
// export const isProd = env.NODE_ENV === 'production';

// // Helper function to get the appropriate variable based on the environment
// export const getEnvVar = (devVar, prodVar) => isDev ? devVar : prodVar;

// // Expose environment-specific variables
// export const BASE_URL = getEnvVar(env.NEXT_PUBLIC_BASE_URL_DEV, env.NEXT_PUBLIC_BASE_URL);
// export const APP_URL = getEnvVar(env.NEXT_PUBLIC_APP_URL_DEV, env.NEXT_PUBLIC_APP_URL);
// export const STRIPE_PUBLISHABLE_KEY = getEnvVar(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEV, env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
// export const STRIPE_SECRET_KEY = getEnvVar(env.STRIPE_SECRET_KEY_DEV, env.STRIPE_SECRET_KEY);

//########################################################### App Config File #####################################################
// import type { IAppConfig } from '@/interfaces/config';
// import { env, BASE_URL, APP_URL, STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, isDev } from './env.mjs';
// import merge from 'deepmerge';

// const appConfig: IAppConfig = {
//   env: Object.defineProperties(
//     merge(env, {
//       // Custom environment properties
//       IS_DEV: isDev,
//       BASE_URL,
//       APP_URL,
//     }),
//     Object.getOwnPropertyDescriptors(env)
//   ),
//   api: {
//     baseUrl: BASE_URL,
//     headers: {
//       'X-Dialme-Key': env.NEXT_PUBLIC_X_DIALME_KEY,
//     },
//   },
//   app: {
//     url: APP_URL,
//   },
//   stripe: {
//     publishableKey: STRIPE_PUBLISHABLE_KEY,
//     secretKey: STRIPE_SECRET_KEY,
//   },
// };

// export default appConfig;

//#################################### Config Interface ##################################################
// export interface IAppConfig {
//       env: {
//         IS_DEV: boolean;
//         BASE_URL: string;
//         APP_URL: string;
//         [key: string]: any;
//       };
//       api: {
//         baseUrl: string;
//         headers: {
//           'X-Dialme-Key': string;
//         };
//       };
//       app: {
//         url: string;
//       };
//       stripe: {
//         publishableKey: string;
//         secretKey: string;
//       };
//     }

// Mine

// "use client";

// import React, { useState, memo, useEffect } from "react";
// import { Input } from "@/components/input";
// import { cn } from "@/lib/utils";

// interface CodeInputProps {
// 	className?: string;
// 	verifyCode: (code: string) => void;
// 	defaultCode?: string;
// 	enableFailState?: boolean;
// }

// const CodeInput: React.FC<CodeInputProps> = ({
// 	className,
// 	defaultCode,
// 	enableFailState = false,
// 	verifyCode
// }) => {
// 	const [code, setCode] = useState(Array(6).fill(""));

// 	const handleChange = (index: number, value: string) => {
// 		if (value.length > 1 || !/^[a-zA-Z0-9]$/.test(value)) {
// 			const newCode = [...code];
// 			newCode[index] = "";
// 			setCode(newCode);
// 			return;
// 		}

// 		const formattedValue = value.toUpperCase();

// 		const newCode = [...code];
// 		newCode[index] = formattedValue;
// 		setCode(newCode);

// 		if (formattedValue && index < code.length - 1) {
// 			document.getElementById(`code-${index + 1}`)?.focus();
// 		}

// 		if (index === code.length - 1 && formattedValue) {
// 			verifyCode(newCode.join(""));
// 		}
// 	};

// 	const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
// 		if (event.key === "Backspace" && code[index] === "") {
// 			if (index > 0) {
// 				document.getElementById(`code-${index - 1}`)?.focus();
// 			}
// 		}
// 	};

// 	useEffect(() => {
// 		setTimeout(() => {
// 			if (defaultCode) {
// 				const defaultCodeArray = defaultCode.toUpperCase().split("");
// 				setCode(defaultCodeArray);
// 				verifyCode(defaultCode);
// 			}
// 		}, 5000);
// 	}, [defaultCode, verifyCode]);

// 	return (
// 		<form className="w-full flex justify-between">
// 			{code.map((digit, index) => (
// 				<Input
// 					key={index}
// 					id={`code-${index}`}
// 					className={cn(
// 						"size-12 text-center text-2xl bg-[#D4DFD5]/10",
// 						className,
// 						enableFailState ? "border-hubRed/50" : "border-inherit"
// 					)}
// 					maxLength={1}
// 					value={digit}
// 					onChange={(e) => handleChange(index, e.target.value)}
// 					onKeyDown={(e) => handleKeyDown(index, e)}
// 				/>
// 			))}
// 		</form>
// 	);
// };

// export default memo(CodeInput);

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/components/input";
// import { cn } from "@/lib/utils";

// interface CodeInputProps {
// 	className?: string;
// 	onComplete: (code: string) => void;
// 	devToken?: string; // Renamed from defaultCode to be more descriptive
// 	isError?: boolean; // Renamed from enableFailState to be more intuitive
// 	tokenVerified?: boolean; // To track verification state
// }

// const CodeInput: React.FC<CodeInputProps> = ({
// 	className,
// 	devToken,
// 	isError = false,
// 	onComplete,
// 	tokenVerified = false
// }) => {
// 	const [codeDigits, setCodeDigits] = useState<string[]>(Array(6).fill(""));
// 	const hasSubmittedRef = useRef(false);

// 	// Handle individual digit input
// 	const handleDigitChange = (index: number, value: string) => {
// 		// Skip invalid inputs
// 		if (value.length > 1 || !/^[a-zA-Z0-9]$/.test(value)) {
// 			return;
// 		}

// 		const formattedValue = value.toUpperCase();
// 		const newCodeDigits = [...codeDigits];
// 		newCodeDigits[index] = formattedValue;
// 		setCodeDigits(newCodeDigits);

// 		// Auto-focus next input field
// 		if (formattedValue && index < codeDigits.length - 1) {
// 			document.getElementById(`code-${index + 1}`)?.focus();
// 		}

// 		// Submit code when all digits are filled
// 		const completeCode = newCodeDigits.join("");
// 		if (
// 			completeCode.length === 6 &&
// 			!hasSubmittedRef.current &&
// 			!tokenVerified
// 		) {
// 			hasSubmittedRef.current = true;
// 			onComplete(completeCode);
// 		}
// 	};

// 	// Handle backspace navigation
// 	const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
// 		if (event.key === "Backspace" && codeDigits[index] === "") {
// 			if (index > 0) {
// 				document.getElementById(`code-${index - 1}`)?.focus();
// 			}
// 		}
// 	};

// 	// Handle form submission
// 	const handleFormSubmit = (e: React.FormEvent) => {
// 		e.preventDefault(); // Prevent page refresh on submit
// 	};

// 	// Handle auto-fill from devToken
// 	useEffect(() => {
// 		if (devToken && !hasSubmittedRef.current && !tokenVerified) {
// 			const tokenDigits = devToken.toUpperCase().split("").slice(0, 6);
// 			setCodeDigits(
// 				tokenDigits.concat(Array(6 - tokenDigits.length).fill(""))
// 			);

// 			// Submit after a delay to allow UI to update
// 			const timer = setTimeout(() => {
// 				hasSubmittedRef.current = true;
// 				onComplete(devToken);
// 			}, 1000);

// 			return () => clearTimeout(timer);
// 		}
// 	}, [devToken, onComplete, tokenVerified]);

// 	// Reset submission flag when verification fails
// 	useEffect(() => {
// 		if (isError) {
// 			hasSubmittedRef.current = false;
// 		}
// 	}, [isError]);

// 	return (
// 		<form
// 			className="w-full flex justify-between"
// 			onSubmit={handleFormSubmit}
// 		>
// 			{codeDigits.map((digit, index) => (
// 				<Input
// 					key={index}
// 					id={`code-${index}`}
// 					className={cn(
// 						"size-12 text-center text-2xl bg-[#D4DFD5]/10",
// 						className,
// 						isError ? "border-hubRed/50" : "border-inherit",
// 						tokenVerified ? "border-hubGreen/50" : ""
// 					)}
// 					maxLength={1}
// 					value={digit}
// 					onChange={(e) => handleDigitChange(index, e.target.value)}
// 					onKeyDown={(e) => handleKeyDown(index, e)}
// 					disabled={tokenVerified}
// 				/>
// 			))}
// 		</form>
// 	);
// };

// export default CodeInput;

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/components/input";
// import { cn } from "@/lib/utils";

// interface CodeInputProps {
// 	className?: string;
// 	onComplete: (code: string) => void;
// 	initialValue?: string;
// 	length?: number;
// 	isError?: boolean;
// 	disabled?: boolean;
// 	autoSubmit?: boolean;
// 	autoFocus?: boolean;
// }

// const CodeInput: React.FC<CodeInputProps> = ({
// 	autoFocus = true,
// 	autoSubmit = true,
// 	className,
// 	disabled = false,
// 	initialValue = "",
// 	isError = false,
// 	length = 6,
// 	onComplete
// }) => {
// 	const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
// 	const completedRef = useRef(false);
// 	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

// 	// Reset completion status when error state changes
// 	useEffect(() => {
// 		if (isError) completedRef.current = false;
// 	}, [isError]);

// 	// Handle auto-focus on first mount
// 	useEffect(() => {
// 		if (autoFocus && !disabled && inputRefs.current[0]) {
// 			inputRefs.current[0].focus();
// 		}
// 	}, [autoFocus, disabled]);

// 	// Handle initial value if provided
// 	useEffect(() => {
// 		if (initialValue) {
// 			const initialDigits = initialValue
// 				.slice(0, length)
// 				.split("")
// 				.map((d) => d.toUpperCase());

// 			// Pad with empty strings if needed
// 			const paddedDigits = [
// 				...initialDigits,
// 				...Array(length).fill("")
// 			].slice(0, length);

// 			setDigits(paddedDigits);

// 			// Auto-submit if all digits are filled
// 			if (
// 				initialDigits.length === length &&
// 				autoSubmit &&
// 				!completedRef.current
// 			) {
// 				completedRef.current = true;
// 				setTimeout(() => onComplete(initialValue), 200);
// 			}
// 		}
// 	}, [initialValue, length, onComplete, autoSubmit]);

// 	// Check if code is complete and call onComplete if needed
// 	const checkCompletion = (newDigits: string[]) => {
// 		if (completedRef.current) return;

// 		const code = newDigits.join("");
// 		if (code.length === length) {
// 			completedRef.current = true;
// 			if (autoSubmit) onComplete(code);
// 		}
// 	};

// 	// Handle individual digit input
// 	const handleDigitChange = (index: number, value: string) => {
// 		if (disabled) return;

// 		// Skip invalid inputs or multi-character pastes
// 		if (!/^[a-zA-Z0-9]*$/.test(value)) return;

// 		// Handle paste of full code
// 		if (value.length > 1) {
// 			const pastedChars = value.slice(0, length).split("");
// 			const newDigits = [...pastedChars, ...Array(length).fill("")]
// 				.slice(0, length)
// 				.map((d) => d.toUpperCase());

// 			setDigits(newDigits);
// 			checkCompletion(newDigits);
// 			return;
// 		}

// 		const formattedValue = value.toUpperCase();
// 		const newDigits = [...digits];
// 		newDigits[index] = formattedValue;
// 		setDigits(newDigits);

// 		// Auto-focus next input field
// 		if (formattedValue && index < length - 1) {
// 			inputRefs.current[index + 1]?.focus();
// 		}

// 		checkCompletion(newDigits);
// 	};

// 	// Handle backspace navigation
// 	const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
// 		if (disabled) return;

// 		if (event.key === "Backspace") {
// 			if (digits[index] === "" && index > 0) {
// 				inputRefs.current[index - 1]?.focus();
// 			}
// 		}
// 	};

// 	return (
// 		<div className="w-full flex justify-between">
// 			{digits.map((digit, index) => (
// 				<Input
// 					key={index}
// 					ref={(el) => (inputRefs.current[index] = el)}
// 					className={cn(
// 						"size-12 text-center text-2xl bg-[#D4DFD5]/10",
// 						className,
// 						isError ? "border-hubRed/50" : "border-inherit"
// 					)}
// 					maxLength={1}
// 					value={digit}
// 					onChange={(e) => handleDigitChange(index, e.target.value)}
// 					onKeyDown={(e) => handleKeyDown(index, e)}
// 					disabled={disabled}
// 				/>
// 			))}
// 		</div>
// 	);
// };

// export default CodeInput;
