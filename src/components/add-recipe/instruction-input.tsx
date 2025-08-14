'use client'
import React from "react";

interface InstructionProp {
    item_number: number;
    remove_callback: () => void;
}

export default function InstructionInput(prop : InstructionProp) {
  return (
    <div className="flex gap-3">
      <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
        { prop.item_number }
      </span>
      <textarea
        rows={2}
        name="instructions"
        placeholder={prop.item_number == 1 ? "Describe the first step..." : "Describe the next step..."}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
      <button
        onClick={prop.remove_callback}
        type="button"
        className="flex-shrink-0 px-3 py-2 text-red-600 hover:text-red-800"
      >
        ×
      </button>
    </div>
  );
}
