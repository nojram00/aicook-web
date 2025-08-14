import { Link } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-orange-600 mb-4">
          Aicook
        </h3>
        <p className="text-gray-400 mb-6">
          Your ultimate destination for delicious recipes
        </p>
        <div className="flex justify-center space-x-6">
          <Link
            href="/privacy"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  </footer>
  )
}
