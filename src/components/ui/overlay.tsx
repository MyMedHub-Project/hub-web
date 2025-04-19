import { cn } from "@/lib/utils";

interface OverlayProps {
	children: React.ReactNode;
	onClick: () => void;
	isOpen: boolean;
}

export const Overlay = ({ children, isOpen, onClick }: OverlayProps) => (
	<div
		className={cn(
			"fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out max-sm:block z-30",
			isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
		)}
		onClick={onClick}
	>
		{children}
	</div>
);
