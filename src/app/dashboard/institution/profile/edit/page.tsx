"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from "@/components/form";
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger
// } from "@/components/ui/dialog";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarIcon } from "@radix-ui/react-icons";
import { SelectContent, SelectItem } from "@radix-ui/react-select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Edit = () => {
	const formSchema = z.object({
		firstName: z
			.string()
			.trim()
			.max(80)
			.regex(/^(?=\S{2,})(?!\d)\S+ \S{2,}(?!\d)$/),
		lastName: z
			.string()
			.trim()
			.max(80)
			.regex(/^(?=\S{2,})(?!\d)\S+ \S{2,}(?!\d)$/),
		otherName: z
			.string()
			.trim()
			.max(80)
			.regex(/^(?=\S{2,})(?!\d)\S+ \S{2,}(?!\d)$/),
		email: z.string().trim().email().toLowerCase(),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters." })
			.regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
				message:
					"Password must include at least one number, one lowercase and one uppercase letter."
			}),
		dob: z.date({
			required_error: "A date of birth is required"
		})
	});

	type FormValues = z.infer<typeof formSchema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
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
						name="phone-number"
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

			{/* <Dialog>
				<DialogTrigger> */}
			<Button className="bg-transparent text-hubRed hover:bg-transparent mx-auto block">
				Delete Account
			</Button>
			{/* </DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete your account? This
							action cannot be undone and all your data will be
							permanently removed.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button className="bg-hubGrey text-hubBlack">Cancel</Button>
						<Button className="bg-hubRed text-hubGrey">Delete</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog> */}
		</div>
	);
};

export default Edit;
