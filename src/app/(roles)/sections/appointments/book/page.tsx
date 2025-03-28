import BookingSection from "./components/booking-section";
import DoctorProfileSection from "./components/doctor-profile-section";

const BookAppointment = () => (
	<div className="w-full h-full flex flex-col lg:flex-row gap-4 text-hubBlack">
		<div className="bg-white/50 border rounded-md p-5 flex flex-1 flex-col lg:w-2/3">
			<DoctorProfileSection />
		</div>
		<div className="flex flex-col lg:w-1/3">
			<BookingSection />
		</div>
	</div>
);

export default BookAppointment;
