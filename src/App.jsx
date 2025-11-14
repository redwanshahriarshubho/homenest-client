import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useState } from 'react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import PrivateRoute from './routes/PrivateRoute'; // Ensure single file here

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AllPropertiesPage from './pages/AllPropertiesPage';
import AddPropertyPage from './pages/AddPropertyPage';
import MyPropertiesPage from './pages/MyPropertiesPage';
import UpdatePropertyPage from './pages/UpdatePropertyPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import MyRatingsPage from './pages/MyRatingsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    // Auto-hide after 3s
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage showToast={showToast} />} />
                <Route path="/properties" element={<AllPropertiesPage showToast={showToast} />} />
                <Route path="/property/:id" element={<PropertyDetailsPage showToast={showToast} />} /> {/* Public */}
                
                {/* Auth Routes (no Navbar if desired, but keeping for consistency) */}
                <Route path="/login" element={<LoginPage showToast={showToast} />} />
                <Route path="/register" element={<RegisterPage showToast={showToast} />} />
                
                {/* Protected Routes */}
                <Route
                  path="/add-property"
                  element={
                    <PrivateRoute>
                      <AddPropertyPage showToast={showToast} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/my-properties"
                  element={
                    <PrivateRoute>
                      <MyPropertiesPage showToast={showToast} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/update-property/:id"
                  element={
                    <PrivateRoute>
                      <UpdatePropertyPage showToast={showToast} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/my-ratings"
                  element={
                    <PrivateRoute>
                      <MyRatingsPage showToast={showToast} />
                    </PrivateRoute>
                  }
                />
                
                {/* Catch-all 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>

          {/* Global Toast */}
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;