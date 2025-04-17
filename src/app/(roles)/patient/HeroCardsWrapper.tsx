"use client";

import dynamic from "next/dynamic";

// Dynamically import HeroCards with ssr: false - this is now allowed since we're in a client component
const HeroCards = dynamic(() => import("@/components/ui/hero-cards"), {
	loading: () => (
		<div className="w-full h-[150px] bg-gray-100 animate-pulse rounded-lg"></div>
	),
	ssr: false // This is now valid in a client component
});

export default function HeroCardsWrapper() {
	return <HeroCards />;
}
