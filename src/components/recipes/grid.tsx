"use client";

import React, { useEffect, useRef } from "react";
import RecipeCard from "../recipe-card";
import RecipeCardPlaceholder from "../recipe-card-placeholder";
import { useRecipe } from "@/providers/recipeProvider";

export default function RecipeGrid() {

  const loaderRef = useRef<HTMLDivElement>(null);

  const { recipes: contextRecipes, loading, nextPage } = useRecipe();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          if(nextPage){
            const hasNextPage = await nextPage();
            if(!hasNextPage){
              console.info("You Have reached the last page...");
              (entry.target as HTMLElement).style['display'] = 'none';
              observer.unobserve(entry.target)
            }
          }
        }
      });
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {loading ? (
        <React.Fragment>
          <RecipeCardPlaceholder />
          <RecipeCardPlaceholder />
          <RecipeCardPlaceholder />
        </React.Fragment>
      ) : contextRecipes.length === 0 ? (
        <div>No Recipes Found...</div>
      ) : (
        <React.Fragment>
          {contextRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.title}
              time={recipe.cookTime}
              difficulty={recipe.difficulty}
              onClick={() => console.log(`Clicked on ${recipe.title}`)}
            />
          ))}

        </React.Fragment>
      )}
      <div ref={loaderRef} className="fixed h-0 w-full mt-10 inset-0 bg-white">
        <div className="loader m-auto"></div>
      </div>
    </div>
  );
}
