"use client";

import { UseFormReturn } from "react-hook-form";
import { memo } from "react";
import { FormLabel, FormMessage } from "@/components/form";
import { FormField } from "@/components/form";
import { FormItem } from "@/components/form";
import RegionSelect from "@/components/ui/region-select";

interface RegionFormFieldProps {
	form: UseFormReturn<any>;
	countryCode: string;
}

const RegionFormField = ({ countryCode, form }: RegionFormFieldProps) => (
	<FormField
		control={form.control}
		name="state"
		render={({ field }) => (
			<FormItem>
				<FormLabel className="max-sm:text-sm text-md font-normal max-sm:text-muted-foreground max-sm:hidden">
					State
				</FormLabel>
				<RegionSelect
					countryCode={countryCode}
					onChange={field.onChange}
					placeholder="Choose your state"
					className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg placeholder:opacity-0 max-sm:placeholder:opacity-100"
				/>
				<FormMessage />
			</FormItem>
		)}
	/>
);

export default memo(RegionFormField);
