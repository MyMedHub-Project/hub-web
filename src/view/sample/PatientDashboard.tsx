"use client";

import React from "react";
import { format } from "date-fns";
import { X, MessageCircle, ChevronRight } from "lucide-react";

interface AppointmentProps {
	name: string;
	description: string;
	date: string;
	time: string;
	onReschedule?: () => void;
	onCancel?: () => void;
}

interface MedicationProps {
	name: string;
	dose: string;
	time: string;
}

const Appointment: React.FC<AppointmentProps> = ({
	date,
	description,
	name,
	onCancel,
	onReschedule,
	time
}) => (
	<div className="flex flex-col gap-4 mb-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
					<img src="/avatar.png" alt={name} className="w-6 h-6" />
				</div>
				<span className="font-semibold">{name}</span>
			</div>
			<button className="text-blue-500">
				<MessageCircle size={18} />
			</button>
		</div>
		<div>
			<p className="text-sm font-medium">{description}</p>
			<p className="text-xs text-gray-500">
				{date} - {time}
			</p>
		</div>
		<div className="flex gap-2">
			<button
				onClick={onReschedule}
				className="flex-1 bg-green-50 text-green-600 py-2 px-4 rounded-lg text-sm font-medium"
			>
				Reschedule
			</button>
			<button
				onClick={onCancel}
				className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg text-sm font-medium"
			>
				Cancel
			</button>
		</div>
	</div>
);

const Medication: React.FC<MedicationProps> = ({ dose, name, time }) => (
	<div className="mb-4">
		<h3 className="text-sm font-medium text-purple-600 mb-1">{name}</h3>
		<p className="text-xs font-medium">Take {dose}</p>
		<div className="flex items-center mt-2">
			<span className="inline-flex items-center bg-amber-100 text-amber-600 px-2 py-1 rounded text-xs">
				<span className="mr-1">•</span> Today at {time}
			</span>
			<button className="ml-auto text-blue-600 text-xs">
				View Plan <ChevronRight size={12} className="inline" />
			</button>
		</div>
	</div>
);

const ShortcutCard: React.FC<{ icon: React.ReactNode; title: string }> = ({
	icon,
	title
}) => (
	<div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm">
		<div className="text-blue-600 mb-2">{icon}</div>
		<span className="text-xs font-medium">{title}</span>
	</div>
);

const PatientDashboard: React.FC = () => {
	const today = format(new Date(), "dd MMM, yyyy");

	return (
		<div className="max-w-5xl mx-auto p-4">
			{/* Desktop Header */}
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-xl font-semibold text-green-700">
						Hello Anderson.
					</h1>
					<p className="text-sm text-green-600">
						How are you feeling today?
					</p>
					<p className="text-xs text-green-600">{today}</p>
				</div>
				<div className="flex items-center">
					<div className="relative mr-4">
						<span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
						<button className="text-gray-500">
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
									fill="currentColor"
								/>
							</svg>
						</button>
					</div>
					<div className="relative mr-4">
						<span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
						<button className="text-gray-500">
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
									fill="currentColor"
								/>
							</svg>
						</button>
					</div>
					<div className="flex items-center">
						<div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
						<div>
							<p className="text-xs font-medium">
								Samuel Anderson
							</p>
							<p className="text-xs text-gray-500">Patient</p>
						</div>
					</div>
				</div>
			</div>

			{/* Shortcuts Grid */}
			<div className="grid grid-cols-4 gap-4 mb-6">
				<ShortcutCard
					icon={
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M19 4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V6H19V20ZM17 8H7V10H17V8ZM17 12H7V14H17V12ZM14 16H7V18H14V16Z"
								fill="currentColor"
							/>
						</svg>
					}
					title="Book Appointment"
				/>
				<ShortcutCard
					icon={
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
								fill="currentColor"
							/>
						</svg>
					}
					title="My Conditions"
				/>
				<ShortcutCard
					icon={
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM11 17H13V13H17V11H13V7H11V11H7V13H11V17Z"
								fill="currentColor"
							/>
						</svg>
					}
					title="Lab Order"
				/>
				<ShortcutCard
					icon={
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z"
								fill="currentColor"
							/>
						</svg>
					}
					title="Test Results"
				/>
			</div>

			{/* Invoice Notification */}
			<div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
				<div className="flex justify-between items-center mb-2">
					<h2 className="font-semibold text-base">New Invoice!</h2>
					<button>
						<X size={18} />
					</button>
				</div>
				<p className="text-sm mb-4">
					You have received a new invoice for your medication order
					from [Pharmacy Name].
				</p>
				<div className="flex justify-end">
					<button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-md text-sm">
						View
					</button>
				</div>
			</div>

			{/* Appointments Section */}
			<div className="mb-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="font-semibold text-lg">
						Upcoming Appointments
					</h2>
					<button className="lg:hidden">
						<ChevronRight size={18} />
					</button>
				</div>
				<div className="bg-gray-50 p-4 rounded-lg">
					<Appointment
						name="Samuel Anderson"
						description="Follow-up on test results"
						date="Wednesday, July 12"
						time="3:00 PM"
					/>
					<Appointment
						name="Samuel Anderson"
						description="Follow-up on test results"
						date="Wednesday, July 12"
						time="3:00 PM"
					/>
					<Appointment
						name="Samuel Anderson"
						description="Follow-up on test results"
						date="Wednesday, July 12"
						time="3:00 PM"
					/>
					<Appointment
						name="Samuel Anderson"
						description="Follow-up on test results"
						date="Wednesday, July 12"
						time="3:00 PM"
					/>
				</div>
			</div>

			{/* Doctors Section */}
			<div className="mb-6">
				<h2 className="font-semibold text-lg mb-4">Doctors</h2>
				<div className="space-y-4">
					{[1, 2, 3, 4].map((item) => (
						<div
							key={item}
							className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
						>
							<div className="flex items-center">
								<div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
								<span className="font-medium">
									Dr. Dolor Marichi
								</span>
							</div>
							<ChevronRight size={18} className="text-gray-400" />
						</div>
					))}
				</div>
			</div>

			{/* Medications Section */}
			<div>
				<h2 className="font-semibold text-lg mb-4">Medications</h2>
				<div className="space-y-4">
					<div className="bg-white p-4 rounded-lg shadow-sm">
						<Medication
							name="Tuberculosis Treatment"
							dose="1 tablet of Metformin"
							time="10:00PM"
						/>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-sm">
						<Medication
							name="Tuberculosis Treatment"
							dose="1 tablet of Metformin"
							time="10:00PM"
						/>
					</div>
				</div>
			</div>

			{/* Mobile View */}
			<div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4">
				<div className="flex justify-around">
					<button className="flex flex-col items-center text-blue-600">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
								fill="currentColor"
							/>
						</svg>
						<span className="text-xs mt-1">Home</span>
					</button>
					<button className="flex flex-col items-center text-gray-400">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M19 4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V6H19V20ZM17 8H7V10H17V8ZM17 12H7V14H17V12ZM14 16H7V18H14V16Z"
								fill="currentColor"
							/>
						</svg>
						<span className="text-xs mt-1">Records</span>
					</button>
					<button className="flex flex-col items-center text-gray-400">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M17 12H12V17H17V12ZM16 1V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H18V1H16ZM19 19H5V8H19V19Z"
								fill="currentColor"
							/>
						</svg>
						<span className="text-xs mt-1">Calendar</span>
					</button>
					<button className="flex flex-col items-center text-gray-400">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
								fill="currentColor"
							/>
						</svg>
						<span className="text-xs mt-1">Profile</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default PatientDashboard;
