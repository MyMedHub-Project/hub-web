import React from "react";

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-[80svh] w-full overflow-x-hidden flex justify-center items-center">
			{children}
		</div>
	);
}
