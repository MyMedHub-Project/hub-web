import dynamic from "next/dynamic";
import { Suspense } from "react";
import HeroCardsWrapper from "./HeroCardsWrapper";

// These components can stay in the server component with ssr: true
const NotificationCard = dynamic(
	() => import("@/components/widgets/notification-card"),
	{
		loading: () => (
			<div className="w-full h-[120px] bg-gray-100 animate-pulse rounded-lg"></div>
		),
		ssr: true
	}
);

const PatientsAndTreatments = dynamic(
	() => import("@/components/widgets/patient-treatments"),
	{
		loading: () => (
			<div className="w-full h-[300px] bg-gray-100 animate-pulse rounded-lg"></div>
		),
		ssr: true
	}
);

const UpcomingAppointments = dynamic(
	() => import("@/components/widgets/appointments"),
	{
		loading: () => (
			<div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
		),
		ssr: true
	}
);

const PatientPage = () => (
	<div className="p-4 flex gap-4 flex-col md:flex-row">
		<div className="w-full lg:w-2/3 px-5 space-y-7">
			{/* ACTION CARDS */}
			{/* <Suspense
				fallback={
					<div className="w-full h-[150px] bg-gray-100 animate-pulse rounded-lg"></div>
				}
			>
				<HeroCardsWrapper />
			</Suspense> */}

			{/* <Suspense
				fallback={
					<div className="w-full h-[120px] bg-gray-100 animate-pulse rounded-lg"></div>
				}
			>
				<NotificationCard />
			</Suspense> */}

			{/* <Suspense
				fallback={
					<div className="w-full h-[300px] bg-gray-100 animate-pulse rounded-lg"></div>
				}
			>
				<PatientsAndTreatments />
			</Suspense> */}
		</div>
		{/* <div className="w-full lg:w-1/3 px-5">
			<Suspense
				fallback={
					<div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
				}
			>
				<UpcomingAppointments />
			</Suspense>
		</div> */}
	</div>
);
export default PatientPage;
