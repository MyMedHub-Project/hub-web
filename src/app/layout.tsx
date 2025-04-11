import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { AppLayout } from "@/components/layouts/app";
import { Toaster } from "@/components/toast/toaster";
import { metadata } from "@/config/metadata";
import { viewport } from "@/config/viewport";
import { getServerSession } from "@/hooks/getServerSession";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
	preload: true
});

export { metadata, viewport };

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { session } = await getServerSession();

	return (
		<html lang="en">
			<body className={cn("bg-white style-scrollbar", inter.className)}>
				<SessionProvider session={session}>
					<AppLayout>{children}</AppLayout>
				</SessionProvider>
				<Toaster />
			</body>
		</html>
	);
}
