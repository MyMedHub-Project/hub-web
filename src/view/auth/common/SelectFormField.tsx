"use client";

import { UseFormReturn } from "react-hook-form";
import { memo } from "react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";

interface SelectFormFieldProps {
	form: UseFormReturn<any>;
	label: string;
	name: string;
	onChange?: (value: string) => void;
	options: { value: string; label: string }[];
	placeholder: string;
}

const SelectFormField = ({
	form,
	label,
	name,
	onChange,
	options,
	placeholder
}: SelectFormFieldProps) => (
	<FormField
		control={form.control}
		name={name}
		render={({ field }) => (
			<FormItem>
				<FormLabel className="max-sm:text-sm text-md font-normal max-sm:text-muted-foreground max-sm:hidden">
					{label}
				</FormLabel>
				<Select
					onValueChange={(value) => {
						field.onChange(value);
						if (onChange) onChange(value);
					}}
					defaultValue={field.value}
				>
					<FormControl>
						<SelectTrigger className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg placeholder:opacity-0 max-sm:placeholder:opacity-100">
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
					</FormControl>
					<SelectContent>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FormMessage />
			</FormItem>
		)}
	/>
);

export default memo(SelectFormField);
