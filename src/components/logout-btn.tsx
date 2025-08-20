"use client";
import { logout2 } from "@/actions/auth-actions";

import React from "react";

export default function LogoutBtn() {
  // const { logout, isLoggingOut } = useAuth();

  const [pending, startTransition] = React.useTransition();

  return (
    <button 
        onClick={() => startTransition(() => logout2())}
        disabled={pending}
        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:bg-red-200 transition-colors">
      Logout
    </button>
  );
}
