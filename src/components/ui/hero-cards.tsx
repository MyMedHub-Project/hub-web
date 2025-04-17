import Link from "next/link";
import React from "react";
import { Card } from "./card";

const actions = [
	{
		icon: "",
		title: "Book Appointment",
		color: "text-hubBlue",
		href: "/appointments/new"
	},
	{
		icon: "",
		title: "Treatment Plans",
		color: "text-hubOrange",
		href: "/appointments/new"
	},
	{
		icon: "",
		title: "Add New Provider",
		color: "text-hubPurple",
		href: "/appointments/new"
	},
	{
		icon: "",
		title: "Submit Lab Order",
		color: "text-hubGreen",
		href: "/appointments/new"
	}
];
const HeroCards = () => (
	<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
		{actions.map((action) => (
			<Link href={action.href} key={action.title} className="w-full">
				<Card className="p-5 bg-hubGrey border-none hover:shadow-md transition-shadow">
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-lg"></div>
						<span className="font-medium">{action.title}</span>
					</div>
				</Card>
			</Link>
		))}
	</div>
);

export default HeroCards;
