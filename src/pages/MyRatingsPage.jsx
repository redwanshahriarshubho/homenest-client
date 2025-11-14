import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Star, User, Building2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const MyRatingsPage = ({ showToast }) => {
  const { user } = useAuth();
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setTimeout(() => {
      setRatings([
        { _id: '1', propertyName: 'Modern Villa', rating: 5, review: 'Amazing!', reviewDate: '2025-11-15', propertyId: '1' },
        { _id: '2', propertyName: 'Downtown Apartment', rating: 4, review: 'Great location.', reviewDate: '2025-11-14', propertyId: '2' }
      ]);
      setLoading(false);
    }, 800);
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 flex items-center text-gray-900 dark:text-white">
          <Star className="w-10 h-10 mr-3 text-yellow-500" />
          My Ratings
        </h1>
        {ratings.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-xl text-gray-500 dark:text-gray-400">No ratings yet. Start reviewing properties!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ratings.map((rating) => (
              <div key={rating._id} className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{rating.propertyName}</h3>
                <div className="flex mb-3">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className={`w-5 h-5 ${star <= rating.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{rating.review}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <User className="w-4 h-4 mr-2" />
                  <span>{new Date(rating.reviewDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRatingsPage;