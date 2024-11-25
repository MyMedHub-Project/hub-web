import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React from "react";

interface StatusBadgeProps {
	status: "pending" | "processing" | "completed" | "declined";
}

export function StatusBadge({ status }: StatusBadgeProps) {
	return (
		<Badge
			variant="secondary"
			className={cn(
				"capitalize",
				status === "pending" && "bg-muted text-muted-foreground",
				status === "processing" &&
					"bg-hubOrange text-orange-700 dark:bg-orange-900 dark:text-orange-400",
				status === "completed" && "bg-hubGreenLight text-hubGreen",
				status === "declined" && "bg-red-100 text-hubRed"
			)}
		>
			{status}
		</Badge>
	);
}
