"use client";

import React, { useState } from "react";
import { Input } from "@/components/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Provider } from "@/types/types";
import ProviderCard from "./provider-card";

const providers: Provider[] = [
	{
		id: 1,
		name: "John Doe",
		role: "Physician",
		avatar: "",
		gender: "Male",
		dob: "1985-07-15",
		speciality: "Internal Medicine",
		licenseNumber: "ACD1234"
	}
];
const ProvidersList: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [
		activeProviders
		// setActiveProviders
	] = useState(providers.filter((p) => p.role !== "Invitee"));
	const [
		inviteeProviders
		// setInviteProviders
	] = useState(providers.filter((p) => p.role === "Invitee"));

	const filteredProviders = [...activeProviders, ...inviteeProviders].filter(
		(provider) =>
			provider.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<Tabs defaultValue="active">
					<TabsList>
						<TabsTrigger value="active">Active</TabsTrigger>
						<TabsTrigger value="invitee">Invitee</TabsTrigger>
					</TabsList>
				</Tabs>
				<Input
					placeholder="Search providers..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
			<div>
				{filteredProviders.map((provider) => (
					<ProviderCard key={provider.id} provider={provider} />
				))}
			</div>
		</div>
	);
};

export default ProvidersList;
