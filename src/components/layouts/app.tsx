import { FC, HTMLAttributes, PropsWithChildren, memo } from "react";
import { cn } from "@/lib/utils";

export const AppLayout: FC<PropsWithChildren> = memo(({ children }) => (
	<main className="h-dvh w-dvw relative flex flex-col">{children}</main>
));
AppLayout.displayName = "AppLayout";

export const Row: FC<HTMLAttributes<HTMLDivElement>> = memo(({ ...rest }) => (
	<div {...rest} className={cn("flex gap-4", rest.className)} />
));
Row.displayName = "Row";

export const Column: FC<HTMLAttributes<HTMLDivElement>> = memo(
	({ ...rest }) => (
		<div {...rest} className={cn("flex flex-col gap-4", rest.className)} />
	)
);
Column.displayName = "Column";
