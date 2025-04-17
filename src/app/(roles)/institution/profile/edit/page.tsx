"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarIcon } from "@radix-ui/react-icons";
import { SelectContent, SelectItem } from "@radix-ui/react-select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from "@/components/form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Edit = () => {
	const formSchema = z.object({
		// Hospital Basic Information
		name: z
			.string()
			.trim()
			.min(3, "Hospital name must be at least 3 characters")
			.max(100, "Hospital name must be less than 100 characters"),

		email: z
			.string()
			.trim()
			.email("Please enter a valid email address")
			.toLowerCase(),

		phoneNumber: z
			.string()
			.trim()
			.regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),

		// Address Information
		street: z
			.string()
			.trim()
			.min(5, "Street address must be at least 5 characters")
			.max(100, "Street address must be less than 100 characters"),

		city: z
			.string()
			.trim()
			.min(2, "City must be at least 2 characters")
			.max(50, "City must be less than 50 characters"),

		state: z.string().trim().min(2, "State must be at least 2 characters"),

		country: z
			.string()
			.trim()
			.min(2, "Country must be at least 2 characters"),

		// Online Presence
		website: z
			.string()
			.trim()
			.url("Please enter a valid website URL")
			.optional()
			.transform((val) => val || undefined),

		// Hospital Details
		bio: z
			.string()
			.trim()
			.min(20, "Bio must be at least 20 characters")
			.max(1000, "Bio must be less than 1000 characters")
			.optional(),

		services: z
			.string()
			.trim()
			.min(2, "Service must be at least 2 characters")
	});

	type FormValues = z.infer<typeof formSchema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			phoneNumber: "",
			street: "",
			city: "",
			state: "",
			country: "",
			website: "",
			bio: "",
			services: ""
		}
	});

	return (
		<div className="w-[90%] mx-auto space-y-14">
			<div className="rounded-full border-4 w-fit border-gray-300">
				<AvatarIcon className="size-[150px]" />
			</div>

			<Form {...form}>
				<form className="grid grid-cols-2 gap-5">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Hospital name</FormLabel>
								<FormControl>
									<Input
										placeholder="ST. John Specialist Hospital"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Hospital Email Adress</FormLabel>
								<FormControl>
									<Input
										placeholder="example@gmail.com"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phoneNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<Input
										placeholder="+234 8123456789"
										type="number"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="street"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Street</FormLabel>
								<FormControl>
									<Input
										placeholder="No. 25, Sakura street"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem>
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input placeholder="Lokoja" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem>
								<FormLabel>State</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.name}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Kogi" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="Kogi">
											Kogi
										</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Country</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.name}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Nigeria" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="Nigeria">
											Nigeria
										</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="website"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Website</FormLabel>
								<FormControl>
									<Input
										placeholder="www.fmchospital.com"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="bio"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bio</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Tell us a little bit about yourself"
										// className="resize-none"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="services"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Services</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.name}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Cardiology" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="General Consultation...">
											General Consultation
										</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
				</form>
			</Form>

			<Dialog>
				<DialogTrigger asChild className=" mx-auto block">
					<Button className="bg-transparent text-hub-red hover:bg-transparent">
						Delete Account
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader className="text-center text-hub-black">
						<DialogTitle className="text-center text-xl mb-4">
							Delete Account
						</DialogTitle>
						<DialogDescription className="text-center text-lg">
							Are you sure you want to delete your account? This
							action cannot be undone and all your data will be
							permanently removed.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="gap-x-3 mt-2">
						<Button className="bg-hub-grey hover:bg-hub-grey text-hub-black w-1/2 h-10 py-4">
							Cancel
						</Button>
						<Button className="bg-hub-red hover:bg-hub-red text-hub-grey w-1/2 h-10 py-4">
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Edit;
