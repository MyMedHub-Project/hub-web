import { AvatarIcon } from "@radix-ui/react-icons";
import { LocateFixedIcon, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const About = ({ info }: { info: any }) => {
	const { address, email, firstname, lastname, phone, profileImage } = info;

	return (
		<Card className="bg-transparent border-none shadow-none flex items-center gap-x-5">
			<div className="rounded-full border-4 size-[200px] border-gray-300">
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
					{`${firstname} ${lastname}`}
					<span className="rounded-full bg-green-600 size-2"></span>{" "}
				</CardTitle>
				<CardContent className="pl-0 space-y-2">
					<div className="flex gap-x-1">
						<Mail className="fill-hub-purple text-hub-grey" />{" "}
						{email}
					</div>
					<div className="flex gap-x-1">
						<Phone className="fill-hub-purple text-hub-grey" />
						{phone}
					</div>
					<div className="flex gap-x-1">
						<LocateFixedIcon className="fill-hub-purple text-hub-grey" />
						{`${address.street}, ${address.city}, ${address.state}, ${address.country}.`}
					</div>
				</CardContent>
			</div>
		</Card>
	);
};

export default About;
