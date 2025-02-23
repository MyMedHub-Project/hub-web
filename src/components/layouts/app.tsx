import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => (
	<main className="h-dvh w-dvw relative">{children}</main>
);

export const Row: FC<HTMLAttributes<HTMLDivElement>> = ({ ...rest }) => (
	<div {...rest} className={cn("flex gap-4", rest.className)} />
);
export const Column: FC<HTMLAttributes<HTMLDivElement>> = ({ ...rest }) => (
	<div {...rest} className={cn("flex flex-col gap-4", rest.className)} />
);
