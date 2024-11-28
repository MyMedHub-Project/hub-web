import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AvatarIcon } from "@radix-ui/react-icons";
import { LocateFixedIcon, Mail, Phone } from "lucide-react";

const About = () => {
	return (
		<Card className="bg-transparent border-none shadow-none flex items-center gap-x-5">
			<div className="rounded-full border-4 w-fit border-gray-300">
				<AvatarIcon width={200} height={200} />
			</div>
			<div className="flex flex-col items-start">
				<CardTitle className="flex items-center gap-x-3 text-2xl mb-1">
					Samuel Anderson
					<span className="rounded-full bg-green-600 size-2"></span>{" "}
				</CardTitle>
				<CardContent className="pl-0 space-y-2">
					<div className="flex gap-x-1">
						<Mail className="fill-hubPurple text-hubGrey" />{" "}
						samuelanderson@example.com
					</div>
					<div className="flex gap-x-1">
						<Phone className="fill-hubPurple text-hubGrey" /> 6
						(123) 456-7890
					</div>
					<div className="flex gap-x-1">
						<LocateFixedIcon className="fill-hubPurple text-hubGrey" />
						No. 25, Sakura street, Lokoja, Kogi State, Nigeria
					</div>
				</CardContent>
			</div>
		</Card>
	);
};

export default About;
