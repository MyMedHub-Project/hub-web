"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/input";
import { cn } from "@/lib/utils";

interface CodeInputProps {
	className?: string;
	onComplete: (code: string) => void;
	initialValue?: string;
	length?: number;
	isError?: boolean;
	disabled?: boolean;
	autoSubmit?: boolean;
	autoFocus?: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({
	autoFocus = true,
	autoSubmit = true,
	className,
	disabled = false,
	initialValue = "",
	isError = false,
	length = 6,
	onComplete
}) => {
	const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
	const completedRef = useRef(false);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const prevErrorStateRef = useRef(isError);
	const hasNewInputAfterErrorRef = useRef(false);
	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

	// Create a stable ref callback for each input
	const setInputRef = useCallback(
		(index: number) => (el: HTMLInputElement | null) => {
			inputRefs.current[index] = el;
		},
		[]
	);

	// Reset completion status when error state changes
	useEffect(() => {
		if (isError && !prevErrorStateRef.current) {
			// New error occurred
			completedRef.current = false;
			hasNewInputAfterErrorRef.current = false;
		}
		prevErrorStateRef.current = isError;
	}, [isError]);

	// Handle auto-focus on first mount
	useEffect(() => {
		if (autoFocus && !disabled && inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, [autoFocus, disabled]);

	// Handle initial value if provided
	useEffect(() => {
		if (!initialValue) return;

		const initialDigits = initialValue
			.slice(0, length)
			.split("")
			.map((d) => d.toUpperCase());

		// Pad with empty strings if needed
		const paddedDigits = [
			...initialDigits,
			...Array(length).fill("")
		].slice(0, length);

		setDigits(paddedDigits);

		// Auto-submit if all digits are filled
		if (
			initialDigits.length === length &&
			autoSubmit &&
			!completedRef.current
		) {
			completedRef.current = true;

			// Clear any existing debounce timer
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
				debounceTimerRef.current = null;
			}

			onComplete(initialValue);
			debounceTimerRef.current = null;
		}
	}, [initialValue, length, onComplete, autoSubmit]);

	// Cleanup effect for debounce timer
	useEffect(
		() => () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
				debounceTimerRef.current = null;
			}
		},
		[]
	);

	// Check if code is complete and call onComplete if needed
	const checkCompletion = (newDigits: string[]) => {
		// If already completed or in error state without new input, don't process
		if (completedRef.current) return;
		if (isError && !hasNewInputAfterErrorRef.current) return;

		const code = newDigits.join("");
		if (code.length === length) {
			completedRef.current = true;

			// Clear any existing debounce timer
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}

			// Set a new debounce timer
			if (autoSubmit) {
				debounceTimerRef.current = setTimeout(() => {
					onComplete(code);
					debounceTimerRef.current = null;
				}, 300); // Slightly longer timeout for user input
			}
		}
	};

	// Handle individual digit input
	const handleDigitChange = (index: number, value: string) => {
		if (disabled) return;

		// Mark that we've had new input after an error
		if (isError) {
			hasNewInputAfterErrorRef.current = true;
		}

		// Skip invalid inputs or multi-character pastes
		if (!/^[a-zA-Z0-9]*$/.test(value)) return;

		// Handle paste of full code
		if (value.length > 1) {
			const pastedChars = value.slice(0, length).split("");
			const newDigits = [...pastedChars, ...Array(length).fill("")]
				.slice(0, length)
				.map((d) => d.toUpperCase());

			setDigits(newDigits);
			checkCompletion(newDigits);
			return;
		}

		const formattedValue = value.toUpperCase();
		const newDigits = [...digits];
		newDigits[index] = formattedValue;
		setDigits(newDigits);

		// Auto-focus next input field
		if (formattedValue && index < length - 1) {
			inputRefs.current[index + 1]?.focus();
		}

		checkCompletion(newDigits);
	};

	// Handle backspace navigation
	const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
		if (disabled) return;

		// Mark that we've had new input after an error
		if (isError) {
			hasNewInputAfterErrorRef.current = true;
		}

		if (event.key === "Backspace") {
			if (digits[index] === "" && index > 0) {
				inputRefs.current[index - 1]?.focus();
			}
		}
	};

	return (
		<div className="w-full max-w-[350px] flex self-center">
			<div className="w-full flex justify-between">
				{digits.map((digit, index) => (
					<Input
						key={index}
						ref={setInputRef(index)}
						className={cn(
							"size-12 text-center text-2xl bg-[#D4DFD5]/10",
							className,
							isError ? "border-hub-red/50" : "border-inherit"
						)}
						maxLength={1}
						value={digit}
						onChange={(e) =>
							handleDigitChange(index, e.target.value)
						}
						onKeyDown={(e) => handleKeyDown(index, e)}
						disabled={disabled}
					/>
				))}
			</div>
		</div>
	);
};

export default CodeInput;
