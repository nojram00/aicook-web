"use client";
import Link from "next/link";
import { forwardRef } from "react";

interface SidebarProps {
  toggle: () => void;
}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  function Sidebar({ toggle }, ref) {

    return (
      <div ref={ref} className="sidebar flex flex-col z-10">
        <header className="">
          <button
            onClick={toggle}
            className="text-gray-700 hover:text-gray-900"
          >
            <svg
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-orange-200 to-red-200 h-32">

                </div>
            </div>
          </div> */}
        </header>
        <main className="flex-[1] content-center">
          <nav className="flex flex-col gap-8 m-auto items-center">
            <Link
              onClick={toggle}
              href="/"
              className="text-orange-700 hover:text-orange-900 text-4xl"
            >
              Home
            </Link>
            <Link
              onClick={toggle}
              href="/recipes"
              className="text-orange-700 hover:text-orange-900 text-4xl"
            >
              Recipes
            </Link>
            <Link
              onClick={toggle}
              href="/categories"
              className="text-orange-700 hover:text-orange-900 text-4xl"
            >
              Categories
            </Link>
            <Link
              onClick={toggle}
              href="/about"
              className="text-orange-700 hover:text-orange-900 text-4xl"
            >
              About
            </Link>
          </nav>
        </main>
      </div>
    );
  }
);
