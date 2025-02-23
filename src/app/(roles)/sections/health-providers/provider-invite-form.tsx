import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const InviteSchema = z.object({
	email: z.string().email(),
	role: z.string(),
	speciality: z.string(),
	licenseNumber: z.string()
});

const InviteProviderForm: React.FC = () => {
	const form = useForm<z.infer<typeof InviteSchema>>({
		resolver: zodResolver(InviteSchema),
		defaultValues: {
			email: "",
			role: "",
			speciality: "",
			licenseNumber: ""
		}
	});
	const onSubmit = form.handleSubmit((data: z.infer<typeof InviteSchema>) => {
		console.log("form submitted", data);
		// toast.success("Invitation sent successfully");
	});
	return (
		<div>
			<h2>Invite a HealthCare Provider</h2>
			<Form {...form}>
				<form onSubmit={onSubmit} className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Role</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="speciality"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Speciality</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="licenseNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>License Number</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Send Invite</Button>
				</form>
			</Form>
		</div>
	);
};

export default InviteProviderForm;
