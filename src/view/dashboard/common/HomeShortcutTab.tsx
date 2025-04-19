import Link from "next/link";
import {
	BookAppointmentIconSVGComponent,
	DoctorSVGComponent,
	LabOrderIconSVGComponent,
	MyConditionsIconSVGComponent,
	PatientsIconSVGComponent,
	SubscriptionIconSVGComponent,
	TestResultsIconSVGComponent,
	TreatmentIconSVGComponents
} from "@/components/icons";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HomeShortcutTabProps {
	className?: string;
	role: string;
}

export const HomeShortcutTab = ({ className, role }: HomeShortcutTabProps) => (
	<div className={cn("grid grid-cols-2 gap-4 max-sm:gap-5", className)}>
		{homeShortcutTabs.map((tab) =>
			tab.userRole === role ? (
				<Link href={tab.href} key={tab.title}>
					<Card
						className={cn(
							"h-full flex gap-2 justify-start items-center p-4 bg-hub-grey border-none rounded-lg shadow-none hover:shadow-md transition-shadow text-base font-normal max-sm:h-16 max-sm:text-xs",
							`bg-${tab.color}/10`
						)}
					>
						<div
							className={cn(
								"h-12 w-12 bg-hub-purple/10 rounded-full flex items-center justify-center max-sm:h-8 max-sm:w-8",
								`bg-${tab.color}/10 fill-${tab.color}`
							)}
						>
							{tab.icon}
						</div>

						<span className={cn("", `text-${tab.color}`)}>
							{tab.title}
						</span>
					</Card>
				</Link>
			) : null
		)}
	</div>
);

export interface HomeShortcutTabType {
	icon: React.ReactNode;
	title: string;
	color: string;
	href: string;
	userRole: "patient" | "provider" | "institution";
}

export const homeShortcutTabs: HomeShortcutTabType[] = [
	//
	// Patient Home Shortcuts
	//
	{
		icon: (
			<BookAppointmentIconSVGComponent className="w-6 h-6 max-sm:h-4 max-sm:w-4" />
		),
		title: "Book Appointment",
		color: "hub-blue",
		href: "",
		userRole: "patient"
	},
	{
		icon: (
			<MyConditionsIconSVGComponent className="w-6 h-6 max-sm:h-4 max-sm:w-4" />
		),
		title: "My Conditions",
		color: "hub-orange",
		href: "",
		userRole: "patient"
	},
	{
		icon: (
			<LabOrderIconSVGComponent className="w-6 h-6 max-sm:h-4 max-sm:w-4" />
		),
		title: "Lab Order",
		color: "hub-green",
		href: "",
		userRole: "patient"
	},
	{
		icon: (
			<TestResultsIconSVGComponent className="w-6 h-6 max-sm:h-4 max-sm:w-4" />
		),
		title: "Test Results",
		color: "hub-purple",
		href: "",
		userRole: "patient"
	},

	//
	// Provider Home Shortcuts
	//
	{
		icon: (
			<PatientsIconSVGComponent className="w-6 h-6 max-sm:h-4 max-sm:w-4" />
		),
		title: "My Patients",
		color: "hub-blue",
		href: "",
		userRole: "provider"
	},
	{
		icon: (
			<TreatmentIconSVGComponents className="w-6 h-6 max-sm:h-4 max-sm:w-4" />
		),
		title: "Treatment Plan",
		color: "hub-orange",
		href: "",
		userRole: "provider"
	},

	//
	// Institution Home Shortcuts
	//
	{
		icon: (
			<BookAppointmentIconSVGComponent className="w-6 h-6 max-sm:h-4 max-sm:w-4" />
		),
		title: "Appointments",
		color: "hub-blue",
		href: "",
		userRole: "institution"
	},
	{
		icon: (
			<PatientsIconSVGComponent className="w-6 h-6 max-sm:h-4 max-sm:w-4" />
		),
		title: "Patients",
		color: "hub-green",
		href: "",
		userRole: "institution"
	},
	{
		icon: <DoctorSVGComponent className="w-6 h-6 max-sm:h-4 max-sm:w-4" />,
		title: "Provider",
		color: "hub-purple",
		href: "",
		userRole: "institution"
	},
	{
		icon: (
			<SubscriptionIconSVGComponent className="w-6 h-6 max-sm:h-4 max-sm:w-4" />
		),
		title: "Subscription",
		color: "hub-green",
		href: "",
		userRole: "institution"
	}
];
