import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-100 dark:bg-gray-900">
      <div className="text-center max-w-md">
        <AlertCircle className="w-20 h-20 mx-auto text-red-500 mb-6" />
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Sorry, the page you're looking for doesn't exist.</p>
        <div className="space-x-4">
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto mb-4">
            <Home className="w-5 h-5 mr-2" /> Go Home
          </button>
          <Link to="/" className="block text-blue-600 dark:text-blue-400 hover:underline">Browse Properties</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;