import api from './api';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const authService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  // ✅ Login - FIXED to send form data instead of JSON
  async login(username, password) {
    console.log('🔐 [authService] login() called with:', { username });

    try {
      console.log('📤 Sending login request to /api/auth/login...');
      
      // Create URLSearchParams for form-encoded data
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await api.post(
        '/api/auth/login',
        formData,
        { 
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded' 
          } 
        }
      );

      console.log('📥 Login response received:', response.data);

      if (response.data.access_token) {
        console.log('✅ Access token received, saving to localStorage');
        this.setToken(response.data.access_token);
        await this.fetchUserData();
      } else {
        console.warn('⚠️ No access_token found in login response');
      }

      return response.data;
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // ✅ Register
  async register(userData) {
    console.log('📝 [authService] register() called with:', userData);
    try {
      console.log('📤 Sending registration request to /api/auth/register...');
      const response = await api.post('/api/auth/register', userData);
      console.log('📥 Register response received:', response.data);

      if (response.status === 200 || response.status === 201) {
        console.log('✅ Registration request successful');
      } else {
        console.warn('⚠️ Unexpected status code:', response.status);
      }

      return response.data;
    } catch (error) {
      console.error('🔥 Registration request failed:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      return { success: false, error: error.response?.data?.detail || 'Registration failed' };
    }
  },

  // ✅ Logout
  logout() {
    console.log('🚪 [authService] Logging out...');
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // ✅ Get current user
  async getCurrentUser() {
    console.log('👤 [authService] getCurrentUser() called');
    try {
      const response = await api.get('/api/auth/me');
      console.log('📥 Current user fetched:', response.data);
      this.setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to fetch current user:', error.response?.data || error.message);
      this.logout();
      throw error;
    }
  },

  // ✅ Fetch and store user data
  async fetchUserData() {
    console.log('📦 [authService] fetchUserData() started');
    try {
      const user = await this.getCurrentUser();
      console.log('✅ User data fetched successfully:', user);
      return user;
    } catch (error) {
      console.error('🔥 Failed to fetch user data:', error);
      throw error;
    }
  },

  // ✅ Token management
  setToken(token) {
    console.log('💾 [authService] Storing token...');
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('🔑 [authService] getToken() ->', token ? 'Token found' : 'No token');
    return token;
  },

  // ✅ User data management
  setUser(user) {
    console.log('💾 [authService] Saving user data to localStorage');
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem(USER_KEY);
    console.log('👀 [authService] getUser() ->', user ? 'User found' : 'No user');
    return user ? JSON.parse(user) : null;
  },

  // ✅ Check if authenticated
  isAuthenticated() {
    const isAuth = !!this.getToken();
    console.log('🔍 [authService] isAuthenticated() ->', isAuth);
    return isAuth;
  }
};

// ✅ Interceptor: Add token to requests
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('📡 [Interceptor] Added Authorization header');
      } else {
        console.warn('⚠️ [Interceptor] No token found for request');
      }
    } catch (err) {
      console.error('❌ [Interceptor] Token fetch failed:', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor: Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('🚫 [Interceptor] 401 Unauthorized — logging out');
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default authService;