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
import { Input } from "@/components/input";

interface TextFormFieldProps {
	form: UseFormReturn<any>;
	label?: string;
	name: string;
	placeholder: string;
	type?: string;
}

const TextFormField = ({ form, label, name, type }: TextFormFieldProps) => (
	<FormField
		control={form.control}
		name={name}
		render={({ field }) => (
			<FormItem>
				{label ? (
					<FormLabel className="max-sm:text-sm text-md font-normal max-sm:text-muted-foreground max-sm:hidden">
						{label}
					</FormLabel>
				) : null}

				<FormControl>
					<Input
						type={type ?? "text"}
						placeholder={label}
						{...field}
						className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg placeholder:opacity-0 max-sm:placeholder:opacity-100"
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
);

export default memo(TextFormField);
