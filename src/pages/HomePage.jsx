import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { MapPin, DollarSign, Star, Building2, User } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = ({ showToast }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const slides = [
    { 
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200', 
      title: 'Find Your Dream Home', 
      subtitle: 'Browse thousands of properties' 
    },
    { 
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200', 
      title: 'Luxury Living Spaces', 
      subtitle: 'Premium properties for discerning buyers' 
    },
    { 
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200', 
      title: 'Investment Opportunities', 
      subtitle: 'Smart real estate investments' 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulated featured properties
    setTimeout(() => {
      setFeaturedProperties([
        { 
          _id: '1', 
          propertyName: 'Modern Villa', 
          category: 'Sale', 
          description: 'Stunning modern villa with pool', 
          location: 'Beverly Hills, CA', 
          price: 2500000, 
          imageLink: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600' 
        },
        { 
          _id: '2', 
          propertyName: 'Downtown Apartment', 
          category: 'Rent', 
          description: 'Luxury apartment in city center', 
          location: 'New York, NY', 
          price: 4500, 
          imageLink: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600' 
        },
        { 
          _id: '3', 
          propertyName: 'Beach House', 
          category: 'Sale', 
          description: 'Beautiful beachfront property', 
          location: 'Malibu, CA', 
          price: 3200000, 
          imageLink: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600' 
        },
        { 
          _id: '4', 
          propertyName: 'Commercial Space', 
          category: 'Commercial', 
          description: 'Prime retail location', 
          location: 'Los Angeles, CA', 
          price: 8000, 
          imageLink: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600' 
        },
        { 
          _id: '5', 
          propertyName: 'Mountain Cabin', 
          category: 'Rent', 
          description: 'Cozy cabin retreat', 
          location: 'Aspen, CO', 
          price: 3000, 
          imageLink: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600' 
        },
        { 
          _id: '6', 
          propertyName: 'Urban Loft', 
          category: 'Sale', 
          description: 'Stylish industrial loft', 
          location: 'Chicago, IL', 
          price: 850000, 
          imageLink: 'https://images.unsplash.com/photo-1502672260066-6bc36a05d0d6?w=600' 
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const viewDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className={theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}>
      {/* Slider */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Featured Properties */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Properties</h2>
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
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
                  <div className="flex items-center text-green-600 font-bold text-xl mb-4">
                    <DollarSign className="w-5 h-5" />
                    <span>{property.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => viewDetails(property._id)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Why Choose Us */}
      <div className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose HomeNest</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-600">All properties are verified and genuine</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Reviews</h3>
              <p className="text-gray-600">Real reviews from real customers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">24/7 customer support available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">10K+</h3>
            <p className="text-gray-600 mt-2">Properties Listed</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">5K+</h3>
            <p className="text-gray-600 mt-2">Happy Clients</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">50+</h3>
            <p className="text-gray-600 mt-2">Cities Covered</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">15+</h3>
            <p className="text-gray-600 mt-2">Years Experience</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
                <div className="flex mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-gray-600 mb-4">HomeNest helped me find my dream home. The process was smooth and professional.</p>
                <div className="flex items-center">
                  <img src={`https://i.pravatar.cc/40?img=${i}`} alt="Client" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-semibold">Client {i}</p>
                    <p className="text-sm text-gray-500">Property Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;