import { AvatarIcon } from "@radix-ui/react-icons";
import { Cross, LocateFixedIcon, Luggage, Star } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ViewReviewDialog from "./action-modals/view-reviews";

const About = () => (
	<Card className="bg-transparent border-none shadow-none flex items-center gap-x-5">
		<div className="rounded-full border-4 w-fit border-gray-300">
			<AvatarIcon width={150} height={150} />
		</div>
		<div className="flex flex-col items-start">
			<CardTitle className="flex items-center gap-x-3 text-lg mb-1">
				Dr. Dolor Manchi
				<span className="rounded-full bg-green-600 size-2"></span>{" "}
			</CardTitle>
			<CardContent className="pl-0 space-y-2">
				<div className="text-sm flex gap-x-1">
					<Cross className="fill-hubPurple text-hubGrey size-5" />{" "}
					Cardiologist
				</div>
				<div className="flex gap-x-1 text-sm">
					<Luggage className="fill-hubPurple text-hubGrey size-5" /> 6
					years in practice
				</div>
				<div className="flex gap-x-1 text-sm">
					<LocateFixedIcon className="fill-hubPurple text-hubGrey size-5" />
					No. 25, Sakura street, Lokoja, Kogi State, Nigeria
				</div>
				<div className="flex gap-x-1 text-sm">
					<Star className="fill-hubOrange text-hubGrey size-5" />
					4.4{" "}
					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant="link"
								className="size-fit p-0 underline"
							>
								(100+ reviews)
							</Button>
						</DialogTrigger>

						<ViewReviewDialog />
					</Dialog>
				</div>
			</CardContent>
		</div>
	</Card>
);

export default About;
