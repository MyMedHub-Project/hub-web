"use client";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

interface ProvidersMiniCardProps {
	provider: {
		name: string;
		image: string;
		specialty: string;
	};
}

export const ProvidersMiniCard = ({ provider }: ProvidersMiniCardProps) => (
	<div className="flex flex-row w-full gap-3 px-4 py-2 items-center bg-white rounded-lg  max-sm:p-4 flex-shrink-0 max-sm:flex-col max-sm:justify-center max-sm:w-[103px] max-sm:bg-hub-grey">
		<Avatar className="bg-hub-green-light border-2 border-hub-grey/10 h-[40px] w-[40px] max-sm:h-[53px] max-sm:w-[53px] rounded-full">
			<AvatarImage src={provider?.image} />
			{/* <AvatarFallback>
				<UserRound />
			</AvatarFallback> */}
		</Avatar>

		<div className="flex flex-col gap-1  items-start text-left max-sm:w-full max-sm:items-center max-sm:text-center">
			<h2 className="text-sm font-semibold text-ellipsis max-sm:max-w-[10ch]">
				{provider?.name}
			</h2>
			<p className="text-xs font-normal">{provider?.specialty}</p>
		</div>
	</div>
);
