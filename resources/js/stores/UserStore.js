import { defineStore } from 'pinia';
import axios from 'axios';

// Fetch the base API URL from the environment variable
const apiBaseUrl = "https://vuejsreg.in/api";

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {},  // Restore user data from localStorage
      token: localStorage.getItem('authToken') || null,      // Restore token from localStorage
      users: [],  // Stores the list of users
    };
  },

  getters: {
    // Getter: Returns the current user
    getUser(state) {
      return state.user;
    },

    // Getter: Returns the authentication token
    getToken(state) {
      return state.token;
    },

    // Getter: Returns all users
    getUsers(state) {
      return state.users;
    },

    // Check if the user is authenticated
    isAuthenticated(state) {
      return !!state.token;
    }
  },

  actions: {
    async loginUser(credentials) {
      try {
        const response = await axios.post(`${apiBaseUrl}/users/login`, credentials);
    
        // Assuming the response contains a user object and a token inside `data`
        if (response.data.user && response.data.token) {
          this.user = response.data.user;   // Save user data to state
          this.token = response.data.token; // Save the token to state
          // Store user and token in localStorage
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          console.log("I am logged in");
          return response; // Returning the whole response to include status
        } else {
          return "Not Logged in";
        }
      } catch (error) {
        console.error('Error logging in:', error);
        return error.response; // Returning the error response to handle it in the component
      }
    },
    // Method to verify if the token is still valid
    async verifyToken() {
      const token = localStorage.getItem('authToken');
      if (!token) return false;

      try {
        const response = await axios.get(`${apiBaseUrl}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // If the request is successful, token is valid
        return true;
      } catch (error) {
        // If there is an error, the token might be invalid or expired
        console.error('Token verification failed:', error);
        this.logout(); // Clear user data and localStorage if token is invalid
        return false;
      }
    },

    // Action: Logout user
    logout() {
      this.user = {};
      this.token = null;

      // Clear user and token from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },

    // Action: Fetch all users with pagination
    async fetchUsers(page = 1, limit = 10) {
      try {
        const response = await axios.get(`${apiBaseUrl}/users?page=${page}&limit=${limit}`);
        this.users = response.data.data;
        return true;
      } catch (error) {
        console.error('Error fetching users:', error);
        return false;
      }
    },

    // Action: Fetch a user by ID
    async fetchUserById(id) {
      try {
        const response = await axios.get(`${apiBaseUrl}/users/${id}`);
        this.user = response.data;
        return response.data;
      } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        return null;
      }
    },

    // Action: Add a new user
    async addUser(newUser) {
      try {
        const response = await axios.post(`${apiBaseUrl}/users/add`, newUser);
        return response.data;
      } catch (error) {
        console.error('Error adding user:', error);
        return error;
      }
    },

    // Action: Update a user by ID
    async updateUser(id, updatedUser) {
      try {
        const response = await axios.put(`${apiBaseUrl}/users/${id}`, updatedUser);
        return response.data;
      } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        return null;
      }
    },

    // Action: Delete a user by ID
    async deleteUser(id) {
      try {
        const response = await axios.delete(`${apiBaseUrl}/users/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        return null;
      }
    },

    // Action: Auto-fetch user info if token exists
    async fetchUserOnLoad() {
      const token = localStorage.getItem('authToken');
      if (token) {
        const isValid = await this.verifyToken(); // Verify if the token is valid
        if (isValid) {
          try {
            const response = await axios.get(`${apiBaseUrl}/users/me`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            this.user = response.data; // Set the user if the token is valid
          } catch (error) {
            console.error('Error fetching logged-in user data:', error);
          }
        } else {
          this.logout(); // Logout if the token is invalid
        }
      }
    }
    
  }
});
