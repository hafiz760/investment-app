
const AUTH_COOKIE_NAME = "plouton_auth_token";
const COOKIE_MAX_AGE = 60 * 60 * 24;

export const setAuthCookie = (token: string) => {
  if (typeof document !== "undefined") {
    const expires = new Date();
    expires.setTime(expires.getTime() + COOKIE_MAX_AGE * 1000);
    document.cookie = `${AUTH_COOKIE_NAME}=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }
};

export const clearAuthCookie = () => {
  if (typeof document !== "undefined") {
    document.cookie = `${AUTH_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  }
};

export const getAuthCookie = (): string | null => {
  if (typeof document !== "undefined") {
    const name = AUTH_COOKIE_NAME + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let cookie of cookieArray) {
      cookie = cookie.trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
  }
  return null;
};
