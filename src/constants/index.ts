// Application Constants

export const APP_NAME = 'Buildmart';
export const APP_VERSION = '1.0.0';

// Status Options
export const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
] as const;

// Common Status Colors
export const STATUS_COLORS = {
  active: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-300',
  },
  inactive: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-300',
  },
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    border: 'border-yellow-300',
  },
  completed: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-300',
  },
  cancelled: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-300',
  },
} as const;

// Date Formats
export const DATE_FORMATS = {
  display: 'MMM DD, YYYY',
  input: 'YYYY-MM-DD',
  datetime: 'MMM DD, YYYY HH:mm',
  time: 'HH:mm',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

// API Endpoints (if needed)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  USERS: '/api/users',
  COMPANIES: '/api/companies',
  CATEGORIES: '/api/categories',
  PROJECTS: '/api/projects',
} as const;

// Validation Rules
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  PASSWORD_MIN_LENGTH: 8,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  GENERIC: 'Something went wrong. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Successfully created',
  UPDATED: 'Successfully updated',
  DELETED: 'Successfully deleted',
  SAVED: 'Successfully saved',
} as const;

