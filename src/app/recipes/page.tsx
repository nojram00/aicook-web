import React from "react";
import AddRecipeSection from "@/components/add-recipe-section";
import RecipeGrid from "@/components/recipes/grid";
import { cookies } from "next/headers";
import { getBaseUrl } from "@/api-helper/base-url";
import { RecipeProvider } from "@/providers/recipeProvider";

export default async function RecipePage() {

  const baseUrl = getBaseUrl();

  const c = await cookies()

  const token = c.get('token')

  let validated = false;

  if(token){
    const data = await fetch(`${baseUrl}/api/auth/verify`, {
      method: 'POST',
      body: JSON.stringify({
        token: token.value
      })
    }).then(res => res.json())
    .catch(() => console.warn("Token Invalid"))

    if(data){
      validated = true;
    }
  }

  return (
    <RecipeProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900">All Recipes</h1>
            <p className="text-gray-600 mt-2">
              Discover delicious recipes from around the world
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium">
              All
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
              Breakfast
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
              Lunch
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
              Dinner
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
              Desserts
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
              Vegetarian
            </button>
          </div>

          {/* Recipe Grid */}
          <RecipeGrid />

          {/* Load More Button */}
          {/* <div className="text-center mt-12">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors">
              Load More Recipes
            </button>
          </div> */}
        </div>

        {/* Add Recipe Section */}
        { validated && (<AddRecipeSection />)}
      </div>
    </RecipeProvider>
  );
}
