"use client";
import Image from "next/image";
import { useProfile } from "@/providers/userProvider";
import { logout2 } from "@/actions/auth-actions";
import React from "react";

export default function ProfileContainer() {
  const { user } = useProfile()
  const [pending, startTransition] = React.useTransition()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-200 to-red-200 h-32"></div>

        {/* Profile Content */}
        <div className="relative px-8 pb-8">
          {/* Profile Photo */}
          <div className="flex justify-center -mt-16 mb-6">
            <div className="relative">
              {user?.profile_photo ? (
                <Image
                  src={user.profile_photo}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user?.name}
            </h1>
            <p className="text-gray-600 text-lg">{user?.email}</p>
          </div>

          {/* Profile Details */}
          <div className="space-y-6">
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Profile Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                    {user?.name}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                    {user?.email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User ID
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 font-mono text-sm">
                    {user?.uid}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Account Actions
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => startTransition(() => logout2())}
                  disabled={pending}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-200 transition-colors"
                >
                  { pending ? "Logging You Out..." : "Logout" }
                </button>

                <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
