import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Search, SlidersHorizontal, MapPin, DollarSign, User } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const AllPropertiesPage = ({ showToast }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    loadProperties();
  }, [sortBy, searchTerm]);

  const loadProperties = () => {
    setLoading(true);
    // Simulated properties with search and sort
    setTimeout(() => {
      let allProps = [
        { _id: '1', propertyName: 'Modern Villa', category: 'Sale', description: 'Stunning modern villa', location: 'Beverly Hills, CA', price: 2500000, imageLink: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600', userName: 'John Doe', postedDate: '2025-01-15' },
        { _id: '2', propertyName: 'Downtown Apartment', category: 'Rent', description: 'Luxury apartment', location: 'New York, NY', price: 4500, imageLink: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600', userName: 'Jane Smith', postedDate: '2025-02-01' },
        { _id: '3', propertyName: 'Beach House', category: 'Sale', description: 'Beachfront property', location: 'Malibu, CA', price: 3200000, imageLink: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600', userName: 'Mike Johnson', postedDate: '2025-01-20' },
        { _id: '4', propertyName: 'Commercial Space', category: 'Commercial', description: 'Prime location', location: 'Los Angeles, CA', price: 8000, imageLink: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600', userName: 'Sarah Williams', postedDate: '2025-01-25' },
        { _id: '5', propertyName: 'Mountain Cabin', category: 'Rent', description: 'Cozy retreat', location: 'Aspen, CO', price: 3000, imageLink: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600', userName: 'David Brown', postedDate: '2025-02-05' },
        { _id: '6', propertyName: 'Urban Loft', category: 'Sale', description: 'Industrial style', location: 'Chicago, IL', price: 850000, imageLink: 'https://images.unsplash.com/photo-1502672260066-6bc36a05d0d6?w=600', userName: 'Emily Davis', postedDate: '2025-01-30' },
        { _id: '7', propertyName: 'Suburban House', category: 'Sale', description: 'Family home', location: 'Austin, TX', price: 650000, imageLink: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600', userName: 'Robert Wilson', postedDate: '2025-02-10' },
        { _id: '8', propertyName: 'Penthouse Suite', category: 'Rent', description: 'Luxury living', location: 'Miami, FL', price: 12000, imageLink: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600', userName: 'Lisa Anderson', postedDate: '2025-02-08' }
      ];

      // Filter by search
      if (searchTerm) {
        allProps = allProps.filter(p => 
          p.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Sort
      if (sortBy === 'price_asc') {
        allProps.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price_desc') {
        allProps.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'date_desc') {
        allProps.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
      } else if (sortBy === 'date_asc') {
        allProps.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
      }

      setProperties(allProps);
      setLoading(false);
    }, 800);
  };

  const viewDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">All Properties</h1>
        
        {/* Search and Sort */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by property name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              }`}
            />
          </div>
          
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`pl-10 pr-8 py-2 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">Sort By</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
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
                  <p className="text-gray-500 mb-4">{property.description}</p>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-sm">Posted by {property.userName}</span>
                  </div>
                  <div className="flex items-center text-green-600 font-bold text-xl mb-4">
                    <DollarSign className="w-5 h-5" />
                    <span>{property.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => viewDetails(property._id)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No properties found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPropertiesPage;