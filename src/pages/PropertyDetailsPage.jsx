import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { MapPin, DollarSign, Calendar, Star } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const PropertyDetailsPage = ({ showToast }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState({ rating: 5, review: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPropertyDetails();
  }, [id]);

  const loadPropertyDetails = () => {
    setTimeout(() => {
      setProperty({
        _id: '1',
        propertyName: 'Modern Villa',
        description: 'Stunning modern villa with pool, garden, and amazing views. This property features 5 bedrooms, 4 bathrooms, a spacious living area, and modern amenities throughout.',
        category: 'Sale',
        price: 2500000,
        location: 'Beverly Hills, CA',
        imageLink: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        postedDate: '2025-01-15',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhoto: 'https://i.pravatar.cc/100?img=1'
      });
      
      setRatings([
        { 
          _id: '1', 
          reviewerName: 'Alice Johnson', 
          rating: 5, 
          review: 'Amazing property! Highly recommended.', 
          reviewDate: '2025-02-01' 
        },
        { 
          _id: '2', 
          reviewerName: 'Bob Smith', 
          rating: 4, 
          review: 'Great location and beautiful home.', 
          reviewDate: '2025-01-28' 
        }
      ]);
      
      setLoading(false);
    }, 800);
  };

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please login to submit a rating', 'error');
      return;
    }
    if (!newRating.review) {
      showToast('Please write a review', 'error');
      return;
    }
    
    setSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Rating submitted successfully!', 'success');
      setNewRating({ rating: 5, review: '' });
      loadPropertyDetails(); // Reload to show new rating
    } catch (error) {
      showToast('Failed to submit rating', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Property Image */}
        <img src={property.imageLink} alt={property.propertyName} className="w-full h-96 object-cover rounded-lg shadow-lg mb-8" />
        
        {/* Property Info */}
        <div className={`p-8 rounded-lg shadow-lg mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-bold">{property.propertyName}</h1>
            <span className="px-4 py-2 bg-blue-600 text-white rounded-full">{property.category}</span>
          </div>
          
          <div className="flex items-center text-green-600 font-bold text-3xl mb-6">
            <DollarSign className="w-8 h-8" />
            <span>{property.price.toLocaleString()}</span>
          </div>
          
          <p className="text-lg mb-6">{property.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-blue-600" />
              <span className="font-semibold">Location:</span>
              <span className="ml-2">{property.location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-blue-600" />
              <span className="font-semibold">Posted:</span>
              <span className="ml-2">{new Date(property.postedDate).toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Posted By */}
          <div className={`flex items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <img src={property.userPhoto} alt={property.userName} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <p className="font-semibold">Posted by</p>
              <p className="text-lg">{property.userName}</p>
              <p className="text-sm text-gray-500">{property.userEmail}</p>
            </div>
          </div>
        </div>
        
        {/* Ratings & Reviews Section */}
        <div className={`p-8 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-3xl font-bold mb-6">Ratings & Reviews</h2>
          
          {/* Submit Rating Form */}
          {user && (
            <form onSubmit={handleSubmitRating} className={`mb-8 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
              
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Rating (1-5 stars)</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating({...newRating, rating: star})}
                      className="focus:outline-none"
                      disabled={submitting}
                    >
                      <Star className={`w-8 h-8 ${star <= newRating.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                    </button>
                  ))}
                  <span className="ml-4 text-lg font-semibold">{newRating.rating} stars</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Your Review</label>
                <textarea
                  value={newRating.review}
                  onChange={(e) => setNewRating({...newRating, review: e.target.value})}
                  rows="4"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Share your experience with this property..."
                  disabled={submitting}
                />
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}
          
          {!user && (
            <div className="mb-8 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
              <p className="text-yellow-800">Please login to leave a review</p>
            </div>
          )}
          
          {/* Existing Ratings */}
          <div className="space-y-4">
            {ratings.map((rating) => (
              <div key={rating._id} className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-lg">{rating.reviewerName}</p>
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-5 h-5 ${star <= rating.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(rating.reviewDate).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-600">{rating.review}</p>
              </div>
            ))}
          </div>
          
          {ratings.length === 0 && (
            <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;