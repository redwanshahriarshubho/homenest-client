import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Star, Building2, User } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = ({ showToast }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const slides = [
    { 
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200', 
      title: 'Find Your Dream Home', 
      subtitle: 'Browse thousands of properties in Bangladesh' 
    },
    { 
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200', 
      title: 'Luxury Living Spaces', 
      subtitle: 'Premium properties for discerning buyers in Dhaka' 
    },
    { 
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200', 
      title: 'Investment Opportunities', 
      subtitle: 'Smart real estate investments across Bangladesh' 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFeaturedProperties([
        { 
          _id: '1', 
          propertyName: 'Modern Villa in Gulshan', 
          category: 'Sale', 
          description: 'Stunning modern villa with pool in prime Gulshan location', 
          location: 'Gulshan, Dhaka', 
          price: 250000000,  // 25 crore BDT
          imageLink: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600' 
        },
        { 
          _id: '2', 
          propertyName: 'Downtown Apartment in Banani', 
          category: 'Rent', 
          description: 'Luxury apartment in city center Banani', 
          location: 'Banani, Dhaka', 
          price: 45000,  // 45,000 BDT/month
          imageLink: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600' 
        },
        { 
          _id: '3', 
          propertyName: 'Beach House in Cox\'s Bazar', 
          category: 'Sale', 
          description: 'Beautiful beachfront property near the sea', 
          location: 'Cox\'s Bazar', 
          price: 320000000,  // 32 crore BDT
          imageLink: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600' 
        },
        { 
          _id: '4', 
          propertyName: 'Commercial Space in Motijheel', 
          category: 'Commercial', 
          description: 'Prime retail location in business district', 
          location: 'Motijheel, Dhaka', 
          price: 80000,  // 80,000 BDT/month
          imageLink: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600' 
        },
        { 
          _id: '5', 
          propertyName: 'Mountain Cabin in Sylhet', 
          category: 'Rent', 
          description: 'Cozy cabin retreat in green hills', 
          location: 'Sylhet', 
          price: 30000,  // 30,000 BDT/month
          imageLink: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600' 
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const formatPrice = (price, category) => {
    if (category === 'Sale') {
      return `${(price / 10000000).toLocaleString()} Cr BDT`;
    }
    return `${(price / 1000).toLocaleString()}k BDT/mo`;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <div className="relative h-96 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Properties */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={property.imageLink}
                alt={property.propertyName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{property.propertyName}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    property.category === 'Sale' ? 'bg-green-100 text-green-800' :
                    property.category === 'Rent' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {property.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-3 text-sm">{property.description}</p>
                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {formatPrice(property.price, property.category)}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm">4.5</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/property/${property._id}`)}
                  className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;