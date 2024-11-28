import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HourSettingActive from "./hour-setting-active";
import HourSettingInactive from "./hour-setting-inactive";

const HourSetting = () => {
	return (
		<div className="space-y-3">
			<Card className="px-5 py-3 bg-hubGrey rounded-lg flex items-center justify-between">
				<CardContent className="p-0">
					Use same hours for all days
				</CardContent>
				<Button className="relative bg-hubGrey200 p-2.5 w-[60px] block rounded-full hover:bg-hubGrey200/95">
					<span className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full size-6 bg-gray-700"></span>
				</Button>
			</Card>
			<HourSettingActive />
			<HourSettingInactive day={"Tuesday"} />
			<HourSettingInactive day={"Wednesday"} />
			<HourSettingInactive day={"Thursday"} />
			<HourSettingInactive day={"Friday"} />
		</div>
	);
};

export default HourSetting;
