import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Home, Building2, PlusCircle, ListChecks, Star, LogIn, UserPlus, Menu, X, Sun, Moon, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigation = [
    { name: 'Home', icon: Home, path: '/', protected: false },
    { name: 'All Properties', icon: Building2, path: '/properties', protected: false },
    { name: 'Add Property', icon: PlusCircle, path: '/add-property', protected: true },
    { name: 'My Properties', icon: ListChecks, path: '/my-properties', protected: true },
    { name: 'My Ratings', icon: Star, path: '/my-ratings', protected: true },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg sticky top-0 z-40`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer">
            <Building2 className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">HomeNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              (!item.protected || user) && (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${
                    theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            ))}
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="relative">
                <img
                  src={user.photoURL || 'https://via.placeholder.com/40'}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-600"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } py-2 z-50`}>
                    <div className={`px-4 py-2 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                      <p className="font-semibold">{user.displayName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className={`w-full px-4 py-2 text-left flex items-center space-x-2 ${
                        theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`md:hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} pb-4`}>
          {navigation.map((item) => (
            (!item.protected || user) && (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`w-full flex items-center space-x-2 px-4 py-3 ${
                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          ))}
          
          {!user && (
            <>
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="w-full px-4 py-3 text-left block"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                onClick={() => setIsMenuOpen(false)}
                className="w-full px-4 py-3 text-left block"
              >
                Sign Up
              </Link>
            </>
          )}
          
          {user && (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-3 text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;