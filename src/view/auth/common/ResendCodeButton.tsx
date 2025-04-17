"use client";

import { memo, useEffect, useState } from "react";
import { Button } from "@/components/button";

interface ResendCodeProps {
	handleCodeResend: () => void;
	disabled: boolean;
}

const ResendCodeButton = ({ disabled, handleCodeResend }: ResendCodeProps) => {
	const [secs, setSecs] = useState(60);
	const [resendDisabled, setResendDisabled] = useState(true);

	useEffect(() => {
		if (disabled) {
			setSecs(0);
			setResendDisabled(true);
			return;
		}

		if (secs <= 0) {
			setResendDisabled(false);
			return;
		}

		setResendDisabled(true);
		const interval = setInterval(() => {
			setSecs((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [secs, disabled]);

	return (
		<Button
			onClick={() => {
				setSecs(60);
				handleCodeResend();
			}}
			disabled={resendDisabled}
			variant="link"
			className="text-sm p-0 h-fit flex items-start justify-start font-normal"
		>
			Resend Code
			{secs === 60 ? ": 1:00" : !resendDisabled ? "" : `: ${secs}`}
		</Button>
	);
};

export default memo(ResendCodeButton);
