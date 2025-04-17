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
				"bg-hub-orange text-orange-700 dark:bg-orange-900 dark:text-orange-400",
			status === "completed" && "bg-hub-green-light text-hub-green",
			status === "declined" && "bg-red-100 text-hub-red"
		)}
	>
		{status}
	</Badge>
);
