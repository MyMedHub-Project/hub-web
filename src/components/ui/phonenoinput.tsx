import React from "react";
import { Input } from "../input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "./select";

const PhoneNoInput = () => (
	<div className="flex">
		<Select defaultValue="NG">
			<SelectTrigger className="w-[80px] border-r-0 rounded-r-none text-xs">
				<SelectValue placeholder="Country" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="US">US +1</SelectItem>
				<SelectItem value="GB">GB +44</SelectItem>
				<SelectItem value="NG">NG +234</SelectItem>
			</SelectContent>
		</Select>
		<Input
			type="tel"
			placeholder="Phone number"
			className="flex-grow rounded-l-none"
		/>
	</div>
);

export default PhoneNoInput;
