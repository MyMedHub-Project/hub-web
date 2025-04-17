import { Button } from "@/components/button";
import { Spinner } from "@/components/icons";
import { BtnStatus } from "@/types/types";

interface FormSubmitButtonProps {
	loadingState: BtnStatus;
	label: string;
}

export const FormSubmitButton = ({
	label,
	loadingState
}: FormSubmitButtonProps) => (
	<Button
		disabled={loadingState === "disabled"}
		className="max-sm:text-sm max-sm:h-12 w-full gap-x-2 bg-hub-green hover:bg-hub-green/95 disabled:bg-hub-green/90 disabled:text-secondary h-12"
		type="submit"
	>
		{label}
		{loadingState === "loading" ? <Spinner className="size-4" /> : null}
	</Button>
);
