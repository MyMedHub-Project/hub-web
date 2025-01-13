import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Share } from "lucide-react";

const Edit = () => {
	return (
		<Card className="bg-tansparent shadow-none border-none grid grid-cols-[1fr,auto] gap-x-5">
			<Button className="bg-hubGrey  text-hubBlack hover:bg-inherit">
				<Pencil /> Edit profile
			</Button>
			<Button className="bg-hubGrey  text-hubBlack hover:bg-inherit">
				<Share />
			</Button>
		</Card>
	);
};

export default Edit;
