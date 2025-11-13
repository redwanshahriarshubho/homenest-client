import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Star } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const MyRatingsPage = ({ showToast }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyRatings();
  }, []);

  const loadMyRatings = () => {
    setTimeout(() => {
      setRatings([
        { 
          _id: '1', 
          propertyName: 'Modern Villa',
          rating: 5, 
          review: 'Amazing property! Highly recommended for anyone looking for luxury living.',
          reviewDate: '2025-02-01',
          propertyThumbnail: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200'
        },
        { 
          _id: '2', 
          propertyName: 'Beach House',
          rating: 4, 
          review: 'Great location and beautiful views. Could use some minor updates.',
          reviewDate: '2025-01-28',
          propertyThumbnail: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=200'
        }
      ]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Ratings & Reviews</h1>
        
        {loading ? (
          <LoadingSpinner />
        ) : ratings.length === 0 ? (
          <div className="text-center py-16">
            <Star className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-500">You haven't left any reviews yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {ratings.map((rating) => (
              <div key={rating._id} className={`p-6 rounded-lg shadow-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="flex gap-6">
                  <img 
                    src={rating.propertyThumbnail} 
                    alt={rating.propertyName}
                    className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">{rating.propertyName}</h3>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-6 h-6 ${star <= rating.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                            />
                          ))}
                          <span className="ml-2 text-lg font-semibold">{rating.rating}/5</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Reviewed by</p>
                        <p className="font-semibold">{user?.displayName}</p>
                        <p className="text-sm text-gray-500">{new Date(rating.reviewDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mt-4">{rating.review}</p>
                  </div>
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