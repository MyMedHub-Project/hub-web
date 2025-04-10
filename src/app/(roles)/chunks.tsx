import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Routes } from "@/core/routing";

export const ErrorFetchingProfile = () => (
	<div className="mt-20 flex items-center justify-center">
		<Card className="w-full max-w-md text-center">
			<CardContent className="py-6">
				<p className="text-lg text-hubBlack font-medium mb-4">
					There was an error fetching your profile, please try again
					later.
				</p>
				<Button
					asChild
					className="bg-hubGreen hover:bg-hubGreen/90 text-white"
				>
					<Link href={Routes.root}>Go back to dashboard</Link>
				</Button>
			</CardContent>
		</Card>
	</div>
);

export const TokenDisplay = ({ token }: { token?: string }) => (
	<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
		<Card className="bg-gray-100 border-gray-300 px-4 py-2 shadow-xs">
			<p className="text-sm font-mono text-gray-800">token-{token}</p>
		</Card>
	</div>
);
