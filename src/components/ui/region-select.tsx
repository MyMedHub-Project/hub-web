import countryRegionData from "country-region-data/dist/data-umd";
import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { filterRegions } from "./helpers";

//@ts-ignore

export interface Region {
	name: string;
	shortCode: string;
}

export interface CountryRegion {
	countryName: string;
	countryShortCode: string;
	regions: Region[];
}

interface RegionSelectProps {
	countryCode: string;
	priorityOptions?: string[];
	whitelist?: string[];
	blacklist?: string[];
	onChange?: (value: string) => void;
	className?: string;
	placeholder?: string;
}

function RegionSelect({
	blacklist = [],
	className,
	countryCode,
	onChange = () => {},
	placeholder = "Region",
	priorityOptions = [],
	whitelist = []
}: RegionSelectProps) {
	const [regions, setRegions] = useState<Region[]>([]);

	useEffect(() => {
		const regions = countryRegionData.find(
			(country: CountryRegion) => country.countryShortCode === countryCode
		);

		if (regions) {
			setRegions(
				filterRegions(
					regions.regions,
					priorityOptions,
					whitelist,
					blacklist
				)
			);
		}
	}, [countryCode, blacklist, priorityOptions, , whitelist]);

	return (
		<Select
			onValueChange={(value: string) => {
				onChange(value);
			}}
		>
			<SelectTrigger className={className}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{regions.map(({ name, shortCode }) => (
					<SelectItem key={shortCode} value={name}>
						{name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export default RegionSelect;
