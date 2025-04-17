"use client";

import { useRef, useCallback } from "react";

/**
 * Custom hook that wraps async functions to prevent duplicate calls
 * Particularly useful in React Strict Mode or when a component renders multiple times
 */
export function useAsyncSafeguard() {
	// Object to track multiple in-progress operations by key
	const inProgressOpsRef = useRef<Record<string, boolean>>({});

	/**
	 * Wraps an async function to prevent duplicate calls
	 *
	 * @param asyncFn The async function to safeguard
	 * @param key Optional unique identifier for the operation (defaults to function name)
	 * @returns A wrapped function that won't execute if already in progress
	 */
	const safeguard = useCallback(
		<T extends any[], R>(
			asyncFn: (...args: T) => Promise<R>,
			key?: string
		) =>
			async (...args: T): Promise<R | undefined> => {
				// Use function name or provided key as identifier
				const opKey = key || asyncFn.name || "unknown";

				// If this operation is already in progress, return early
				if (inProgressOpsRef.current[opKey]) {
					return undefined;
				}

				// Mark operation as in progress
				inProgressOpsRef.current[opKey] = true;

				try {
					// Execute the original function
					return await asyncFn(...args);
				} finally {
					// Always clean up, even if there's an error
					inProgressOpsRef.current[opKey] = false;
				}
			},
		[]
	);

	return {
		safeguard
	};
}
