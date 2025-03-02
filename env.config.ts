import { EnvModes } from "@/constants/enums";

const appConfig = (): EnvValues => {
	switch (process.env.NODE_ENV) {
		case EnvModes.DEV:
			return {
				AUTH_SECRET: `${process.env.AUTH_SECRET}`,
				BASE_URL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
				APP_URL: `${process.env.NEX_PUBLIC_APP_URL}`,
				env: "DEV"
			};
		case EnvModes.PROD:
			return {
				AUTH_SECRET: `${process.env.AUTH_SECRET}`,
				BASE_URL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
				APP_URL: `${process.env.NEX_PUBLIC_APP_URL}`,
				env: "PROD"
			};
		default:
			return {
				AUTH_SECRET: "",
				BASE_URL: "",
				APP_URL: "",
				env: "DEV"
			};
	}
};

type EnvValues = {
	AUTH_SECRET: string;
	BASE_URL: string;
	APP_URL: string;
	env: keyof typeof EnvModes;
};

export default appConfig();
