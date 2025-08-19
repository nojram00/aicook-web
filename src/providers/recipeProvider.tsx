/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useFirestore } from "@/hooks/firebase";
import { Recipe } from "@/interfaces/recipe";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface RecipeContextProps {
    recipes: Recipe[];
    loading: boolean;
    create?: (data: any) => void | Promise<void> | any | Promise<any>;
    nextPage?: () => boolean | Promise<boolean> 
}

const RecipeContext = createContext<RecipeContextProps>({
    recipes: [],
    loading: true
})

export function RecipeProvider({ children } : {
    children?: React.ReactNode
}){

    const [recipes, setRecipes] = useState<Recipe[]>([])

    const [loading, setLoading] = useState(true);

    const { create, pagination } = useFirestore();

    useEffect(() => {
        const fetchRecipes = async () => {
            const _recipes = await pagination.firstPage<Recipe>('recipe', 'title', 9);
    
            console.log("Recipes: ", _recipes);

            setRecipes(_recipes)

            setLoading(false);
        }

        fetchRecipes();
    }, [])

    const createRecipe = useCallback(async function createRecipe(data: any){
        return create('recipe', data) 
    }, [])

    const nextPage = useCallback(async function page(){
        const _recipes = await pagination.nextPage<Recipe>('recipe', 'title', 9)

        if(_recipes?.length == 0) return false;

        if(_recipes){
            setRecipes([
                ...recipes,
                ..._recipes
            ])

            return true;
        }

        return false;
    }, [])

    return <RecipeContext.Provider value={{
        recipes,
        loading,
        create: createRecipe,
        nextPage
    }}>{ children }</RecipeContext.Provider>
}

export function useRecipe(){
    return useContext(RecipeContext);
}