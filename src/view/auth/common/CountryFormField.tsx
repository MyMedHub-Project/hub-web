"use client";

import { UseFormReturn } from "react-hook-form";
import { memo, useCallback } from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/form";
import CountrySelect from "@/components/ui/country-select";

interface CountryFormFieldProps {
	form: UseFormReturn<any>;
	setCountryCode: (countryCode: string) => void;
}

const CountryFormField = ({ form, setCountryCode }: CountryFormFieldProps) => {
	const handleCountrySelect = useCallback(
		(rawValue: string) => {
			const { countryShortCode } = JSON.parse(rawValue);
			setCountryCode(countryShortCode);
			form.setValue("country", rawValue);
		},
		[form, setCountryCode]
	);

	return (
		<FormField
			control={form.control}
			name="country"
			render={() => (
				<FormItem>
					<FormLabel className="max-sm:text-sm text-md font-normal max-sm:text-muted-foreground max-sm:hidden">
						Country
					</FormLabel>
					<CountrySelect
						onChange={handleCountrySelect}
						placeholder="Choose your country"
						className="px-6 bg-hubGrey text-hubBlack border-0 border-b-2 border-b-hubGrey200 focus:border-0 focus:border-b-2 focus:border-b-hubGreen outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg placeholder:opacity-0 max-sm:placeholder:opacity-100"
					/>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default memo(CountryFormField);
