import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { LogIn } from 'lucide-react';

const LoginPage = ({ showToast }) => {
  const { login, googleLogin } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      showToast('Please fill all fields', 'error');
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      showToast('Login successful!', 'success');
      navigate(from, { replace: true });
    } catch (error) {
      showToast(error.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      showToast('Google login successful!', 'success');
      navigate(from, { replace: true });
    } catch (error) {
      showToast(error.message || 'Google login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <div className={`max-w-md w-full p-8 rounded-lg shadow-xl ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
      }`}>
        <div className="text-center mb-8">
          <LogIn className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h2 className="text-3xl font-bold">Login to HomeNest</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full px-4 py-2 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
              }`}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-semibold">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className={`w-full px-4 py-2 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
              }`}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>Or continue with</span>
            </div>
          </div>
          
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`mt-4 w-full py-3 border-2 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center justify-center space-x-2 ${
              theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300'
            } disabled:opacity-50`}
          >
            <span>🔍</span>
            <span>Google</span>
          </button>
        </div>
        
        <p className="mt-6 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;