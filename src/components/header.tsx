/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "./navbar";
import Modal from "./sign-in-modal";
import { useApi } from "@/hooks/useFetch";
import React from "react";
import useCookie from "@/hooks/useCookies";
import LogoutBtn from "./logout-btn";

export default function Header() {
  // Verify Auth:
  const { cookies } = useCookie();
  const [signedIn, setSignedIn] = useState(false);
  const { post } = useApi({ url: "/api/auth/verify" });


  useEffect(() => {
    if (cookies && cookies.length > 0) {
      const tokenCookie = cookies.find(
        (cookie: { name: string; value: string }) => cookie.name === "token"
      );

      // console.log("Cookies: ", cookies);
      // console.log("Token: ", tokenCookie);

      if (tokenCookie) {
        const token = tokenCookie.value as string;
        post<{ valid: boolean }>(
          JSON.stringify({
            token,
          })
        )
          .then((res) => {
            const { valid } = res;
            // console.log(valid);
            setSignedIn(valid);
          })
          .catch((err: any) => {
            console.error("Token verification failed:", err);
            setSignedIn(false);
          });
      } else {
        setSignedIn(false);
      }
    }
  }, [cookies, post]);

  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (modalRef.current) {
      const modal = modalRef.current;

      modal.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      const modal = modalRef.current;

      modal.close();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-orange-600">Aicook</h1>
            </div>
          </div>

          {/* Navigation */}
          <Navbar />

          {/* Search and Auth */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {signedIn ? (
              <LogoutBtn />
            ) : (
              <React.Fragment>
                <button
                  onClick={openModal}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Sign In
                </button>

                <Modal onClose={closeModal} ref={modalRef} />
              </React.Fragment>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-900">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
