import { Button } from "@/components/ui/button";

const Days = () => {
	return (
		<div>
			<p className="mb-5">Set your available days</p>
			<div className="flex justify-evenly">
				<Button className="rounded-full size-11 bg-hubGrey text-hubBlack hover:bg-hubGrey200">
					Sat
				</Button>
				<Button className="rounded-full size-11 bg-hubGreen text-hubGrey hover:bg-hubGreen/90">
					Mon
				</Button>
				<Button className="rounded-full size-11 bg-hubGreen text-hubGrey hover:bg-hubGreen/90">
					Tue
				</Button>
				<Button className="rounded-full size-11 bg-hubGreen text-hubGrey hover:bg-hubGreen/90">
					Wed
				</Button>
				<Button className="rounded-full size-11 bg-hubGreen text-hubGrey hover:bg-hubGreen/90">
					Thur
				</Button>
				<Button className="rounded-full size-11 bg-hubGreen text-hubGrey hover:bg-hubGreen/90">
					Fri
				</Button>
				<Button className="rounded-full size-11 bg-hubGrey text-hubBlack hover:bg-hubGrey200">
					Sun
				</Button>
			</div>
		</div>
	);
};

export default Days;
