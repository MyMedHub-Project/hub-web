"use client";

import { useToast } from "@/hooks/use-toast";
import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport
} from "@/components/toast/toast";

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(({ action, description, id, title, ...props }) => (
				<Toast key={id} {...props}>
					<div className="grid gap-1">
						{title ? <ToastTitle>{title}</ToastTitle> : null}
						{description ? (
							<ToastDescription>{description}</ToastDescription>
						) : null}
					</div>
					{action}
					<ToastClose />
				</Toast>
			))}
			<ToastViewport />
		</ToastProvider>
	);
}
