const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ========== PROPERTY API CALLS ==========

export const getAllProperties = async (searchTerm = '', sortBy = '') => {
  try {
    let url = `${API_URL}/api/properties?`;
    if (searchTerm) url += `search=${searchTerm}&`;
    if (sortBy) url += `sort=${sortBy}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch properties');
    return await response.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const getFeaturedProperties = async () => {
  try {
    const response = await fetch(`${API_URL}/api/properties/featured`);
    if (!response.ok) throw new Error('Failed to fetch featured properties');
    return await response.json();
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    throw error;
  }
};

export const getPropertyById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/properties/${id}`);
    if (!response.ok) throw new Error('Property not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
};

export const getUserProperties = async (email) => {
  try {
    const response = await fetch(`${API_URL}/api/properties/user/${email}`);
    if (!response.ok) throw new Error('Failed to fetch user properties');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user properties:', error);
    throw error;
  }
};

export const addProperty = async (propertyData) => {
  try {
    const response = await fetch(`${API_URL}/api/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });
    if (!response.ok) throw new Error('Failed to add property');
    return await response.json();
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};

export const updateProperty = async (id, propertyData) => {
  try {
    const response = await fetch(`${API_URL}/api/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });
    if (!response.ok) throw new Error('Failed to update property');
    return await response.json();
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

export const deleteProperty = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/properties/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete property');
    return await response.json();
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};

// ========== RATING API CALLS ==========

export const getPropertyRatings = async (propertyId) => {
  try {
    const response = await fetch(`${API_URL}/api/ratings/property/${propertyId}`);
    if (!response.ok) throw new Error('Failed to fetch ratings');
    return await response.json();
  } catch (error) {
    console.error('Error fetching ratings:', error);
    throw error;
  }
};

export const getUserRatings = async (email) => {
  try {
    const response = await fetch(`${API_URL}/api/ratings/user/${email}`);
    if (!response.ok) throw new Error('Failed to fetch user ratings');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user ratings:', error);
    throw error;
  }
};

export const addRating = async (ratingData) => {
  try {
    const response = await fetch(`${API_URL}/api/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ratingData),
    });
    if (!response.ok) throw new Error('Failed to add rating');
    return await response.json();
  } catch (error) {
    console.error('Error adding rating:', error);
    throw error;
  }
};