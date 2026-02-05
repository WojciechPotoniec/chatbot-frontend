import axios from 'axios'

// Get base URL from environment variables
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// Create axios instance with default config
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout for chat responses
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (will be set by AuthContext)
    const token = localStorage.getItem('access_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response

      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('access_token')
        window.location.href = '/login'
      }

      // Log error for debugging
      console.error('API Error:', {
        status,
        message: data.message || data.detail || 'Unknown error',
        url: error.config.url
      })
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error: No response from server')
    } else {
      // Something else happened
      console.error('Request Error:', error.message)
    }

    return Promise.reject(error)
  }
)

// API endpoints
export const chatAPI = {
  // Send message to chatbot
  sendMessage: (conversationId, message) =>
    api.post('/chat', { conversation_id: conversationId, message }),

  // Get all conversations for current user
  getConversations: () =>
    api.get('/conversations'),

  // Get messages for specific conversation
  getMessages: (conversationId) =>
    api.get(`/conversations/${conversationId}/messages`),

  // Create new conversation
  createConversation: (title) =>
    api.post('/conversations', { title }),

  // Delete conversation
  deleteConversation: (conversationId) =>
    api.delete(`/conversations/${conversationId}`),
}

export default api
