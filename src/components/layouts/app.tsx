import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, PropsWithChildren } from "react"
import { DevMode } from "../devMode";

export const AppLayout:FC<PropsWithChildren> = ({ children }) => {
      return (
            
                  <main className="h-dvh w-dvw relative">
                        <DevMode where="Main Layout" />
                        {children}
                  </main>
      )
}

export const Row: FC<HTMLAttributes<HTMLDivElement>> = ({ ...rest }) => (
	<div {...rest} className={cn("flex gap-4", rest.className)} />
);
export const Column: FC<HTMLAttributes<HTMLDivElement>> = ({ ...rest }) => (
	<div {...rest} className={cn("flex flex-col gap-4", rest.className)} />
);