import { Mic, Minimize2, Phone, User2, Video, Volume2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";

interface CallDialogPops {
	children: React.ReactNode;
	type: "video" | "voice";
}

const CallDialog = ({ children, type }: CallDialogPops) => {
	if (type) {
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="size-10 flex items-center justify-center rounded bg-hub-grey200 hover:bg-hub-green/50 cursor-pointer"
				>
					{children}
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[700px] h-[500px] bg-blue-900 flex flex-col items-center justify-center gap-y-20">
				<Button className="size-10 rounded-full flex items-center justify-center bg-hub-grey/30 absolute top-10 right-10">
					<Minimize2 className="size-8 text-primary-foreground" />
				</Button>

				<DialogHeader className="items-center">
					<div className="size-[100px] flex items-center justify-center border-4 rounded-full">
						<User2 className="size-[80%]" />
					</div>
					<DialogTitle>Dr Hendricks</DialogTitle>
					<DialogDescription className="text-primary-foreground">
						Ringing...
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="flex gap-x-5 px-8 py-4 bg-hub-grey/30 rounded-xl shadow-sm">
					<div className="flex flex-col items-center gap-y-1">
						<DialogClose asChild>
							<Button
								type="button"
								variant="secondary"
								className="size-10 bg-white rounded-full flex items-center justify-center"
							>
								<Volume2Icon className="size-8" />
							</Button>
						</DialogClose>
						<span className="text-xs">End call</span>
					</div>
					<div className="flex flex-col items-center gap-y-1">
						<DialogClose asChild>
							<Button
								type="button"
								variant="secondary"
								className="size-10 bg-white/40 rounded-full flex items-center justify-center"
							>
								<Mic className="size-8 text-primary-foreground" />
							</Button>
						</DialogClose>
						<span className="text-xs">End call</span>
					</div>
					<div className="flex flex-col items-center gap-y-1">
						<DialogClose asChild>
							<Button
								type="button"
								variant="secondary"
								className="size-10 bg-white/40 rounded-full flex items-center justify-center"
							>
								<Video className="size-8 text-primary-foreground" />
							</Button>
						</DialogClose>
						<span className="text-xs">End call</span>
					</div>
					<div className="flex flex-col items-center gap-y-1">
						<DialogClose asChild>
							<Button
								type="button"
								variant="secondary"
								className="size-10 bg-hub-red rounded-full flex items-center justify-center"
							>
								<Phone className="size-8 fill-white text-white" />
							</Button>
						</DialogClose>
						<span className="text-xs">End call</span>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CallDialog;
