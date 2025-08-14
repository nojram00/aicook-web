interface RecipeCardProps {
  title: string;
  time: string;
  difficulty: string;
  rating: string;
  imageUrl?: string;
  onClick?: () => void;
}

export default function RecipeCard({ 
  title, 
  time, 
  difficulty, 
  rating, 
  imageUrl,
}: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div 
        className={`h-48 ${imageUrl ? 'bg-cover bg-center' : 'bg-gradient-to-r from-orange-200 to-red-200'}`}
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>⏱️ {time}</span>
          <span>📊 {difficulty}</span>
          <span>⭐ {rating}</span>
        </div>
        <button
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}