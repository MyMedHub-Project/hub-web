import { Star } from "lucide-react";
import { Label } from "@/components/form";
import { Button } from "@/components/ui/button";
import {
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const LeaveReviewDialog = () => (
	<DialogContent className="sm:max-w-[425px] bg-white text-hub-black">
		<DialogHeader>
			<DialogTitle className="text-center">
				Rate your experience with Dr. Dolor Manchi
			</DialogTitle>
			<div className="flex gap-x-2 mt-2.5! mx-auto">
				{[1, 2, 3, 4].map((i) => (
					<Star
						key={i}
						className="size-6 fill-hub-orange text-hub-orange"
					/>
				))}
				<Star className="size-6 text-hub-orange" />
			</div>
		</DialogHeader>
		<div className="grid gap-4 py-4">
			<Label>Leave a comment</Label>
			<Textarea className="resize-none px-3 h-16 bg-hub-grey text-hub-black border-0 border-b-2 border-b-hub-grey200 focus:border-0 focus:border-b-2 focus:border-b-hub-green outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg" />
		</div>
		<DialogFooter>
			<Button className="bg-hub-green w-full">Submit</Button>
		</DialogFooter>
	</DialogContent>
);

export default LeaveReviewDialog;
