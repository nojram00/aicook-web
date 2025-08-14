'use client'

export default function AddRecipeFab({ onClick } : {
    onClick? : () => void
}) {
  return (
    <button onClick={onClick} className="fixed bottom-6 right-6 w-14 h-14 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-300 z-50 group">
      {/* Plus Icon */}
      <svg
        className="w-6 h-6 mx-auto transition-transform duration-300 group-hover:rotate-90"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>

      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Add Recipe
        {/* Tooltip Arrow */}
        <span className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></span>
      </span>
    </button>
  );
}
