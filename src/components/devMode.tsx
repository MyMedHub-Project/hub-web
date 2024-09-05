import { FC } from "react";
import appConfig from "../../config";
import { P } from "./atoms/text";

interface Props {
	where: string;
}
export const DevMode: FC<Props> = ({ where }) => {
	if (!appConfig.env.IS_DEV) return null;
	return (
		<P className="absolute top-0 left-0 text-red-500 text-xs font-medium">
			Dev Mode - <span className="text-gray-500">{where}</span>
		</P>
	);
};
