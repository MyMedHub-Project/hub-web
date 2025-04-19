"use client";

import { useNav } from "@/hooks/useNav";
import NavMenu from "@/view/dashboard/common/NavMenu";

interface HomeLayoutProps {
	children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
	const { setState, state } = useNav();

	return (
		<div className="flex-grow w-full overflow-x-hidden flex flex-col items-center">
			<NavMenu state={state} onStateChange={setState} />
			{children}
		</div>
	);
}
