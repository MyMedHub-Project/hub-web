export interface IAppConfig {
	env: {
		IS_DEV: boolean;
		BASE_URL: string;
		APP_URL: string;
		[key: string]: unknown;
	};
	api: {
		baseUrl: string;
	};
	app: {
		url: string;
	};
}
