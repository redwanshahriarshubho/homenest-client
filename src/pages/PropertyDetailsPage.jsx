import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, DollarSign, Calendar, Star } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const PropertyDetailsPage = ({ showToast }) => {
  const { user } = useAuth();
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
        price: 250000000, // Updated to BDT (2.5 crore)
        location: 'Bashundhara, Dhaka', // Updated to Bangladeshi location
        imageLink: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        postedDate: '2025-11-15',
        userName: 'Redwan Shahriar Shubho', // Updated name
        userEmail: 'redwanshahriarshubho.1789@gmail.com', // Updated email
        userPhoto: '' // Avatar based on name; replace with your hosted photo URL
      });
     
      setRatings([
        {
          _id: '1',
          reviewerName: 'AAA',
          rating: 5,
          review: 'Amazing property! Highly recommended.',
          reviewDate: '2025-11-14'
        },
        {
          _id: '2',
          reviewerName: 'BBB',
          rating: 4,
          review: 'Great location and beautiful home.',
          reviewDate: '2025-11-13'
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Property Image */}
        <img src={property.imageLink} alt={property.propertyName} className="w-full h-96 object-cover rounded-lg shadow-lg mb-8" />
       
        {/* Property Info */}
        <div className="p-8 rounded-lg shadow-lg mb-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{property.propertyName}</h1>
            <span className="px-4 py-2 bg-blue-600 text-white rounded-full">{property.category}</span>
          </div>
         
          <div className="flex items-center text-green-600 font-bold text-3xl mb-6">
            <DollarSign className="w-8 h-8" />
            <span>৳{property.price.toLocaleString()}</span> {/* Updated to Taka (৳) */}
          </div>
         
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">{property.description}</p>
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="w-5 h-5 mr-3 text-blue-600" />
              <span className="font-semibold text-gray-900 dark:text-white">Location:</span>
              <span className="ml-2">{property.location}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Calendar className="w-5 h-5 mr-3 text-blue-600" />
              <span className="font-semibold text-gray-900 dark:text-white">Posted:</span>
              <span className="ml-2">{new Date(property.postedDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Owner Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Posted by</h3>
            <div className="flex items-center">
              <img src={property.userPhoto} alt={property.userName} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{property.userName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{property.userEmail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews & Ratings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Reviews & Ratings</h2>
          
          {user && (
            <form onSubmit={handleSubmitRating} className="mb-6 p-4 border rounded-lg bg-white dark:bg-gray-800">
              <div className="flex items-center mb-4">
                <label className="mr-2 font-semibold text-gray-900 dark:text-white">Rating:</label>
                <select 
                  value={newRating.rating} 
                  onChange={(e) => setNewRating({...newRating, rating: parseInt(e.target.value)})} 
                  className="mr-4 p-1 border rounded"
                >
                  {[1,2,3,4,5].map(n => (
                    <option key={n} value={n}>{'★'.repeat(n)}</option>
                  ))}
                </select>
              </div>
              <textarea
                value={newRating.review}
                onChange={(e) => setNewRating({...newRating, review: e.target.value})}
                placeholder="Write your review..."
                className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={3}
              />
              <button 
                type="submit" 
                disabled={submitting} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}

          <div className="space-y-4">
            {ratings.map((rating) => (
              <div key={rating._id} className="p-4 border rounded-lg bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {Array.from({length: rating.rating}).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                      {Array.from({length: 5 - rating.rating}).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-gray-300" />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(rating.reviewDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-800 dark:text-white">{rating.review}</p>
                <p className="text-sm text-gray-500 mt-1">— {rating.reviewerName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;