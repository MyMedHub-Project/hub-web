// ###################################################### env.mjs file ##########################################################
// import { cleanEnv, str, url } from 'envalid';

// const envVars = {
//   // Development variables
//   NEXT_PUBLIC_BASE_URL_DEV: process.env.NEXT_PUBLIC_BASE_URL_DEV,
//   NEXT_PUBLIC_APP_URL_DEV: process.env.NEXT_PUBLIC_APP_URL_DEV,
//   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEV: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEV,
//   STRIPE_SECRET_KEY_DEV: process.env.STRIPE_SECRET_KEY_DEV,

//   // Production variables
//   NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
//   NEXT_PUBLIC_X_DIALME_KEY: process.env.NEXT_PUBLIC_X_DIALME_KEY,
//   NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
//   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
//   STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

//   // Environment
//   NODE_ENV: process.env.NODE_ENV,
// };

// export const env = cleanEnv(envVars, {
//   // Development variables
//   NEXT_PUBLIC_BASE_URL_DEV: url(),
//   NEXT_PUBLIC_APP_URL_DEV: url(),
//   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEV: str({ startsWith: 'pk_test_' }),
//   STRIPE_SECRET_KEY_DEV: str({ startsWith: 'sk_test_' }),

//   // Production variables
//   NEXT_PUBLIC_BASE_URL: url(),
//   NEXT_PUBLIC_X_DIALME_KEY: str(),
//   NEXT_PUBLIC_APP_URL: url(),
//   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: str({ startsWith: 'pk_' }),
//   STRIPE_SECRET_KEY: str({ startsWith: 'sk_' }),

//   // Environment
//   NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
// });

// export const isDev = env.NODE_ENV === 'development';
// export const isProd = env.NODE_ENV === 'production';

// // Helper function to get the appropriate variable based on the environment
// export const getEnvVar = (devVar, prodVar) => isDev ? devVar : prodVar;

// // Expose environment-specific variables
// export const BASE_URL = getEnvVar(env.NEXT_PUBLIC_BASE_URL_DEV, env.NEXT_PUBLIC_BASE_URL);
// export const APP_URL = getEnvVar(env.NEXT_PUBLIC_APP_URL_DEV, env.NEXT_PUBLIC_APP_URL);
// export const STRIPE_PUBLISHABLE_KEY = getEnvVar(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEV, env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
// export const STRIPE_SECRET_KEY = getEnvVar(env.STRIPE_SECRET_KEY_DEV, env.STRIPE_SECRET_KEY);

//########################################################### App Config File #####################################################
// import type { IAppConfig } from '@/interfaces/config';
// import { env, BASE_URL, APP_URL, STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, isDev } from './env.mjs';
// import merge from 'deepmerge';

// const appConfig: IAppConfig = {
//   env: Object.defineProperties(
//     merge(env, {
//       // Custom environment properties
//       IS_DEV: isDev,
//       BASE_URL,
//       APP_URL,
//     }),
//     Object.getOwnPropertyDescriptors(env)
//   ),
//   api: {
//     baseUrl: BASE_URL,
//     headers: {
//       'X-Dialme-Key': env.NEXT_PUBLIC_X_DIALME_KEY,
//     },
//   },
//   app: {
//     url: APP_URL,
//   },
//   stripe: {
//     publishableKey: STRIPE_PUBLISHABLE_KEY,
//     secretKey: STRIPE_SECRET_KEY,
//   },
// };

// export default appConfig;

//#################################### Config Interface ##################################################
// export interface IAppConfig {
//       env: {
//         IS_DEV: boolean;
//         BASE_URL: string;
//         APP_URL: string;
//         [key: string]: any;
//       };
//       api: {
//         baseUrl: string;
//         headers: {
//           'X-Dialme-Key': string;
//         };
//       };
//       app: {
//         url: string;
//       };
//       stripe: {
//         publishableKey: string;
//         secretKey: string;
//       };
//     }