// Common Types
export type Status = 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled';

export interface BaseEntity {
  id: string | number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

// UI Component Types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type InputSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

// Table Types
export interface TableColumn<T = any> {
  header: string;
  accessor: keyof T | string;
  className?: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  showActions?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'date' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// API Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Filter Types
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'date' | 'dateRange' | 'search';
  options?: FilterOption[];
}

