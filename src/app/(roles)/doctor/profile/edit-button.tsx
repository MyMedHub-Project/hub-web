import { Pencil, Share } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Routes } from "@/core/routing";

const EditButton = async () => (
	<Card className="bg-tansparent shadow-none border-none grid grid-cols-[1fr,auto] gap-x-5">
		<Link href={Routes.PROFILE.EDIT} className="w-full">
			<Button className="w-full bg-hubGrey text-hubBlack hover:bg-inherit">
				<Pencil /> Edit profile
			</Button>
		</Link>
		<Button className="bg-hubGrey text-hubBlack hover:bg-inherit">
			<Share />
		</Button>
	</Card>
);

export default EditButton;
