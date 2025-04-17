"use client";

import { useState } from "react";
import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import LeaveReviewDialog from "./leave-review";

const reveiwData = {
	name: "John Doe",
	reting: 4,
	comment:
		"Dr. Johnson is amazing with children. She always makes my kids feel comfortable and cared for."
};

const RCard = ({ data }: { data: any }) => (
	<div className="py-3 px-4 rounded bg-hub-grey">
		<div className="mb-2">
			<h3 className="text-sm font-semibold mb-1">{data.name}</h3>
			<div className="flex space-x-1.5">
				{[1, 2, 3, 4].map((i) => (
					<Star
						key={i}
						className="size-4 fill-hub-orange text-hub-orange"
					/>
				))}
				<Star className="size-4 text-hub-orange" />
			</div>
		</div>
		<p className="text-sm pt-2 border-t">{data.comment}</p>
	</div>
);

const ViewReviewDialog = () => {
	const [reviews] = useState(Array(5).fill(reveiwData));

	return (
		<DialogContent className="sm:max-w-[425px] bg-white text-hub-black">
			<DialogHeader>
				<DialogTitle className="text-center mb-2">Reviews</DialogTitle>
				<Dialog>
					<DialogTrigger asChild>
						<Button
							className="w-full mt-3 bg-hub-green-light hover:bg-hub-green/30 text-hub-green font-medium"
							variant="ghost"
						>
							<Plus className="size-4 mr-2" />
							Leave a Review
						</Button>
					</DialogTrigger>

					<LeaveReviewDialog />
				</Dialog>
			</DialogHeader>
			<div className="space-y-2 max-h-[350px] overflow-auto custom-scrollbar">
				{reviews.map((review, i) => (
					<RCard key={i} data={review} />
				))}
			</div>
		</DialogContent>
	);
};

export default ViewReviewDialog;
