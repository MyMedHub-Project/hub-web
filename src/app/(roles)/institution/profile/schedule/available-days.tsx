import { Button } from "@/components/ui/button";

const Days = () => (
	<div>
		<p className="mb-5">Set your available days</p>
		<div className="flex justify-evenly">
			<Button className="rounded-full size-11 bg-hub-grey text-hub-black hover:bg-hub-grey200">
				Sat
			</Button>
			<Button className="rounded-full size-11 bg-hub-green text-hub-grey hover:bg-hub-green/90">
				Mon
			</Button>
			<Button className="rounded-full size-11 bg-hub-green text-hub-grey hover:bg-hub-green/90">
				Tue
			</Button>
			<Button className="rounded-full size-11 bg-hub-green text-hub-grey hover:bg-hub-green/90">
				Wed
			</Button>
			<Button className="rounded-full size-11 bg-hub-green text-hub-grey hover:bg-hub-green/90">
				Thur
			</Button>
			<Button className="rounded-full size-11 bg-hub-green text-hub-grey hover:bg-hub-green/90">
				Fri
			</Button>
			<Button className="rounded-full size-11 bg-hub-grey text-hub-black hover:bg-hub-grey200">
				Sun
			</Button>
		</div>
	</div>
);

export default Days;
