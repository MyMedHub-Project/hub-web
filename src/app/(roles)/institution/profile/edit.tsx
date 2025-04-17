import { Pencil, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Edit = () => (
	<Card className="bg-tansparent shadow-none border-none grid grid-cols-[1fr_auto] gap-x-5">
		<Button className="bg-hub-grey  text-hub-black hover:bg-inherit">
			<Pencil /> Edit profile
		</Button>
		<Button className="bg-hub-grey  text-hub-black hover:bg-inherit">
			<Share />
		</Button>
	</Card>
);

export default Edit;
