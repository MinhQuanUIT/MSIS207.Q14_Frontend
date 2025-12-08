/**
 * API Types and Interfaces
 * Defines all data structures for API requests and responses
 * 
 * Note: These are JSDoc types for JavaScript. 
 * For full type safety, consider migrating to TypeScript.
 */

// ==================== Common Types ====================

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Indicates if request was successful
 * @property {string} [message] - Response message
 * @property {*} [data] - Response data (type varies by endpoint)
 */

/**
 * @typedef {Object} ApiError
 * @property {boolean} success - Always false for errors
 * @property {string} message - Error message
 * @property {Array<string>} [errors] - Validation errors
 */

/**
 * @typedef {Object} PaginationParams
 * @property {number} [page=1] - Page number
 * @property {number} [limit=16] - Items per page
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {boolean} success
 * @property {Array<*>} data
 * @property {number} total - Total number of items
 * @property {number} page - Current page
 * @property {number} totalPages - Total number of pages
 */

// ==================== Auth Types ====================

/**
 * @typedef {Object} User
 * @property {string|number} id - User ID
 * @property {string} name - Full name
 * @property {string} email - Email address
 * @property {string} phone - Phone number
 * @property {'user'|'admin'} role - User role
 * @property {string} [createdAt] - Creation date (ISO string)
 * @property {string} [updatedAt] - Last update date (ISO string)
 */

/**
 * @typedef {Object} RegisterRequest
 * @property {string} name - Full name (required)
 * @property {string} email - Email address (required, must be valid email)
 * @property {string} phone - Phone number (required)
 * @property {string} password - Password (required, min 6 characters)
 */

/**
 * @typedef {Object} RegisterResponse
 * @property {boolean} success
 * @property {string} message
 * @property {User} user - User data (without password)
 */

/**
 * @typedef {Object} LoginRequest
 * @property {string} email - Email address
 * @property {string} password - Password
 */

/**
 * @typedef {Object} LoginResponse
 * @property {boolean} success
 * @property {string} message
 * @property {string} access_token - JWT token
 * @property {User} user - User data
 */

/**
 * @typedef {Object} CurrentUserResponse
 * @property {boolean} success
 * @property {User} user
 */

// ==================== Book Types ====================

/**
 * @typedef {Object} Book
 * @property {string} _id - Book ID
 * @property {string} title - Book title
 * @property {string} author - Author name
 * @property {string} category - Category name
 * @property {number} price - Current price
 * @property {number} [oldPrice] - Original price (for discount calculation)
 * @property {string} image - Image URL
 * @property {number} rating - Rating (0-5)
 * @property {number} sold - Number of items sold
 * @property {string} description - Book description
 * @property {number} stock - Available stock
 * @property {Array<string>} badges - Badge labels (e.g., ["CHÍNH HÃNG", "BEST SELLER"])
 * @property {string} [createdAt] - Creation date (ISO string)
 * @property {string} [updatedAt] - Last update date (ISO string)
 */

/**
 * @typedef {Object} BookListParams
 * @property {string} [search] - Search query (title or author)
 * @property {string} [category] - Filter by category
 * @property {number} [page=1] - Page number
 * @property {number} [limit=16] - Items per page
 */

/**
 * @typedef {Object} BookListResponse
 * @property {boolean} success
 * @property {Array<Book>} data - List of books
 * @property {number} total - Total number of books
 * @property {number} page - Current page
 * @property {number} totalPages - Total pages
 */

/**
 * @typedef {Object} BookDetailResponse
 * @property {boolean} success
 * @property {Book} data - Book details
 */

// ==================== Cart Types ====================

/**
 * @typedef {Object} CartItem
 * @property {string} bookId - Book ID
 * @property {number} quantity - Quantity
 * @property {Book} book - Book details
 */

/**
 * @typedef {Object} Cart
 * @property {Array<CartItem>} items - Cart items
 * @property {number} total - Total price
 */

/**
 * @typedef {Object} CartResponse
 * @property {boolean} success
 * @property {Cart} data
 */

/**
 * @typedef {Object} AddToCartRequest
 * @property {string} bookId - Book ID (required)
 * @property {number} quantity - Quantity (required, min: 1)
 */

/**
 * @typedef {Object} AddToCartResponse
 * @property {boolean} success
 * @property {string} message
 * @property {Cart} data
 */

// ==================== Admin Types ====================

/**
 * @typedef {Object} CreateBookRequest
 * @property {string} title
 * @property {string} author
 * @property {string} category
 * @property {number} price
 * @property {number} [oldPrice]
 * @property {string} image
 * @property {string} description
 * @property {number} stock
 * @property {Array<string>} [badges]
 */

/**
 * @typedef {Object} UpdateBookRequest
 * @property {string} [title]
 * @property {string} [author]
 * @property {string} [category]
 * @property {number} [price]
 * @property {number} [oldPrice]
 * @property {string} [image]
 * @property {string} [description]
 * @property {number} [stock]
 * @property {Array<string>} [badges]
 */

// ==================== Export (for documentation only) ====================
// In a real TypeScript project, you would export these types
// For JavaScript, these JSDoc comments provide IDE autocomplete and type checking

export {} // Make this a module
