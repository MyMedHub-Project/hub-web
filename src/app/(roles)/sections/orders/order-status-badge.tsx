import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
	status: "pending" | "processing" | "completed" | "declined";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
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
