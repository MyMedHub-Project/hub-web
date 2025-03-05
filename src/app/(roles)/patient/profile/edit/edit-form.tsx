"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarIcon } from "@radix-ui/react-icons";
import { SelectContent, SelectItem } from "@radix-ui/react-select";
import { format } from "date-fns";
import { CalendarIcon, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/form";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
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
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from "@/components/ui/card";
import RegionSelect from "@/components/ui/region-select";
import CountrySelect from "@/components/ui/country-select";
import { PhoneInput } from "@/components/ui/phone-input";

const formSchema = z.object({
	firstName: z
		.string()
		.trim()
		.max(80)
		.regex(/^[A-Za-z]{2,}$/),
	lastName: z
		.string()
		.trim()
		.max(80)
		.regex(/^[A-Za-z]{2,}$/),
	email: z.string().trim().email().toLowerCase(),
	tel: z.string(),
	street: z.string(),
	city: z.string(),
	state: z.string(),
	country: z.string(),
	gender: z.string(),
	bio: z.string(),
	dob: z.date({
		required_error: "A date of birth is required",
		invalid_type_error: "Select a valid date of birth"
	}),
	maritalStatus: z.string()
});

type FormValues = z.infer<typeof formSchema>;

const EditForm = ({ profile }: { profile: any }) => {
	// const route = useRouter();
	const [countryCode, setCountryCode] = useState("");

	const {
		address: { city, country, state, street },
		dob,
		email,
		// emailVerified,
		// emergencyContact,
		firstname,
		gender,
		// id,
		// language,
		// lastLogin,
		lastname,
		maritalStatus,
		// notificationMode,
		// passwordRecoveryMode,
		phone,
		// phoneVerified,
		profileImage
		// pushNotificationEnabled,
		// timezone,
		// type
	} = profile;

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: firstname,
			lastName: lastname,
			email,
			tel: phone,
			street,
			city,
			state,
			country,
			gender,
			bio: "",
			dob,
			maritalStatus
		}
	});

	const handleAvatarChange = () => {
		console.log("Avatar Change");
	};

	const onSubmit = (values: FormValues) => {
		console.log(values);
	};

	return (
		<Card className="w-[90%] mx-auto space-y-14 bg-transparent border-none shadow-none">
			<CardHeader className="relative rounded-full border-4 size-[150px] p-0 border-gray-300">
				{profileImage && profileImage !== "" ? (
					<Image
						src={profileImage}
						alt="profile"
						className="size-full"
					/>
				) : (
					<AvatarIcon className="size-full" />
				)}
				<div
					className="absolute bottom-1.5 right-1 bg-hubGreen rounded-full size-7 flex items-center justify-center cursor-pointer"
					onClick={handleAvatarChange}
				>
					<Pencil className="size-4 text-white" />
				</div>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="">
						<div className="grid grid-cols-2 gap-5">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Firstname</FormLabel>
										<FormControl>
											<Input
												placeholder="Dolor"
												{...field}
												className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
											/>
										</FormControl>
										<FormMessage />
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
											<Input
												placeholder="Manchi"
												{...field}
												className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
											/>
										</FormControl>
										<FormMessage />
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
												className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="tel"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<PhoneInput
												defaultCountry="NG"
												value={field.value}
												placeholder="Phone number"
												// {...field}
												className="bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
											/>
										</FormControl>
										<FormMessage />
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
												className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
											/>
										</FormControl>
										<FormMessage />
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
											<Input
												placeholder="Lokoja"
												{...field}
												className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="state"
								render={({ field }) => (
									<FormItem>
										<FormLabel>State</FormLabel>
										<RegionSelect
											countryCode={countryCode}
											onChange={field.onChange}
											placeholder="Choose your state"
											className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Country</FormLabel>
										<CountrySelect
											onChange={(value) => {
												setCountryCode(
													JSON.parse(value)
														.countryShortCode
												);

												field.onChange(value);
											}}
											placeholder="Choose your country"
											className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
										/>
										<FormMessage />
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
											value={field.value}
										>
											<SelectTrigger className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg">
												<SelectValue placeholder="Select gender" />
											</SelectTrigger>
											<SelectContent className="bg-red-300 top-0 size-[400px]">
												<SelectItem value="Male">
													Male
												</SelectItem>
												<SelectItem value="Female">
													Female
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
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
												{...field}
												className="resize-none px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
											/>
										</FormControl>
										<FormMessage />
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
											<PopoverTrigger
												asChild
												className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
											>
												<FormControl>
													<Button
														variant="outline"
														className={cn(
															"w-full pl-3 text-left font-normal",
															!field.value &&
																"text-muted-foreground"
														)}
													>
														{field.value ? (
															format(
																field.value,
																"dd/MM/yyy"
															)
														) : (
															<span>
																Pick a date
															</span>
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
														date <
															new Date(
																"1900-01-01"
															)
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="maritalStatus"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Marital Staus</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.name}
										>
											<FormControl>
												<SelectTrigger className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg">
													<SelectValue placeholder="" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Single">
													Single
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>
			</CardContent>

			<CardFooter className="grid grid-cols-2 gap-x-5 !mt-2">
				<Button
					type="submit"
					className="bg-hubGreen hover:bg-hubGreen/95"
				>
					Save
				</Button>

				<Dialog>
					<DialogTrigger asChild className=" mx-auto block">
						<Button className="bg-transparent text-hubRed w-full shadow-none hover:shadow-sm hover:bg-transparent">
							Delete Account
						</Button>
					</DialogTrigger>
					<DialogOverlay className="bg-hubGrey200/80">
						<DialogContent className="bg-white max-w-[500px] px-5 py-10">
							<DialogHeader className="text-center text-hubBlack">
								<DialogTitle className="text-center text-xl mb-4">
									Delete Account
								</DialogTitle>
								<DialogDescription className="text-center text-lg">
									Are you sure you want to delete your
									account? This action cannot be undone and
									all your data will be permanently removed.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter className="gap-x-3 mt-2">
								<DialogClose asChild>
									<Button className="bg-hubGrey hover:bg-hubGrey text-hubBlack w-1/2 h-10 py-4">
										Cancel
									</Button>
								</DialogClose>
								<Button className="bg-hubRed hover:bg-hubRed text-hubGrey w-1/2 h-10 py-4">
									Delete
								</Button>
							</DialogFooter>
						</DialogContent>
					</DialogOverlay>
				</Dialog>
			</CardFooter>
		</Card>
	);
};

export default EditForm;
