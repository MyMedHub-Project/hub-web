"use client";

import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns/format";
import { CalendarCheckIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { memo } from "react";
import { Button } from "@/components/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateFormFieldProps {
	form: UseFormReturn<any>;
	label: string;
	name: string;
}

const DateFormField = ({ form, label, name }: DateFormFieldProps) => (
	<FormField
		control={form.control}
		name={name}
		render={({ field }) => (
			<FormItem>
				<FormLabel className="max-sm:text-sm text-md font-normal max-sm:text-muted-foreground">
					{label}
				</FormLabel>
				<Popover>
					<PopoverTrigger
						asChild
						className="w-full px-6 bg-hub-grey text-hub-black border-0 border-b-2 border-b-hub-grey200 focus:border-0 focus:border-b-2 focus:border-b-hub-green outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg"
					>
						<FormControl>
							<Button
								variant="outline"
								className={cn(
									"w-full h-12 px-6 bg-hub-grey text-hub-black border-0 border-b-2 border-b-hub-grey200 focus:border-0 focus:border-b-2 focus:border-b-hub-green outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg",
									!field.value && "text-muted-foreground"
								)}
							>
								{field.value ? (
									format(field.value, "dd/MM/yyy")
								) : (
									<span className="text-sm">Pick a date</span>
								)}
								<CalendarCheckIcon className="ml-auto h-4 w-4 opacity-50" />
							</Button>
						</FormControl>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
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
				<FormMessage />
			</FormItem>
		)}
	/>
);

export default memo(DateFormField);
