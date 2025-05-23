import { Button } from "@/components/button";
import { Spinner } from "@/components/icons";
import { BtnStatus } from "@/types/types";

interface SubmitButtonProps {
	loadingState: BtnStatus;
	onClick: (e: any) => void;
	label: string;
}

export const SubmitButton = ({
	label,
	loadingState,
	onClick
}: SubmitButtonProps) => (
	<Button
		className="max-sm:bottom-0 w-full gap-x-2 bg-hub-green hover:bg-hub-green/95 disabled:bg-hub-green/90 disabled:text-secondary h-12"
		disabled={loadingState === "disabled"}
		onClick={onClick}
	>
		{label}
		{loadingState === "loading" ? <Spinner className="size-4" /> : null}
	</Button>
);
