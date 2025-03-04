import { IAppConfig } from "@/types/structs";
import { env, BASE_URL, APP_URL, isDev } from "./env.mjs";
import merge from "deepmerge";

const appConfig: IAppConfig = {
	env: Object.defineProperties(
		merge(env, {
			// Custom environment properties
			IS_DEV: isDev,
			BASE_URL,
			APP_URL
		}),
		// just preserving object characteristics
		Object.getOwnPropertyDescriptors(env)
	),
	api: {
		baseUrl: BASE_URL
	},
	app: {
		url: APP_URL
	}
};

export default appConfig;
