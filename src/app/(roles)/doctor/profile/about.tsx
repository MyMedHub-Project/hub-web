import { AvatarIcon } from "@radix-ui/react-icons";
import { Cross, LocateFixedIcon, Luggage, Star } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const About = ({ info }: { info: any }) => {
	const {
		address,
		// email,
		firstname,
		lastname,
		// phone,
		profileImage,
		providerSpecialization,
		rating
	} = info;

	return (
		<Card className="bg-transparent border-none shadow-none flex items-center gap-x-5">
			<div className="rounded-full border-4 w-full border-gray-300">
				{profileImage && profileImage !== "" ? (
					<Image
						src={profileImage}
						alt="profile"
						className="size-full"
					/>
				) : (
					<AvatarIcon className="size-full" />
				)}
			</div>
			<div className="flex flex-col items-start">
				<CardTitle className="flex items-center gap-x-3 text-2xl mb-1">
					Dr. {firstname} {lastname}
					<span className="rounded-full bg-green-600 size-2"></span>{" "}
				</CardTitle>
				<CardContent className="pl-0 space-y-2">
					{providerSpecialization !== "" ? (
						<div className="flex gap-x-1">
							<Cross className="fill-hubPurple text-hubGrey" />
							{providerSpecialization}
						</div>
					) : null}
					<div className="flex gap-x-1">
						<Luggage className="fill-hubPurple text-hubGrey" /> 6
						years in practice
					</div>
					<div className="flex gap-x-1">
						<LocateFixedIcon className="fill-hubPurple text-hubGrey" />
						{`${address.street}, ${address.city}, ${address.state}, ${address.country}.`}
					</div>
					<div className="flex gap-x-1">
						<Star className="fill-hubOrange text-hubGrey" />
						{rating}{" "}
						<span className="underline">(100+ reviews)</span>
					</div>
				</CardContent>
			</div>
		</Card>
	);
};

export default About;
