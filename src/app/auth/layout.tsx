import React from "react";

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="grow w-full overflow-x-hidden flex flex-col items-center justify-center max-sm:justify-start">
			{children}
		</div>
	);
}
