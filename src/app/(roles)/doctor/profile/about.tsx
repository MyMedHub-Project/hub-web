import { AvatarIcon } from "@radix-ui/react-icons";
import { Cross, LocateFixedIcon, Luggage, Star } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const About = () => (
	<Card className="bg-transparent border-none shadow-none flex items-center gap-x-5">
		<div className="rounded-full border-4 w-fit border-gray-300">
			<AvatarIcon width={200} height={200} />
		</div>
		<div className="flex flex-col items-start">
			<CardTitle className="flex items-center gap-x-3 text-2xl mb-1">
				Dr. Dolor Manchi
				<span className="rounded-full bg-green-600 size-2"></span>{" "}
			</CardTitle>
			<CardContent className="pl-0 space-y-2">
				<div className="flex gap-x-1">
					<Cross className="fill-hubPurple text-hubGrey" />{" "}
					Cardiologist
				</div>
				<div className="flex gap-x-1">
					<Luggage className="fill-hubPurple text-hubGrey" /> 6 years
					in practice
				</div>
				<div className="flex gap-x-1">
					<LocateFixedIcon className="fill-hubPurple text-hubGrey" />
					No. 25, Sakura street, Lokoja, Kogi State, Nigeria
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
