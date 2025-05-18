const API_BASE_URL = 'https://taim.pythonanywhere.com/';

export const ApiService = {
    register: async (name: string, email: string, password: string) => {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }
      return data;
    },
  
    login: async (email: string, password: string) => {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      return data;
    },
  
    logout: async () => {
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    },
    getFoodlistBasedUser: async(username: string | undefined) => {
      const response = await fetch (`${API_BASE_URL}/getFoodlistBasedUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({username}),
      });

      const data = await response.json();
      if(!response.ok) {
        throw new Error(data.message);
      }
      return data;
    }
  };