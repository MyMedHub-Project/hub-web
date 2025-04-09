import { Button } from "@/components/ui/button";
import {
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";

const AppointmentSummaryDialog = () => (
	<DialogContent className="sm:max-w-[425px] bg-white text-hubBlack">
		<DialogHeader>
			<DialogTitle>Appointment Summary</DialogTitle>
			{/* <DialogDescription>
					Make changes to your profile here. Click save when you're
					done.
				</DialogDescription> */}
		</DialogHeader>
		<div className="bg-hubGrey p-2 space-y-2">
			<div className="divide-y space-y-2">
				<p className="text-sm text-hubBlack/60">Pharmacy Details:</p>
				<h3 className="">Follow-up on test results</h3>
			</div>
			<div>
				<span className="text-sm text-hubBlack/60">with:</span>
				<p>Dr. Dolor Manchi</p>
			</div>
			<div>
				<span className="text-sm text-hubBlack/60">Date and time</span>
				<p>Monday 15 Oct, 2024.</p>
				<p>1 PM - 2 PM.</p>
			</div>
			<div>
				<span className="text-sm text-hubBlack/60">Type</span>
				<p>Virtual Consultation.</p>
			</div>
			<div>
				<span className="text-sm text-hubBlack/60">Note</span>
				<p>
					Dorem ipsum dolor sit amet, consectetur adipiscing elit.
					Nunc vulputate libero et velit interdum, ac aliquet odio
					mattis.
				</p>
			</div>
		</div>
		<DialogFooter>
			<Button
				type="submit"
				className="bg-hubGreen w-full hover:bg-hubGreen/80"
			>
				Proceed To Payment
			</Button>
		</DialogFooter>
	</DialogContent>
);

export default AppointmentSummaryDialog;
