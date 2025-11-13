import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { PlusCircle } from 'lucide-react';

const AddPropertyPage = ({ showToast }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    propertyName: '',
    description: '',
    category: 'Rent',
    price: '',
    location: '',
    imageLink: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.propertyName || !formData.description || !formData.price || !formData.location || !formData.imageLink) {
      showToast('Please fill all fields', 'error');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Property added successfully!', 'success');
      navigate('/my-properties');
    } catch (error) {
      showToast('Failed to add property', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <PlusCircle className="w-10 h-10 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold">Add New Property</h1>
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
                placeholder="Enter property name"
                disabled={loading}
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
                placeholder="Enter property description"
                disabled={loading}
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
                disabled={loading}
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
                placeholder="Enter price"
                disabled={loading}
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
                placeholder="Enter location (city, area, or address)"
                disabled={loading}
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
                placeholder="Enter image URL"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold">User Email</label>
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
              <label className="block mb-2 font-semibold">User Name</label>
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
          
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
          >
            {loading ? 'Adding Property...' : 'Add Property'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyPage;