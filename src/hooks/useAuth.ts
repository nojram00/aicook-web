"use client";

import { useState } from "react";
import { logout as serverLogout } from "@/actions/auth-actions";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter()

  const logout = async () => {
    setIsLoggingOut(true);

    try {
      // Call server action to invalidate token
      const result = await serverLogout();

      if (result.success) {
        // Redirect to home or login page
       router.push('/');
      } else {
        console.error("Logout failed:", result.error);
        // Still redirect even if server logout failed
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Force redirect on any error
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    logout,
    isLoggingOut,
  };
}
