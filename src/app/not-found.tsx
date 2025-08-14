import BackBtn from '@/components/back-btn';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl mb-4">🍳</div>
          <h1 className="text-6xl font-bold text-orange-600 mb-2">404</h1>
          <div className="text-4xl mb-4">🥘</div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Oops! Recipe Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like this recipe got burned! The page you&rsquo;re looking for doesn&apos;t exist or has been moved to a different kitchen.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="block w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
          >
            🏠 Back to Home
          </Link>
          
          <Link 
            href="/recipes"
            className="block w-full border border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors"
          >
            🍽️ Browse Recipes
          </Link>
          
          <BackBtn />
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Maybe you&lsquo;re looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/categories" className="text-orange-600 hover:text-orange-700">
              Categories
            </Link>
            <Link href="/about" className="text-orange-600 hover:text-orange-700">
              About Us
            </Link>
            <Link href="/contact" className="text-orange-600 hover:text-orange-700">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}