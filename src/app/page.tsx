import Link from "next/link";
import RecipeCard from "@/components/recipe-card";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Amazing
              <span className="text-orange-600"> Recipes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Find thousands of delicious recipes from around the world. Cook,
              share, and enjoy amazing meals with your family and friends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-orange-700 transition-colors">
                Explore Recipes
              </button>
              <button className="border border-orange-600 text-orange-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-orange-50 transition-colors">
                Upload Recipe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Breakfast", emoji: "🥞", count: "245 recipes" },
              { name: "Lunch", emoji: "🥗", count: "189 recipes" },
              { name: "Dinner", emoji: "🍝", count: "312 recipes" },
              { name: "Desserts", emoji: "🍰", count: "156 recipes" },
              { name: "Vegetarian", emoji: "🥕", count: "198 recipes" },
              { name: "Quick Meals", emoji: "⚡", count: "134 recipes" },
              { name: "Healthy", emoji: "🥬", count: "167 recipes" },
              { name: "International", emoji: "🌍", count: "223 recipes" },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-3">{category.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Featured Recipes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Creamy Pasta Carbonara",
                time: "25 min",
                difficulty: "Easy",
                rating: "4.8",
              },
              {
                title: "Grilled Salmon with Herbs",
                time: "30 min",
                difficulty: "Medium",
                rating: "4.9",
              },
              {
                title: "Chocolate Lava Cake",
                time: "45 min",
                difficulty: "Hard",
                rating: "4.7",
              },
            ].map((recipe, index) => (
              <RecipeCard
                key={index}
                title={recipe.title}
                time={recipe.time}
                difficulty={recipe.difficulty}
                rating={recipe.rating}
              />
            ))}
          </div>
        </div>
      </section>

      
    </React.Fragment>
  );
}
