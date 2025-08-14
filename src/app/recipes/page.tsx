import React from "react";
import RecipeCard from "@/components/recipe-card";
import AddRecipeSection from "@/components/add-recipe-section";
import RecipeGrid from "@/components/recipes/grid";

export default function RecipePage() {
  const recipes = [
    {
      title: "Classic Margherita Pizza",
      time: "35 min",
      difficulty: "Medium",
      rating: "4.9",
    },
    {
      title: "Beef Tacos with Guacamole",
      time: "20 min",
      difficulty: "Easy",
      rating: "4.7",
    },
    {
      title: "Chicken Tikka Masala",
      time: "45 min",
      difficulty: "Hard",
      rating: "4.8",
    },
    {
      title: "Caesar Salad with Croutons",
      time: "15 min",
      difficulty: "Easy",
      rating: "4.5",
    },
    {
      title: "Homemade Sushi Rolls",
      time: "60 min",
      difficulty: "Hard",
      rating: "4.6",
    },
    {
      title: "Mushroom Risotto",
      time: "40 min",
      difficulty: "Medium",
      rating: "4.8",
    },
    {
      title: "BBQ Pulled Pork Sandwich",
      time: "4 hours",
      difficulty: "Medium",
      rating: "4.9",
    },
    {
      title: "Thai Green Curry",
      time: "30 min",
      difficulty: "Medium",
      rating: "4.7",
    },
    {
      title: "New York Cheesecake",
      time: "2 hours",
      difficulty: "Hard",
      rating: "4.8",
    },
  ];

  return (
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
        <div className="text-center mt-12">
          <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors">
            Load More Recipes
          </button>
        </div>
      </div>

      {/* Add Recipe Section */}
      <AddRecipeSection />
    </div>
  );
}
