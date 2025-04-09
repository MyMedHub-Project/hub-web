import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ChevronDown, ChevronRight, User, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/form";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover";
import {
	DialogContent,
	DialogDescription,
	DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const patientDemo = [
	{
		name: "Samuel Anderson",
		address: "Lagos, Nigeria",
		avatar: null
	},
	{
		name: "John Doe",
		address: "Lagos, Nigeria",
		avatar: null
	},
	{
		name: "Jane Doe",
		address: "Lagos, Nigeria",
		avatar: null
	},
	{
		name: "Janet Doe",
		address: "Lagos, Nigeria",
		avatar: null
	},
	{
		name: "Palmer Doe",
		address: "Lagos, Nigeria",
		avatar: null
	},
	{
		name: "Jackson Anderson",
		address: "Lagos, Nigeria",
		avatar: null
	}
];

const conditionsDemo = [
	{ id: 1, name: "Tuberculosis" },
	{ id: 2, name: "Hypertension" },
	{ id: 3, name: "Diabetes" },
	{ id: 4, name: "Asthma" },
	{ id: 5, name: "Pneumonia" },
	{ id: 6, name: "Arthritis" },
	{ id: 7, name: "Epilepsy" },
	{ id: 8, name: "Anemia" },
	{ id: 9, name: "Hepatitis B" },
	{ id: 10, name: "Malaria" }
];

const prescriptionOptions = {
	medicine: ["Amoxicillin 500mg"],
	dosage: [
		"Tablet",
		"Millilitre (ml)",
		"Apply a thin layer",
		"Apply a thick layer"
	],
	frequency: [
		"Once a day",
		"Two Times Daily",
		"Three times Daily",
		"Every 4 Hours",
		"Every 6 Hours",
		"Every 8 Hours",
		"Other (Custom Input)"
	],
	duration: ["Hour(s)", "Day(s)", "Week(s)", "Month(s)"]
};

const formSchema = z.object({
	patient: z.string().min(1),
	condition: z.string().min(1),
	medicine: z.string().min(1),
	dosage: z.string().min(1),
	dosageType: z.string().min(1),
	frequency: z.string().min(1),
	duration: z.string().min(1),
	durationType: z.string().min(1)
});

type FormValues = z.infer<typeof formSchema>;

const PrescriptionSelectitems = ({
	type
}: {
	type: "medicine" | "dosage" | "frequency" | "duration";
}) =>
	prescriptionOptions[type].map((option, i) => (
		<SelectItem key={i} value={option}>
			{option}
		</SelectItem>
	));

const AddPlanDialog = () => {
	const [
		patients
		// setPatients
	] = useState<
		{
			name: string;
			address: string;
			avatar: string | null;
		}[]
	>(patientDemo);
	const [
		conditions
		// setConditions
	] = useState<{ id: number; name: string }[]>(conditionsDemo);
	const [selectedCondition, setSelectedCondition] = useState<string | null>(
		null
	);
	const [open, setOpen] = useState({ patient: false, condition: false });

	const togglePopover = (name: string, value: boolean) => {
		setOpen((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			patient: "",
			condition: "",
			medicine: "",
			dosage: "",
			dosageType: "",
			frequency: "",
			duration: "",
			durationType: ""
		}
	});

	const onSubmit = async (values: FormValues) => {
		console.log(values);
	};

	return (
		<DialogContent className="max-w-[800px] bg-white text-hubBlack">
			<DialogTitle>Add a Treatment Plan</DialogTitle>
			<DialogDescription></DialogDescription>

			<Card className="bg-transparent border-none shadow-none">
				<CardContent className="p-0 space-y-2">
					<Form {...form}>
						<form
							method="POST"
							className="space-y-4"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<FormField
								control={form.control}
								name="patient"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Patient</FormLabel>
										<Popover
											open={open.patient}
											onOpenChange={(value: boolean) =>
												togglePopover("patient", value)
											}
										>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														role="combobox"
														className={cn(
															!field.value
																? "w-full flex items-center justify-center bg-transparent border border-hubGreen text-hubGreen text-sm hover:bg-transparent hover:scale-1"
																: "w-fit border-none py-1 px-2 flex items-center gap-x-2 bg-hubGrey/80 rounded-full hover:bg-bg-hubGrey/50"
														)}
													>
														{!field.value ? (
															<>
																<Plus className="size-4 mr-2" />{" "}
																Add Patient
															</>
														) : (
															<>
																<div className="size-6 flex items-center justify-center rounded-full border-2 border-hubGrey200">
																	<User className="size-[80%]" />
																</div>
																<p className="text-hubBlue text-xs">
																	{
																		patients.find(
																			(
																				patient
																			) =>
																				patient.name ===
																				field.value
																		)?.name
																	}
																</p>
															</>
														)}
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className={cn(
													"w-[750px] p-0",
													field.value &&
														"translate-x-[22%]"
												)}
											>
												<Command>
													<CommandInput
														placeholder="Search framework..."
														className="h-9"
													/>
													<CommandList className="max-h-[250px] z-20">
														<CommandEmpty>
															No framework found.
														</CommandEmpty>
														<CommandGroup>
															{patients.map(
																(
																	patient,
																	i
																) => (
																	<CommandItem
																		value={
																			patient.name
																		}
																		key={i}
																		onSelect={() => {
																			form.setValue(
																				"patient",
																				patient.name
																			);
																			togglePopover(
																				"patient",
																				false
																			);
																		}}
																		className="flex justify-between"
																	>
																		<div className="flex items-center gap-x-2">
																			<div className="size-10 flex items-center justify-center rounded-full border">
																				<User className="size-[90%]" />
																			</div>
																			<div>
																				<p>
																					{
																						patient.name
																					}
																				</p>
																				<span className="text-hubBlack/70 text-xs">
																					{
																						patient.address
																					}
																				</span>
																			</div>
																		</div>
																		<ChevronRight className="justify-self-end" />
																	</CommandItem>
																)
															)}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="condition"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Condition</FormLabel>
										<Popover
											open={open.condition}
											onOpenChange={(value) =>
												togglePopover(
													"condition",
													value
												)
											}
										>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														role="combobox"
														className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 hover:scale-1 shadow-none rounded-lg"
													>
														<div className="w-full flex items-center justify-between">
															<p>
																{field.value
																	? conditions.find(
																			(
																				condition
																			) =>
																				condition.name ===
																				field.value
																		)?.name
																	: "Add Patient"}
															</p>

															<ChevronDown className="size-5" />
														</div>
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className={cn("w-[750px] p-0")}
											>
												<Command>
													<CommandList className="!max-h-[200px] px-4 z-20">
														<CommandEmpty>
															No framework found.
														</CommandEmpty>
														<CommandGroup>
															{conditions.map(
																(
																	condition,
																	i
																) => (
																	<CommandItem
																		value={
																			condition.name
																		}
																		key={i}
																		onSelect={() => {
																			form.setValue(
																				"condition",
																				condition.name
																			);
																			setSelectedCondition(
																				condition.name
																			);
																			togglePopover(
																				"condition",
																				false
																			);
																		}}
																		className="bg-hubGrey flex justify-between items-center gap-2 mt-2 p-2.5"
																	>
																		<div>
																			<p className="font-medium">
																				{
																					condition.name
																				}
																			</p>
																			<span className="text-sm text-muted-foreground">
																				Added
																				on
																				12th
																				July
																				2024
																			</span>
																		</div>
																		<Button
																			variant="ghost"
																			size="sm"
																			className="size-7 p-0 rounded flex items-center justify-center ml-[300px]"
																		>
																			<ChevronRight className="size-5" />
																		</Button>
																	</CommandItem>
																)
															)}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							{selectedCondition ? (
								<div className="w-[calc(100%-50px)] px-3 pt-2 pb-1 rounded bg-white border border-hubGrey200 absolute right-1/2 translate-x-1/2 bottom-2">
									<p className="text-sm mb-1">
										Prescriptions
									</p>
									<div className="bg-hubGrey p-2.5 rounded-lg">
										<FormField
											control={form.control}
											name="medicine"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-xs">
														Medicine
													</FormLabel>
													<Select
														onValueChange={
															field.onChange
														}
														defaultValue={
															field.value
														}
													>
														<FormControl>
															<SelectTrigger className="px-6 bg-white text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg">
																<SelectValue placeholder="Medicine" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<PrescriptionSelectitems type="medicine" />
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className="grid grid-cols-3 gap-x-2.5">
											<div className="flex items-end justify-center gap-x-2">
												<FormField
													control={form.control}
													name="dosage"
													render={({ field }) => (
														<FormItem>
															<FormLabel className="text-xs">
																Dosage
															</FormLabel>
															<FormControl>
																<Input
																	placeholder="Dosage"
																	{...field}
																	className="flex-1 px-3 bg-white text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
																/>
															</FormControl>
															<FormMessage />
															<FormControl />
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name="dosageType"
													render={({ field }) => (
														<FormItem className="w-[45%]">
															<FormLabel></FormLabel>
															<Select
																onValueChange={
																	field.onChange
																}
																defaultValue={
																	field.value
																}
															>
																<FormControl>
																	<SelectTrigger className="px-3 bg-white text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg">
																		<SelectValue placeholder="dosage" />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	<PrescriptionSelectitems type="dosage" />
																</SelectContent>
															</Select>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
											<FormField
												control={form.control}
												name="frequency"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="text-xs">
															Frequency
														</FormLabel>
														<Select
															onValueChange={
																field.onChange
															}
															defaultValue={
																field.value
															}
														>
															<FormControl>
																<SelectTrigger className="px-3 bg-white text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg">
																	<SelectValue placeholder="Frequency" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<PrescriptionSelectitems type="frequency" />
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
											{/* </div> */}
											<div className="flex items-end justify-center gap-x-2">
												<FormField
													control={form.control}
													name="duration"
													render={({ field }) => (
														<FormItem>
															<FormLabel className="text-xs">
																Duration
															</FormLabel>
															<FormControl>
																<Input
																	placeholder="Duration"
																	{...field}
																	className="flex-1 px-3 bg-white text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name="durationType"
													render={({ field }) => (
														<FormItem className="w-[45%]">
															<FormLabel></FormLabel>
															<Select
																onValueChange={
																	field.onChange
																}
																defaultValue={
																	field.value
																}
															>
																<FormControl>
																	<SelectTrigger className="px-3 bg-white text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg">
																		<SelectValue placeholder="Duration" />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	<PrescriptionSelectitems type="duration" />
																</SelectContent>
															</Select>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>
									</div>

									<Button
										variant="ghost"
										onClick={() =>
											setSelectedCondition(null)
										}
										className="w-full mt-3 border border-hubGreen text-hubGreen text-sm hover:scale-1 "
									>
										<Plus className="size-4 mr-2" /> Add
										Medication
									</Button>
								</div>
							) : null}

							<div className="space-y-5">
								<Button
									// disabled={isLoading}
									className="mt-32 w-full gap-x-2 bg-hubGreen hover:bg-hubGreen/95 disabled:bg-hubGreen/90 disabled:text-secondary"
									type="submit"
								>
									Create Plan
									{/* {isLoading ? (
																<Spinner className="size-4" />
															) : null} */}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</DialogContent>
	);
};

export default AddPlanDialog;
