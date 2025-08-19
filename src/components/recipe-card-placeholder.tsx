import React from 'react'

export default function RecipeCardPlaceholder() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div 
        className={`h-48 bg-gradient-to-r from-orange-200 to-red-200`}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
            <div className="placeholder"></div>
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>
            <div className="placeholder"></div>
          </span>
          <span>
            <div className="placeholder"></div>
          </span>
          <span>
            <div className="placeholder"></div>
          </span>
        </div>
        <button
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors"
        >
          <div className="btn-placeholder"></div>
        </button>
      </div>
    </div>
  )
}
