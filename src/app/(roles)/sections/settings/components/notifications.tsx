"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel
} from "@/components/form";
import { Switch } from "@/components/ui/switch";

const FormSchema = z.object({
	pushNotification: z.boolean().default(true),
	emailNotification: z.boolean().default(true),
	smsNotification: z.boolean().default(true)
});

const Notifications = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pushNotification: true,
			emailNotification: true,
			smsNotification: true
		}
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
			>
				<div>
					<h3 className="mb-4 text-lg font-medium">
						Email Notifications
					</h3>
					<div className="space-y-4 divide-y">
						<FormField
							control={form.control}
							name="pushNotification"
							render={({ field }) => (
								<FormItem className="flex flex-row items-end justify-between py-4 pl-2">
									<div className="flex flex-col gap-y-5">
										<FormDescription className="text-xs">
											Push Notifications
										</FormDescription>
										<FormLabel className="">
											Enable Push Notifications
										</FormLabel>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
											className="relative h-[30px] w-[50px] cursor-pointer rounded-full bg-hub-green/20! outline-hidden data-[state=checked]:bg-hub-green/40!"
										></Switch>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="smsNotification"
							render={({ field }) => (
								<FormItem className="flex flex-row items-end justify-between py-4 pl-2">
									<div className="flex flex-col gap-y-5">
										<FormDescription className="text-xs">
											SMS Notifications
										</FormDescription>
										<FormLabel className="text-lg">
											Receive SMS Notifications
										</FormLabel>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
											className="relative h-[30px] w-[50px] cursor-pointer rounded-full bg-hub-green/20! outline-hidden data-[state=checked]:bg-hub-green/40!"
										></Switch>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="emailNotification"
							render={({ field }) => (
								<FormItem className="flex flex-row items-end justify-between py-4 pl-2">
									<div className="flex flex-col gap-y-5">
										<FormDescription className="text-xs">
											Email Notifications
										</FormDescription>
										<FormLabel className="text-lg">
											Receive Email Notifications
										</FormLabel>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
											className="relative h-[30px] w-[50px] cursor-pointer rounded-full bg-hub-green/20! outline-hidden data-[state=checked]:bg-hub-green/40!"
										></Switch>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
				</div>
				{/* <Button type="submit">Submit</Button> */}
			</form>
		</Form>
	);
};

export default Notifications;
