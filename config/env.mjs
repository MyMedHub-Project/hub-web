import { cleanEnv, str, url } from 'envalid';

const envVars = {
  // Development variables
  NEXT_PUBLIC_BASE_URL_DEV: process.env.NEXT_PUBLIC_BASE_URL_DEV,
  NEXT_PUBLIC_APP_URL_DEV: process.env.NEXT_PUBLIC_APP_URL_DEV,

  // Production variables
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,

  // Environment
  NODE_ENV: process.env.NODE_ENV,
};

export const env = cleanEnv(envVars, {
  // Development variables
  NEXT_PUBLIC_BASE_URL_DEV: url(),
  NEXT_PUBLIC_APP_URL_DEV: url(),

  // Production variables
  NEXT_PUBLIC_BASE_URL: url(),
  NEXT_PUBLIC_APP_URL: url(),

  // Environment
  NODE_ENV: str({ choices: ['development', 'production'] }),
});

export const isDev = env.NODE_ENV === 'development';

//Get the appropriate variable based on the environment
export const getEnvVar = (devVar, prodVar) => isDev ? devVar : prodVar;

// Expose environment-specific variables
export const BASE_URL = getEnvVar(env.NEXT_PUBLIC_BASE_URL_DEV, env.NEXT_PUBLIC_BASE_URL);
export const APP_URL = getEnvVar(env.NEXT_PUBLIC_APP_URL_DEV, env.NEXT_PUBLIC_APP_URL);