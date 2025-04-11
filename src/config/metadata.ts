import type { Metadata } from "next";

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
