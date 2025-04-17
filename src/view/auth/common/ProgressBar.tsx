import { memo } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
	isVerified: boolean;
}

const ProgressBar = ({ isVerified }: ProgressBarProps) => (
	<div className="w-full flex items-center gap-x-2 py-3">
		<div
			className={cn(
				"flex-1 h-1 bg-hub-grey relative overflow-hidden before:absolute before:w-full before:left-0 before:h-1 before:bg-hub-green before:transition before:duration-150",
				!isVerified && "before:-translate-x-1/2",
				isVerified && "before:-translate-x-2/2"
			)}
		></div>

		<p className="text-xs rounded-full border border-hub-green size-7 flex items-center justify-center">
			{!isVerified ? 1 : null}
			{isVerified ? 2 : null}
			/2
		</p>
	</div>
);

export default memo(ProgressBar);
