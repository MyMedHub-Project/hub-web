import { Star, Plus, UserPen, ArrowRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import LeaveReviewDialog from "./action-modals/leave-review";

const Review = () => (
	<Card className="bg-hub-grey divide-y-2">
		<CardHeader className="flex flex-row justify-between items-center">
			<div className="flex items-center gap-x-1">
				<UserPen className="size-8 text-hub-purple" />
				<div>
					<h2 className="">Reviews</h2>
					<p className="text-xs text-muted-foreground">
						Over 100 reviews
					</p>
				</div>
			</div>
			<Button variant="ghost" size="icon" className="">
				<ArrowRight className="size-5" />
			</Button>
		</CardHeader>

		<div className="mb-4 px-4 border-0 shadow-xs">
			<div className="pt-4">
				<h3 className="mb-1">John Doe</h3>
				<div className="flex mb-1">
					{[1, 2, 3, 4].map((i) => (
						<Star
							key={i}
							className="size-4 fill-hub-orange text-hub-orange"
						/>
					))}
					<Star className="size-4 text-hub-orange" />
				</div>
				<p className="text-sm">
					Dr. Dolor provided excellent care and was very thorough in
					her explanations. Highly recommend!
				</p>
			</div>

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
		</div>
	</Card>
);

export default Review;
