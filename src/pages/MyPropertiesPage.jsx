import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { MapPin, DollarSign, Calendar, Eye, Edit, Trash2, Building2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const MyPropertiesPage = ({ showToast }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyProperties();
  }, []);

  const loadMyProperties = () => {
    // Simulated user properties
    setTimeout(() => {
      setProperties([
        { 
          _id: '1', 
          propertyName: 'Modern Villa', 
          category: 'Sale', 
          price: 2500000, 
          location: 'Beverly Hills, CA', 
          postedDate: '2025-01-15', 
          imageLink: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400' 
        },
        { 
          _id: '2', 
          propertyName: 'Downtown Apartment', 
          category: 'Rent', 
          price: 4500, 
          location: 'New York, NY', 
          postedDate: '2025-02-01', 
          imageLink: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400' 
        }
      ]);
      setLoading(false);
    }, 800);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setProperties(properties.filter(p => p._id !== id));
      showToast('Property deleted successfully', 'success');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-property/${id}`);
  };

  const viewDetails = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Properties</h1>
        
        {loading ? (
          <LoadingSpinner />
        ) : properties.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-500 mb-4">You haven't added any properties yet</p>
            <button
              onClick={() => navigate('/add-property')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Your First Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property._id} className={`rounded-lg shadow-lg overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}>
                <img src={property.imageLink} alt={property.propertyName} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{property.propertyName}</h3>
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">{property.category}</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="flex items-center text-green-600 font-bold">
                      <DollarSign className="w-5 h-5" />
                      <span>${property.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{new Date(property.postedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => viewDetails(property._id)}
                      className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleUpdate(property._id)}
                      className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(property._id, property.propertyName)}
                      className="py-2 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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

export default MyPropertiesPage;