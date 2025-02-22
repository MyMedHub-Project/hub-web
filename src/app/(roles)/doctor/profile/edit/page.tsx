"use client";

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
		// Personal Information
		firstName: z
			.string()
			.trim()
			.min(2, "First name must be at least 2 characters")
			.max(80, "First name must be less than 80 characters"),

		lastName: z
			.string()
			.trim()
			.min(2, "Last name must be at least 2 characters")
			.max(80, "Last name must be less than 80 characters"),

		otherName: z
			.string()
			.trim()
			.max(80, "Other name must be less than 80 characters")
			.optional(),

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

		// Personal Details
		gender: z.enum(["Male", "Female"], {
			required_error: "Please select a gender"
		}),

		dob: z
			.date({
				required_error: "Date of birth is required"
			})
			.refine((date) => {
				const age = new Date().getFullYear() - date.getFullYear();
				return age >= 18 && age <= 100;
			}, "You must be at least 18 years old"),

		bio: z
			.string()
			.trim()
			.max(500, "Bio must be less than 500 characters")
			.optional(),

		// Professional Information
		speciality: z
			.string()
			.trim()
			.min(2, "Speciality must be at least 2 characters"),

		services: z
			.string()
			.trim()
			.min(2, "Service must be at least 2 characters"),

		experience: z
			.string()
			.trim()
			.regex(/^\d+$/, "Years of experience must be a number")
			.transform(Number)
			.refine((years) => years >= 0 && years <= 70, {
				message: "Years of experience must be between 0 and 70"
			})
	});

	type FormValues = z.infer<typeof formSchema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			otherName: "",
			email: "",
			phoneNumber: "",
			street: "",
			city: "",
			state: "",
			country: "",
			bio: "",
			speciality: "",
			services: "",
			experience: 1
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
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Firstname</FormLabel>
								<FormControl>
									<Input placeholder="Dolor" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Manchi" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="otherName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Other Name</FormLabel>
								<FormControl>
									<Input placeholder="" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="dolormanchi@gmail.com"
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
						name="gender"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Gender</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.name}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Male" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="Male">
											Male
										</SelectItem>
										<SelectItem value="Female">
											Female
										</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="dob"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Date of birth</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-full pl-3 text-left font-normal",
													!field.value &&
														"text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() ||
												date < new Date("1900-01-01")
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
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
						name="speciality"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Speciality</FormLabel>
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
										<SelectItem value="Cardiology">
											Cardiology
										</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="services"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Other Services you offer</FormLabel>
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
										<SelectItem value="General Consultation">
											General Consultation
										</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="experience"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Year(s) in Practice</FormLabel>
								<FormControl>
									<Input placeholder="6" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>

			<Dialog>
				<DialogTrigger asChild className=" mx-auto block">
					<Button className="bg-transparent text-hubRed hover:bg-transparent">
						Delete Account
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader className="text-center text-hubBlack">
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
						<Button className="bg-hubGrey hover:bg-hubGrey text-hubBlack w-1/2 h-10 py-4">
							Cancel
						</Button>
						<Button className="bg-hubRed hover:bg-hubRed text-hubGrey w-1/2 h-10 py-4">
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Edit;
