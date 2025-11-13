import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Edit } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const UpdatePropertyPage = ({ showToast }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    propertyName: '',
    description: '',
    category: 'Rent',
    price: '',
    location: '',
    imageLink: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = () => {
    // Simulated property loading
    setTimeout(() => {
      setFormData({
        propertyName: 'Modern Villa',
        description: 'Stunning modern villa with pool and amazing views',
        category: 'Sale',
        price: '2500000',
        location: 'Beverly Hills, CA',
        imageLink: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600'
      });
      setLoading(false);
    }, 800);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.propertyName || !formData.description || !formData.price || !formData.location || !formData.imageLink) {
      showToast('Please fill all fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Property updated successfully!', 'success');
      navigate(`/property/${id}`);
    } catch (error) {
      showToast('Failed to update property', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Edit className="w-10 h-10 text-green-600 mr-3" />
          <h1 className="text-4xl font-bold">Update Property</h1>
        </div>
        
        <form onSubmit={handleSubmit} className={`p-8 rounded-lg shadow-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Property Name *</label>
              <input
                type="text"
                value={formData.propertyName}
                onChange={(e) => setFormData({...formData, propertyName: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                disabled={submitting}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="4"
                className={`w-full px-4 py-2 rounded-lg border ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                disabled={submitting}
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                disabled={submitting}
              >
                <option value="Rent">Rent</option>
                <option value="Sale">Sale</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">Price *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                disabled={submitting}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                disabled={submitting}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Image Link *</label>
              <input
                type="url"
                value={formData.imageLink}
                onChange={(e) => setFormData({...formData, imageLink: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
                disabled={submitting}
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">User Email (Read-only)</label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className={`w-full px-4 py-2 rounded-lg border bg-gray-200 ${
                  theme === 'dark' ? 'border-gray-600 text-gray-900' : 'border-gray-300'
                }`}
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">User Name (Read-only)</label>
              <input
                type="text"
                value={user?.displayName || ''}
                readOnly
                className={`w-full px-4 py-2 rounded-lg border bg-gray-200 ${
                  theme === 'dark' ? 'border-gray-600 text-gray-900' : 'border-gray-300'
                }`}
              />
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
            >
              {submitting ? 'Updating...' : 'Update Property'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePropertyPage;