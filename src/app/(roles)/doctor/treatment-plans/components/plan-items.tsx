import { ChevronRight, User } from "lucide-react";
import { Button } from "@/components/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const PlanItem = ({ data }: { data: any }) => (
	<Card className="bg-hub-grey px-4 py-3 space-y-2 rounded-md">
		<CardHeader className="p-0 flex flex-row items-center justify-between">
			<h3 className="font-semibold">{data.treatment} Treatment</h3>
			<Button className="bg-hub-grey200 size-fit p-1.5 mt-0!">
				<ChevronRight className="size-4 text-hub-black" />
			</Button>
		</CardHeader>
		<CardContent className="p-0 flex items-center gap-x-2">
			<div className="size-7 flex items-center justify-center rounded-full border-2 border-hub-grey200">
				<User className="size-[80%]" />
			</div>
			<p className="text-sm">{data.name}</p>
		</CardContent>
	</Card>
);

export default PlanItem;
