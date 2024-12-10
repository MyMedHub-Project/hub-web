"use client";

import { createContext, useState } from "react";

interface AvailableDaysState {
	mon: boolean;
	tue: boolean;
	wed: boolean;
	thur: boolean;
	fri: boolean;
	sat: boolean;
	sun: boolean;
}

interface ScheduleContextType {
	availableDays: AvailableDaysState;
	setAvailableDays: React.Dispatch<React.SetStateAction<AvailableDaysState>>;
}

const ScheduleContext = createContext<ScheduleContextType>(
	{} as ScheduleContextType
);

export const ScheduleProvider = ({ children }: { children: any }) => {
	const [availableDays, setAvailableDays] = useState({
		sun: false,
		mon: false,
		tue: false,
		wed: false,
		thur: false,
		fri: false,
		sat: false
	});

	return (
		<ScheduleContext.Provider value={{ availableDays, setAvailableDays }}>
			{children}
		</ScheduleContext.Provider>
	);
};

export default ScheduleContext;
