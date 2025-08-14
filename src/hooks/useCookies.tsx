/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";

export default function useCookie() {
  const [cookie, setCookieStore] = useState<any>(null);
  const [cookies, setCookies] = useState<any>(null);

  // Initialize cookie store and event listener
  useEffect(() => {
    if (typeof window !== "undefined" && window.cookieStore) {
      setCookieStore(window.cookieStore);

      const handleCookieChange = (e: any) => {
        console.log("Cookie Changed. ", e.changed);
        // Refresh cookies when they change
        window.cookieStore?.getAll().then(setCookies);
      };

      window.cookieStore.addEventListener("change", handleCookieChange);

      // Cleanup event listener
      return () => {
        window.cookieStore?.removeEventListener("change", handleCookieChange);
      };
    }
  }, []);

  // Load initial cookies when cookie store is available
  useEffect(() => {
    if (cookie) {
      cookie.getAll().then(setCookies);
    }
  }, [cookie]);

  // Memoized functions to prevent recreation on every render
  const getCookies = useCallback(() => {
    return cookie?.getAll() || Promise.resolve([]);
  }, [cookie]);

  const getCookie = useCallback(
    (name: string) => {
      return cookie?.get(name) || Promise.resolve(null);
    },
    [cookie]
  );

  const setCookie = useCallback(
    (name: string, value: string) => {
      return (
        cookie?.set({
          name,
          value,
        }) || Promise.resolve()
      );
    },
    [cookie]
  );

  const deleteCookie = useCallback(
    (name: string) => {
      return cookie?.delete(name) || Promise.resolve();
    },
    [cookie]
  );

  return { getCookie, getCookies, setCookie, deleteCookie, cookies };
}
