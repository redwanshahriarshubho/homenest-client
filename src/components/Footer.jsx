import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Building2, Mail, Phone, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'} mt-16`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold">HomeNest</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner in finding the perfect property. We connect buyers, sellers, and renters with their dream homes.
            </p>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>info@homenest.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-8900</span>
              </div>
            </div>
            <div className="mt-4">
              <a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a>
            </div>
          </div>
          
          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-gray-700 rounded-full hover:bg-blue-600 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-700 rounded-full hover:bg-blue-400 transition"
                aria-label="Twitter/X"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-700 rounded-full hover:bg-blue-700 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} HomeNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;