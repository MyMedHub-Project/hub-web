import Link from "next/link";
import React from "react";
import { Card } from "./card";

const actions = [
	{
		icon: "",
		title: "Book Appointment",
		color: "text-hub-blue",
		href: "/appointments/new"
	},
	{
		icon: "",
		title: "Treatment Plans",
		color: "text-hub-orange",
		href: "/appointments/new"
	},
	{
		icon: "",
		title: "Add New Provider",
		color: "text-hub-purple",
		href: "/appointments/new"
	},
	{
		icon: "",
		title: "Submit Lab Order",
		color: "text-hub-green",
		href: "/appointments/new"
	}
];
const HeroCards = () => (
	<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
		{actions.map((action) => (
			<Link href={action.href} key={action.title}>
				<Card className="p-5 bg-hub-grey border-none hover:shadow-md transition-shadow">
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
