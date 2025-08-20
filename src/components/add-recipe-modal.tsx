/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FormEvent, forwardRef, useEffect, useState } from "react";
import Instructions from "./add-recipe/instructions";
import Ingredients from "./add-recipe/ingredients";
import useFirebase from "@/hooks/useFirebase";
import { useApi } from "@/hooks/useFetch";
import { useRecipe } from "@/providers/recipeProvider";
import { Recipe } from "@/interfaces/recipe";
import { DocumentData, DocumentReference } from "firebase/firestore";

interface RecipeModalProps {
  onClose?: () => void;
}

const CreateRecipeModal = forwardRef<HTMLDialogElement, RecipeModalProps>(
  function Modal({ onClose }, ref) {

    const { useFirestore, useFireauth } = useFirebase()
    const { create } = useFirestore()
    const { getSession } = useFireauth()

    const { create: createRecipe } = useRecipe();

    const { post } = useApi({ url: '/api/recipe/upload' });

    const [userData, setUserData] = useState<{
        userId : string,
        name: string,
        email: string
    } | null>(null);

    useEffect(() => {
        getSession().then(user => {
            if(user){
                console.log(user.uid)
                setUserData({
                    userId : user.uid,
                    name: user.displayName ?? '',
                    email: user.email ?? ''
                })
            }
        })
    }, [])

    const handleSubmission = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const ingredient_names = formData.getAll('ingredient_name') as string[]
        const ingredient_amounts = formData.getAll('ingredient_amount') as string[]

        const ingredients = ingredient_names.map((value, idx) => {
            return {
                name: value,
                amount: ingredient_amounts[idx]
            }
        })

       const entries = Object.entries(Object.fromEntries(formData)).filter(([key]) => key !== 'image').reduce<
       Record<string, FormDataEntryValue>>((prev, [k, v]) => {
          if(k !== 'ingredient_amount' && k !== 'ingredient_name'){
            prev[k] = v
          }

          return prev;
       }, {})

        const data = {
            ...entries,
            instructions : formData.getAll('instructions') as string[],
            ingredients,
            user: userData
        };

        console.log(data);

        // create('recipes', data).then(res => {
        //     console.log(res)
        // })

        if(createRecipe){
          createRecipe(data).then((res : any) => {
            console.log(res)
          })
        }
    }

    return (
      <dialog
        ref={ref}
        className="backdrop:bg-black/50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg p-0 max-w-4xl w-full max-h-[90vh] overflow-y-auto modal"
      >
        <div className="bg-white rounded-lg p-6 w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Add New Recipe</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmission}>
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Recipe Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter recipe title"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="dessert">Dessert</option>
                  <option value="snack">Snack</option>
                  <option value="appetizer">Appetizer</option>
                </select>
              </div>
            </div>

            {/* Recipe Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="cookTime"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Cook Time *
                </label>
                <input
                  type="text"
                  id="cookTime"
                  name="cookTime"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., 30 min"
                />
              </div>

              <div>
                <label
                  htmlFor="difficulty"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Difficulty *
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="servings"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Servings *
                </label>
                <input
                  type="number"
                  id="servings"
                  name="servings"
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="4"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Brief description of your recipe..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Recipe Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="mt-4">
                  <label htmlFor="image" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload a photo
                    </span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <Ingredients />

            {/* Instructions */}
            <Instructions />

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., vegetarian, gluten-free, quick (separate with commas)"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Save Recipe
              </button>
            </div>
          </form>
        </div>
      </dialog>
    );
  }
);

export default CreateRecipeModal;
