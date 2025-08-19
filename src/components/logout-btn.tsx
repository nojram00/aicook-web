"use client";
import { useAuth } from "@/hooks/useAuth";

import React from "react";

export default function LogoutBtn() {
  const { logout, isLoggingOut } = useAuth();
  return (
    <button 
        onClick={logout}
        disabled={isLoggingOut}
        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
      Logout
    </button>
  );
}
