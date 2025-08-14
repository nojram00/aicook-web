/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { useCallback, useEffect, useState } from "react";

export function useFetch<T>({
  url,
  request,
  method = "POST",
  options = {},
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";
  request?: string | FormData | URLSearchParams;
  options?: object;
}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    fetch(url, {
      method,
      body: request,
      ...options,
    })
      .then((res) => res.json())
      .then((_data) => setData(_data))
      .catch((err) => setError(err));

    setPending(false);
  }, [url, request]);

  return { data, error, pending };
}

export function useApi({ url }: { url: string }) {
  const get = useCallback(
    async function <T>(): Promise<T> {
      const data = await fetch(url).then((res) => res.json());
      return data as T;
    },
    [url]
  );

  const post = useCallback(
    async function <T>(request: any): Promise<T> {
      const data = await fetch(url, {
        method: "POST",
        body: request,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      return data as T;
    },
    [url]
  );

  return { get, post };
}
