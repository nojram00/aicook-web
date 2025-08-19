'use client'

import { useProfile } from "@/providers/userProvider";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  
  const { user } = useProfile();

  return (
    <nav className="hidden md:flex space-x-8">
      <Link
        href="/"
        className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors"
      >
        Home
      </Link>
      <Link
        href="/recipes"
        className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors"
      >
        Recipes
      </Link>
      <Link
        href="/categories"
        className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors"
      >
        Categories
      </Link>
      <Link
        href="/about"
        className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors"
      >
        About
      </Link>
      { user && (
        <Link
          href="/profile"
          className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors"
        >
          My Profile
        </Link>  
      )}
    </nav>
  );
}
