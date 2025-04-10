"use client";

import React, { useRef, useState } from "react";
import { CalendarIcon, Check, ChevronDown, FileUp, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const labsData = [
	{
		value: "medilife-diagnostics-1",
		label: "MediLife Diagnostics",
		location: "Lagos, Nigeria"
	},
	{
		value: "medilife-diagnostics-2",
		label: "MediLife Diagnostics",
		location: "Lagos, Nigeria"
	},
	{
		value: "medilife-diagnostics-3",
		label: "MediLife Diagnostics",
		location: "Lagos, Nigeria"
	}
];

export default function LabOrderForm() {
	const [labs] = useState(labsData);
	const [open, setOpen] = useState(false);
	const [selectedLab, setSelectedLab] = useState<string | null>(null);
	const [date, setDate] = useState<Date>();
	const [file, setFile] = useState<File | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	const removeFile = () => {
		setFile(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<Card className="">
			<CardContent className="p-6">
				<form className="space-y-6">
					<div className="space-y-2">
						<h2 className="text-xl font-semibold">
							Place a Lab Order
						</h2>
						<p className="text-sm text-muted-foreground">
							Submit your doctor&apos;s prescriptions for lab
							tests
						</p>
					</div>

					<div className="space-y-4">
						<div className="space-y-2">
							<Label>Lab</Label>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										role="combobox"
										aria-expanded={open}
										className="w-full justify-between"
									>
										{selectedLab
											? labs.find(
													(lab) =>
														lab.value ===
														selectedLab
												)?.label
											: "Select Lab"}
										<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-[400px] p-0">
									<Command>
										<CommandInput placeholder="Search..." />
										<CommandEmpty>
											No lab found.
										</CommandEmpty>
										<CommandList>
											{labs?.map((lab) => (
												<CommandItem
													key={lab.value}
													value={lab.value}
													onSelect={(
														currentValue
													) => {
														setSelectedLab(
															currentValue ===
																selectedLab
																? null
																: currentValue
														);
														setOpen(false);
													}}
												>
													<Check
														className={cn(
															"mr-2 h-4 w-4",
															selectedLab ===
																lab.value
																? "opacity-100"
																: "opacity-0"
														)}
													/>
													<div>
														<div>{lab.label}</div>
														<div className="text-sm text-muted-foreground">
															{lab.location}
														</div>
													</div>
												</CommandItem>
											))}
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						</div>

						<div className="space-y-2">
							<Label>Upload a Prescription</Label>
							<div className="grid w-full gap-2">
								<Input
									ref={fileInputRef}
									type="file"
									className="hidden"
									onChange={handleFileChange}
									accept=".pdf,.jpg,.png,.doc"
								/>
								{!file ? (
									<Button
										type="button"
										variant="outline"
										className="h-20"
										onClick={() =>
											fileInputRef.current?.click()
										}
									>
										<div className="flex flex-col items-center gap-2">
											<FileUp className="h-4 w-4 text-muted-foreground" />
											<span className="text-xs text-muted-foreground">
												Click to upload file
											</span>
											<span className="text-xs text-muted-foreground">
												Supported formats: JPG, PNG,
												PDF, DOC
											</span>
										</div>
									</Button>
								) : (
									<div className="flex items-center gap-2 rounded-md border p-2">
										<FileUp className="h-4 w-4 text-muted-foreground" />
										<span className="flex-1 truncate text-sm">
											{file.name}
										</span>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="h-8 w-8"
											onClick={removeFile}
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label>Add a Note</Label>
							<Textarea className="resize-none bg-gray-100 shadow-xs" />
						</div>

						<div className="space-y-2">
							<Label>Preferred date of visit</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={cn(
											"w-full justify-between text-left font-normal flex",
											!date && "text-muted-foreground"
										)}
									>
										{date ? format(date, "PPP") : ""}
										<CalendarIcon className="left-0 mr-2 h-4 w-4 " />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										selected={date}
										onSelect={setDate}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>

						<Button className="w-full bg-hubGreen" type="submit">
							Submit Order
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
