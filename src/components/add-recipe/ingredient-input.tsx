'use client'
import React from "react";

interface IngredientProp {
    item_number: number;
    remove_callback: () => void;
}

export default function IngredientInput(prop : IngredientProp) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        name="ingredient_amount"
        placeholder={prop.item_number % 2 ? "Amount (e.g., 1 tsp)" : "Amount (e.g., 2 cups)"}
        className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
      <input
        type="text"
        name="ingredient_name"
        placeholder="Ingredient name"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
      <button
        type="button"
        onClick={prop.remove_callback}
        className="px-3 py-2 text-red-600 hover:text-red-800"
      >
        ×
      </button>
    </div>
  );
}
