"use client";

import React, { useEffect, useState } from "react";
import RecipeCard from "../recipe-card";
import useFirebase from "@/hooks/useFirebase";

interface Recipe {
  id?: string;
  title: string;
  time: string;
  difficulty: string;
  rating: string;
}

export default function RecipeGrid() {
  const [recipes, setRecipes] = useState<Recipe[]>([
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
  ]);

  const { useFirestore } = useFirebase();
  const { pagination } = useFirestore();

  useEffect(() => {
    pagination.firstPage("recipes", "name", 9).then((docs) => {
      const recipesData = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Recipe[];
      setRecipes(recipesData);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.length == 0 ? (
        <div>
            No Recipes Found...
        </div>
      ) : (
        <React.Fragment>
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.title}
              time={recipe.time}
              difficulty={recipe.difficulty}
              rating={recipe.rating}
              onClick={() => console.log(`Clicked on ${recipe.title}`)}
            />
          ))}
        </React.Fragment>
      )}
    </div>
  );
}
