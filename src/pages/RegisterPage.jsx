import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus } from 'lucide-react';

const RegisterPage = ({ showToast }) => {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;
    
    if (!hasUppercase) return 'Password must contain an uppercase letter';
    if (!hasLowercase) return 'Password must contain a lowercase letter';
    if (!isLongEnough) return 'Password must be at least 6 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      showToast(passwordError, 'error');
      return;
    }

    setLoading(true);
    try {
      await register(formData.email, formData.password, formData.name, formData.photoURL);
      showToast('Registration successful!', 'success');
      navigate('/');
    } catch (error) {
      showToast(error.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      showToast('Google sign up successful!', 'success');
      navigate('/');
    } catch (error) {
      showToast(error.message || 'Google sign up failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 rounded-lg shadow-xl bg-white dark:bg-gray-800">
        <div className="text-center mb-8">
          <UserPlus className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-900 dark:text-white">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Enter your name"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-semibold text-gray-900 dark:text-white">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-semibold text-gray-900 dark:text-white">Photo URL</label>
            <input
              type="url"
              value={formData.photoURL}
              onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Enter photo URL (optional)"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-semibold text-gray-900 dark:text-white">Password *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Enter your password"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Must contain uppercase, lowercase, and be 6+ characters</p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>
          
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mt-4 w-full py-3 border-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold flex items-center justify-center space-x-2 border-gray-300 dark:border-gray-600 disabled:opacity-50"
          >
            <span>Google</span>
          </button>
        </div>
        
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;