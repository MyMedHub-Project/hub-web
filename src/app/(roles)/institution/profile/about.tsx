import { AvatarIcon } from "@radix-ui/react-icons";
import { Circle, LocateFixedIcon, Mail, Phone, Star } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const About = () => (
	<Card className="bg-transparent border-none shadow-none flex items-center gap-x-5">
		<div className="rounded-full border-4 w-fit border-gray-300">
			<AvatarIcon width={200} height={200} />
		</div>
		<div className="flex flex-col items-start">
			<CardTitle className="flex items-center gap-x-3 text-2xl mb-1">
				Federal Medical Center
			</CardTitle>
			<CardContent className="pl-0 space-y-2">
				<div className="flex gap-x-1">
					<LocateFixedIcon className="fill-hubPurple text-hubGrey" />
					No. 25, Sakura street, Lokoja, Kogi State, Nigeria
				</div>
				<div className="flex gap-x-1">
					<Phone className="fill-hubPurple text-hubGrey" /> +234 123
					4567
				</div>
				<div className="flex gap-x-1">
					<Mail className="fill-hubPurple text-hubGrey" />
					info@fmchospital.com
				</div>
				<div className="flex gap-x-1">
					<Circle className="fill-hubPurple text-hubGrey" />
					<a
						href="www.fmchospital.com"
						className="text-hubBlue underline"
					>
						www.fmchospital.com
					</a>
				</div>
				<div className="flex gap-x-1">
					<Star className="fill-hubOrange text-hubGrey" />
					4.4 <span className="underline">(100+ reviews)</span>
				</div>
			</CardContent>
		</div>
	</Card>
);

export default About;
