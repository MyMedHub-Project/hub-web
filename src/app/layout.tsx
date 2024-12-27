import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layouts/app";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/toast/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter"
});

export const viewport: Viewport = {
	initialScale: 1,
	maximumScale: 1,
	themeColor: "#0F0F0F",
	userScalable: false,
	width: "device-width"
};

export const metadata: Metadata = {
	applicationName: "MyMedHub - App",
	authors: [{ name: "Nelson Michael", url: "https://github.com/nelsonmic" }],
	icons: {
		apple: [{ sizes: "180x180", url: "/apple-touch-icon.png" }],
		icon: [
			{ sizes: "16x16", url: "/favicon-16x16.png" },
			{ sizes: "32x32", url: "/favicon-32x32.png" }
		],
		other: [
			{
				color: "#5bbad5",
				rel: "mask-icon",
				url: "/safari-pinned-tab.svg"
			}
		]
	},
	// manifest: "/site.webmanifest",
	publisher: "Nelson Michael",
	referrer: "origin-when-cross-origin",
	title: "Dialme",
	description: "" //TODO: add description
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	// logDev("App is initializing in development mode", "🚀");
	// logDev("Construction in progress...", "🚧🏗️")

	return (
		<html lang="en">
			<body className={`bg-white cn("style-scrollbar", inter.className)`}>
				<SessionProvider session={session}>
					<AppLayout>{children}</AppLayout>
				</SessionProvider>
				<Toaster />
			</body>
		</html>
	);
}
