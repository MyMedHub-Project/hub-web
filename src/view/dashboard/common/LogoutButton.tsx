import { memo, useCallback } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose,
	DialogHeader,
	DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { LogoutIconSVGComponent } from "@/components/icons";

export const LogoutButton = memo(() => {
	const handleLogout = useCallback(() => signOut(), []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="text-hub-red bg-hub-red/10 p-2 rounded-lg flex items-center gap-2 font-normal max-sm:text-xs max-sm:m-0"
				>
					<LogoutIconSVGComponent className="fill-hub-red h-6 w-6 max-sm:h-4 max-sm:w-4 m-0 p-0" />
					<span>Log Out</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="bg-[#FBFCFC] max-w-[400px] px-5 py-10">
				<DialogHeader className="text-center text-hub-black flex flex-col gap-2">
					<DialogTitle className="text-center text-xl">
						Log Out
					</DialogTitle>
					<DialogDescription className="text-center text-md text-hub-black">
						Are you sure you want to logout?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="gap-x-3 mt-2">
					<DialogClose asChild>
						<Button className="bg-hub-green/10 hover:bg-hub-green/30 text-hub-green w-1/2 h-10 py-4">
							Cancel
						</Button>
					</DialogClose>
					<Button
						onClick={handleLogout}
						className="bg-hub-red hover:bg-hub-red text-hub-grey w-1/2 h-10 py-4"
					>
						Log Out
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
});
