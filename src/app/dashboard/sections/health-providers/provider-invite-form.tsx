import { Form, FormField, FormMessage } from "@/components/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import React from "react";

const InviteProviderForm = () => {
	const handleSubmit = (data) => {
		// toast.success("Invitation sent successfully");
	};
	return (
		<div>
			<h2>Invite a HealthCare Provider</h2>
			<Form onSubmit={handleSubmit}>
				<FormField name="email" label="Email" />
				<FormField name="role" label="Role" />
				<FormField name="speciality" label="Speciality" />
				<FormField name="licenseNumber" label="License Number" />
				<FormMessage />
				<Button type="submit">Send Invite</Button>
			</Form>
		</div>
	);
};

export default InviteProviderForm;
