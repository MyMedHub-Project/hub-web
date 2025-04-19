"use client";

import { Button } from "@/components/button";
import {
	HarmburgerIconSVGComponent,
	NotificationIconSVGComponent,
	TailedArrowRightIconSVGComponent,
	XCloseIconSVGComponent
} from "@/components/icons";
import { SessionProfile } from "@/types/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNav } from "@/hooks/useNav";
import { HomeShortcutTab } from "@/view/dashboard/common/HomeShortcutTab";
import {
	appointmentData,
	medications,
	recentlyContactedProviders
} from "@/view/dashboard/home/helper";
import { ProvidersMiniCard } from "@/view/dashboard/common/ProvidersMiniCard";
import { MedicationMiniCard } from "@/view/dashboard/common/MedicationMiniCard";
import { Separator } from "@/components/ui/separator";
import { AppointmentCard } from "@/view/dashboard/common/AppointmentCard";
import { ChatIconSVGComponent } from "../../../components/icons/index";

interface HomeViewProps {
	session: SessionProfile;
}

const HomeView = ({ session }: HomeViewProps) => {
	const { setState, state } = useNav();

	const handleNavToggle = () => {
		setState(state === "closed" ? "open" : "closed");
	};

	return (
		<Card className="w-full mx-auto border-0 shadow-none px-[60px] max-sm:px-0">
			<CardHeader className="flex items-center justify-center gap-1 text-hub-black font-normal text-base border-0 max-sm:flex-col max-sm:h-[172px] max-sm:w-full max-sm:bg-hub-black max-sm:p-0 max-sm:m-0 max-sm:justify-center max-sm:text-sm">
				<div className="w-full flex justify-between items-center max-sm:px-6">
					<div className="w-full flex items-center gap-3">
						<Button
							className="p-0 m-0 hidden max-sm:block"
							onClick={handleNavToggle}
						>
							<HarmburgerIconSVGComponent />
						</Button>
						<CardTitle className="flex flex-col max-sm:text-white">
							<span className="text-2xl font-semibold max-sm:text-base max-sm:font-medium">
								{`Hello ${session.profile?.lastname}`} 🌞
							</span>
							<span className="text-base font-normal max-sm:text-xs">
								How are you feeling today?
							</span>
							{/* <span className="text-xs">
									{format(new Date(), "dd MMMM, yyyy")}
								</span> */}
						</CardTitle>
					</div>

					<div className="flex items-center gap-6">
						<Button className="p-0 m-0 bg-transparent max-sm:hidden">
							<ChatIconSVGComponent className="w-6 h-8 fill-hub-black max-sm:fill-white" />
						</Button>

						<Button className="p-0 m-0 bg-transparent max-sm:p-2 max-sm:rounded-lg max-sm:h-10 max-sm:bg-white/10">
							<NotificationIconSVGComponent className="w-6 h-8 fill-hub-black max-sm:fill-white" />
						</Button>
					</div>
				</div>
			</CardHeader>

			<Separator className="w-full border-hub-[#D4DFD5] bg-hub-[#D4DFD5] border-[1px]" />

			<CardContent className="grid grid-cols-6 grid-rows-[176px_144px_340px] gap-8 p-6 m-0 border-0 max-sm:flex max-sm:flex-col max-sm:gap-6">
				{/* Shortcut Tab Section*/}
				<HomeShortcutTab
					className="col-span-4"
					role={session?.profile?.type ?? "patient"}
				/>

				{/* New Invoice Notification Section*/}
				<div className="h-full w-full p-4 flex flex-col col-span-4 gap-4 text-sm justify-center bg-hub-purple/10 hover:shadow-md rounded-lg text-hub-purple max-sm:h-display-card-h">
					<h2 className="flex justify-between items-center">
						<span className="text-base font-semibold">
							New Invoice!
						</span>
						<XCloseIconSVGComponent />
					</h2>
					<p className="text-sm font-normal">
						You have received a new invoice for your medication
						order from [Pharmacy Name].
					</p>
					<Button className="h-[36px] w-[89px] self-end text-xs bg-hub-purple/10 text-hub-purple font-medium">
						View Details
					</Button>
				</div>

				{/* Upcoming Appointments Section*/}
				<section
					className="h-full w-full flex flex-col items-start gap-4 col-span-2 col-start-5 row-span-full p-4 bg-hub-grey rounded-lg max-sm:bg-transparent max-sm:p-0"
					title="Upcoming Appointments"
				>
					<div className="w-full flex text-base font-semibold justify-between items-center text-hub-black max-sm:text-sm">
						<h1>Recently Contacted Providers</h1>

						<Button className="bg-transparent p-0 h-4 w-4">
							<TailedArrowRightIconSVGComponent className="hidden max-sm:block" />
						</Button>
					</div>

					<Separator className="w-full border-hub-[#D4DFD5] bg-hub-[#D4DFD5] border-[1px] max-sm:hidden" />

					<div className="h-full w-full overflow-y-scroll max-sm:bg-transparent max-sm:w-full max-sm:h-fit max-sm:overflow-y-hidden max-sm:overflow-x-scroll">
						<div className="flex flex-col gap-4 w-full max-sm:inline-flex max-sm:flex-row">
							{appointmentData.map((appointment) => (
								<AppointmentCard
									key={appointment.id}
									data={appointment}
								/>
							))}{" "}
						</div>
					</div>
				</section>

				{/* Recently Contacted Providers Section*/}
				<section className="h-full w-full flex flex-col items-start gap-4 col-span-2 bg-hub-grey p-4 rounded-lg max-sm:p-0 max-sm:bg-transparent max-sm:w-full max-sm:h-fit">
					<div className="w-full flex text-base font-semibold justify-between items-center text-hub-black max-sm:text-sm">
						<h1>Recently Contacted Providers</h1>

						<Button className="bg-transparent p-0 h-4 w-4">
							<TailedArrowRightIconSVGComponent className="hidden max-sm:block" />
						</Button>
					</div>

					<Separator className="w-full border-hub-[#D4DFD5] bg-hub-[#D4DFD5] border-[1px] max-sm:hidden" />

					<div className="w-full overflow-y-scroll max-sm:overflow-y-hidden max-sm:overflow-x-scroll">
						<div className="h-fit flex flex-col gap-4 max-sm:inline-flex max-sm:flex-row">
							{recentlyContactedProviders.map((provider, i) => (
								<ProvidersMiniCard
									key={provider.name + i}
									provider={provider}
								/>
							))}
						</div>
					</div>
				</section>

				{/* Medications Section*/}
				<section className="h-full w-full flex flex-col items-start gap-4 col-span-2 bg-hub-grey p-4 rounded-lg max-sm:p-0 max-sm:bg-transparent max-sm:w-full max-sm:h-fit">
					<div className="w-full flex text-base font-semibold justify-between items-center text-hub-black max-sm:text-sm">
						<h1>Medications</h1>

						<Button className="bg-transparent p-0 h-4 w-4">
							<TailedArrowRightIconSVGComponent className="hidden max-sm:block" />
						</Button>
					</div>

					<Separator className="w-full border-hub-[#D4DFD5] bg-hub-[#D4DFD5] border-[1px] max-sm:hidden" />

					<div className="w-full overflow-y-scroll max-sm:overflow-y-hidden max-sm:overflow-x-scroll">
						<div className="h-fit flex flex-col gap-4 max-sm:inline-flex max-sm:flex-row">
							{medications.map((medication) => (
								<MedicationMiniCard
									key={medication.planId}
									medication={medication}
								/>
							))}
						</div>
					</div>
				</section>
			</CardContent>
		</Card>
	);
};

export default HomeView;
