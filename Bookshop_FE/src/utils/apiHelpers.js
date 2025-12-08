/**
 * API Response Helpers
 * Utilities for handling and validating API responses
 */

/**
 * Extract data from API response
 * Handles both mock server and real backend response formats
 * 
 * @template T
 * @param {import('axios').AxiosResponse} response - Axios response
 * @param {string} [dataKey='data'] - Key to extract data from
 * @returns {T} - Extracted data
 */
export const extractData = (response, dataKey = 'data') => {
  // Handle nested data (mock server format: { data: { data: [...] } })
  if (response.data && response.data[dataKey] !== undefined) {
    return response.data[dataKey]
  }
  
  // Handle direct data (real backend format: { data: [...] })
  return response.data
}

/**
 * Check if API response indicates success
 * @param {Object} responseData - Response data object
 * @returns {boolean}
 */
export const isSuccessResponse = (responseData) => {
  return responseData?.success !== false
}

/**
 * Extract error message from API error
 * @param {Error|Object} error - Error object
 * @param {string} [defaultMessage='Đã xảy ra lỗi'] - Default error message
 * @returns {string} - Error message
 */
export const extractErrorMessage = (error, defaultMessage = 'Đã xảy ra lỗi') => {
  // Axios error with response
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  
  // Axios error without response (network error)
  if (error.message) {
    return error.message
  }
  
  // Unknown error
  return defaultMessage
}

/**
 * Extract validation errors from API response
 * @param {Error|Object} error - Error object
 * @returns {Array<string>} - Array of error messages
 */
export const extractValidationErrors = (error) => {
  if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
    return error.response.data.errors
  }
  return []
}

/**
 * Create standardized API error
 * @param {string} message - Error message
 * @param {number} [statusCode] - HTTP status code
 * @param {Array<string>} [errors] - Validation errors
 * @returns {Object}
 */
export const createApiError = (message, statusCode = 500, errors = []) => {
  return {
    success: false,
    message,
    statusCode,
    errors
  }
}

/**
 * Validate token exists in localStorage
 * @returns {boolean}
 */
export const hasValidToken = () => {
  const token = localStorage.getItem('access_token')
  return !!token && token !== 'undefined' && token !== 'null'
}

/**
 * Get stored user data
 * @returns {import('../types/api.types').User|null}
 */
export const getStoredUser = () => {
  try {
    const userStr = localStorage.getItem('user')
    if (!userStr || userStr === 'undefined') return null
    return JSON.parse(userStr)
  } catch (error) {
    console.error('Error parsing stored user:', error)
    return null
  }
}

/**
 * Clear authentication data from storage
 */
export const clearAuthData = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
}

/**
 * Store authentication data
 * @param {string} token - Access token
 * @param {import('../types/api.types').User} user - User data
 */
export const storeAuthData = (token, user) => {
  if (!token) {
    throw new Error('Token is required')
  }
  localStorage.setItem('access_token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

/**
 * Handle API response with consistent error handling
 * @template T
 * @param {Promise} apiCall - API call promise
 * @param {Object} [options] - Options
 * @param {string} [options.successMessage] - Success message to show
 * @param {string} [options.errorMessage] - Default error message
 * @param {Function} [options.onSuccess] - Success callback
 * @param {Function} [options.onError] - Error callback
 * @returns {Promise<{success: boolean, data?: T, error?: string}>}
 */
export const handleApiCall = async (apiCall, options = {}) => {
  const {
    successMessage,
    errorMessage = 'Đã xảy ra lỗi',
    onSuccess,
    onError
  } = options

  try {
    const response = await apiCall
    const data = extractData(response)
    
    if (successMessage && typeof message !== 'undefined') {
      // If Ant Design message is available
      message?.success(successMessage)
    }
    
    if (onSuccess) {
      onSuccess(data)
    }
    
    return { success: true, data }
  } catch (error) {
    const errorMsg = extractErrorMessage(error, errorMessage)
    
    if (typeof message !== 'undefined') {
      message?.error(errorMsg)
    }
    
    if (onError) {
      onError(errorMsg, error)
    }
    
    return { success: false, error: errorMsg }
  }
}

export default {
  extractData,
  isSuccessResponse,
  extractErrorMessage,
  extractValidationErrors,
  createApiError,
  hasValidToken,
  getStoredUser,
  clearAuthData,
  storeAuthData,
  handleApiCall
}
