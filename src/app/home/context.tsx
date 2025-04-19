"use client";

import { createContext, useState } from "react";
import { NavState } from "@/types/types";

export type INavContext = {
	state: NavState;
	setState: (state: NavState) => void;
};

export const NavContext = createContext<INavContext>({
	state: "closed",
	setState: () => {}
});

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, setState] = useState<NavState>("closed");

	return (
		<NavContext.Provider value={{ state, setState }}>
			{children}
		</NavContext.Provider>
	);
};
