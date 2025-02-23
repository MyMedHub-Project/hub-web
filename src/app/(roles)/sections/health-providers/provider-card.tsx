"use client";

import { UserRound } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import ProviderDetails from "./provider-details";

interface ProviderCardProps {
	provider: Provider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
	const [showDetails, setShowDetails] = useState(false);

	return (
		<>
			<Card onClick={() => setShowDetails(true)}>
				<CardHeader>
					<Avatar className="rounded-full">
						<AvatarImage className="rounded-full" />
						<AvatarFallback>
							<UserRound className="w-12 h-12" />
						</AvatarFallback>
					</Avatar>
				</CardHeader>
				<CardContent>
					<CardTitle>{provider.name}</CardTitle>
					<p>{provider.role}</p>
				</CardContent>
				<CardFooter>
					<Button variant="destructive">Suspend</Button>
					<Button variant="destructive">Delete</Button>
				</CardFooter>
			</Card>
			{showDetails ? (
				<ProviderDetails
					provider={provider}
					onClose={() => setShowDetails(false)}
				/>
			) : null}
		</>
	);
};

export default ProviderCard;
