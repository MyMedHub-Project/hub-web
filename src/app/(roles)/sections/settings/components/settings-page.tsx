"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PasswordRecovery from "./password-recovery";
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
		<div className="text-hub-black pl-5">
			<Card className="bg-transparent shadow-none border-x-0 border-t-0 border-b-2 rounded-none pb-5">
				{settings.map((setting, index) => (
					<Button
						key={index}
						onClick={() => setSelected(index)}
						className={cn(
							"bg-transparent text-hub-black shadow-none mr-1",
							selected === index
								? "bg-hub-green text-white hover:bg-hub-green/80"
								: "hover:bg-hub-green/80"
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
