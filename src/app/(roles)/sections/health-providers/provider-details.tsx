import { UserRound } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader
} from "@/components/ui/dialog";
import { Provider } from "@/types/types";

interface ProviderDetailsProps {
	provider: Provider;
	onClose: () => void;
}

const ProviderDetails: React.FC<ProviderDetailsProps> = ({
	onClose,
	provider
}) => {
	const handleSuspend = () => {
		onClose();
		console.log("User is Suspended");
	};
	const handleDelete = () => {
		onClose();
	};
	return (
		<Dialog>
			<DialogContent>
				<DialogHeader>
					<Avatar>
						<AvatarImage src={provider.avatar} />
						<AvatarFallback>
							<UserRound className="w-12 h-12" />
						</AvatarFallback>
					</Avatar>
					<h3>{provider.name}</h3>
					<p>{provider.role}</p>
				</DialogHeader>
				<div>
					<p>Gender: {provider.gender}</p>
					<p>DOB: {provider.dob}</p>
					<p>Speciality: {provider.speciality}</p>
					<p>License Number: {provider.licenseNumber}</p>
				</div>
			</DialogContent>
			<DialogFooter>
				<Button variant="destructive" onClick={handleSuspend}>
					Suspend
				</Button>
				<Button variant="destructive" onClick={handleDelete}>
					Delete
				</Button>
			</DialogFooter>
		</Dialog>
	);
};

export default ProviderDetails;
