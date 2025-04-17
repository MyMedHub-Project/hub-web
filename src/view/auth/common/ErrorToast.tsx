interface ErrorToastProps {
	error: string;
}

export const ErrorToast = ({ error }: ErrorToastProps) => (
	<div className="absolute top-0 mr-auto w-[70%] my-1 py-2 rounded-lg bg-red-600 text-red-50 text-center text-sm">
		{error}
	</div>
);
