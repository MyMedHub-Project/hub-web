"use client";
import { Button } from "@/components/button";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
	const { toast } = useToast();
	const { data: session } = useSession();

	useEffect(() => {
		console.log(session);
	}, []);
	return (
		<div className="bg-white grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<Button
				onClick={() => {
					toast({
						title: "MyMedHub",
						description: "Toast Test"
					});
				}}
			>
				My Medhub Web
			</Button>
		</div>
	);
}
