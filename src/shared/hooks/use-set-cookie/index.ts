import { Cookies } from 'react-cookie';
import dayjs from 'dayjs';

/**
 * Add a cookie.
 */
export const useSetCookie = () => {
  const cookie = new Cookies();

  return (name: string, value: string, expiresAt?: string) => {
    cookie.set(name, value, {
      path: '/',
      domain: import.meta.env.VITE_DOMAIN_URL,
      sameSite: import.meta.env.VITE_ENVIRONMENT === 'production' || 'lax',
      secure: import.meta.env.VITE_ENVIRONMENT === 'production',
      httpOnly: false,
      expires: expiresAt ? dayjs(expiresAt, 'X').toDate() : undefined,
    });
  };
};

export const useRemoveCookie = () => {
  const cookie = new Cookies();

  return (name: string) => {
    cookie.remove(name, {
      path: '/',
      domain: import.meta.env.VITE_DOMAIN_URL,
    });
  };
};
