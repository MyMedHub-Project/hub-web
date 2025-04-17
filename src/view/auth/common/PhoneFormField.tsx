"use client";

import React from "react";
import { memo } from "react";
import { UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/form";
import { PhoneInput } from "@/components/ui/phone-input";

interface PhoneFormFieldProps {
	form: UseFormReturn<any>;
}

const PhoneFormField = ({ form }: PhoneFormFieldProps) => (
	<FormField
		control={form.control}
		name="tel"
		render={({ field }) => (
			<FormItem>
				<FormLabel className="max-sm:text-sm text-md font-normal max-sm:text-muted-foreground  max-sm:hidden">
					Phone Number
				</FormLabel>
				<FormControl>
					<PhoneInput
						defaultCountry="NG"
						placeholder="Phone number"
						{...field}
						className="bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg placeholder:opacity-0 max-sm:placeholder:opacity-100"
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
);

export default memo(PhoneFormField);
