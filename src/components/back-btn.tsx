"use client";

export default function BackBtn() {
  return (
    <button
      onClick={() => window.history.back()}
      className="block w-full text-gray-600 px-6 py-3 rounded-lg font-medium hover:text-gray-800 transition-colors"
    >
      ← Go Back
    </button>
  );
}
