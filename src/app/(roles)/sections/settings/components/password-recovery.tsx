import { Label } from "@radix-ui/react-label";
import {
	RadioGroup,
	RadioGroupIndicator,
	RadioGroupItem
} from "@radix-ui/react-radio-group";
import { MailIcon, Phone } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader
} from "@/components/ui/card";

const PasswordRecovery = () => {
	const [checked, setChecked] = useState<"phone" | "email">("phone");

	return (
		<Card className="bg-transparent shadow-none border-none">
			<CardHeader className="p-0 text-lg font-bold">
				Password Recovery
			</CardHeader>
			<CardDescription className="text-hub-black">
				Choose where you would like to receive the code to reset your
				password when required.
			</CardDescription>
			<CardContent className="pl-0 pt-5">
				<RadioGroup defaultValue="email" className="space-y-5">
					<div
						onClick={() => setChecked("email")}
						className={cn(
							"flex items-center justify-between gap-x-2 bg-hub-grey p-4 rounded border border-transparent",
							checked === "email"
								? "border-hub-green bg-hub-green-light"
								: ""
						)}
					>
						<Label
							htmlFor="email"
							className="flex items-center gap-x-5"
						>
							<MailIcon className="fill-hub-black text-hub-grey size-4" />
							<div>
								<h4 className="font-semibold">Email</h4>
								<p className="text-sm text-hub-black/50">
									Your password reset code would be sent to{" "}
									<span className="text-hub-black">
										johndoe@example.com
									</span>
								</p>
							</div>
						</Label>
						<RadioGroupItem
							value="email"
							id="email"
							checked={checked === "email"}
							className="size-[18px] rounded-full border border-hub-black data-[state=checked]:border-hub-green data-[state=checked]:bg-transparent"
						>
							<RadioGroupIndicator className="flex size-full items-center justify-center after:block after:size-2 after:rounded-full after:bg-hub-green" />
						</RadioGroupItem>
					</div>

					<div
						onClick={() => setChecked("phone")}
						className={cn(
							"flex items-center justify-between gap-x-2 bg-hub-grey p-4 rounded border border-transparent",
							checked === "phone"
								? "border-hub-green bg-hub-green-light"
								: ""
						)}
					>
						<Label
							htmlFor="phone"
							className="flex items-center gap-x-5"
						>
							<Phone className="fill-hub-black size-4" />
							<div>
								<h4 className="font-semibold">Phone Number</h4>
								<p className="text-sm text-hub-black/50">
									Your password reset code would be sent to
									<span className="text-hub-black">
										+2348123456789
									</span>
								</p>
							</div>
						</Label>
						<RadioGroupItem
							value="phone"
							id="phone"
							checked={checked === "phone"}
							className="size-[18px] rounded-full border border-hub-black data-[state=checked]:border-hub-green data-[state=checked]:bg-transparent"
						>
							<RadioGroupIndicator className="flex size-full items-center justify-center after:block after:size-2 after:rounded-full after:bg-hub-green" />
						</RadioGroupItem>
					</div>
				</RadioGroup>
			</CardContent>
		</Card>
	);
};

export default PasswordRecovery;
