import { createAuthClient } from 'better-auth/react';

const baseURL = import.meta.env.VITE_BASE_URL;

if (!baseURL) {
  throw new Error('VITE_BASE_URL is not set');
}

export const authClient = createAuthClient({
  baseURL,
});
