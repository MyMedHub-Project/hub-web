"use client";

import { useState } from "react";
import { HeartPulse, Plus, Search } from "lucide-react";
import { Input } from "@/components/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PlanItem from "./plan-items";
import AddPlanDialog from "./add-plan-dialog";

const treatmentsPlan = {
	name: "Samuel Anderson",
	treatment: "Tuberculosis"
};

const ActionSection = () => {
	const [
		plans
		// setPlans
	] = useState(Array(3).fill(treatmentsPlan));

	return (
		<Card className="w-[350px] px-4 flex flex-col">
			<CardHeader className="px-0 pb-3 space-y-3">
				<div className="flex items-center justify-between">
					<h2 className="font-bold">Treatment Plans</h2>
					<Dialog defaultOpen={false}>
						<DialogTrigger asChild className=" mx-auto block">
							<Button className="bg-hub-green size-fit p-2 m-0!">
								<Plus className="size-4" />
							</Button>
						</DialogTrigger>
						<AddPlanDialog />
					</Dialog>
				</div>
				<div className="relative h-10">
					<Search className="absolute size-5 left-2.5 top-1/2 -translate-y-1/2" />
					<Input className="size-full py-0 pl-7 bg-hub-grey text-hub-black border-0 border-b-2 border-b-hub-grey200 focus:border-0 focus:border-b-2 focus:border-b-hub-green outline-0 focus-visible:ring-0 focus:outline-0 shadow-none rounded-lg" />
				</div>
			</CardHeader>

			<CardContent className="flex-1 px-0">
				{plans.length < 1 ? (
					<div className="h-full flex flex-col items-center justify-center gap-y-2">
						<HeartPulse className="size-8" />
						<h3 className="">No treatment Plans</h3>
						<p className="text-sm text-center">
							You haven&apos;t added any Treatment plan yet. Click
							on the &apos;+&apos; icon to add a Plan
						</p>
					</div>
				) : (
					<div className="space-y-2">
						{plans.map((plan, i) => (
							<PlanItem key={i} data={plan} />
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default ActionSection;
