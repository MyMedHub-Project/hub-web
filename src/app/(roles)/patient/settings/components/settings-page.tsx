"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import PasswordRecovery from "./password-recovery";
import { cn } from "@/lib/utils";
import Security from "./security";
import Notifications from "./notifications";

const SettingsPage = () => {
	const [selected, setSelected] = useState(2);

	const settings = [
		{ name: "Notifications", component: <Notifications /> },
		{ name: "Security", component: <Security /> },
		{ name: "Password Recovery", component: <PasswordRecovery /> },
		{ name: "Notifications", component: "" }
	];

	return (
		<div className="text-hubBlack pl-5">
			<Card className="bg-transparent shadow-none border-x-0 border-t-0 border-b-2 rounded-none pb-5">
				{settings.map((setting, index) => (
					<Button
						key={index}
						onClick={() => setSelected(index)}
						className={cn(
							"bg-transparent text-hubBlack shadow-none mr-1",
							selected === index
								? "bg-hubGreen text-white hover:bg-hubGreen/80"
								: "hover:bg-hubGreen/80"
						)}
					>
						{setting.name}
					</Button>
				))}
			</Card>

			<div className="max-w-[600px] mt-4">
				{settings[selected].component}
			</div>
		</div>
	);
};

export default SettingsPage;
