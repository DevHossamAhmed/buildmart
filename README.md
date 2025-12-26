# Buildmart - Enterprise Construction Management System

A scalable, modern construction management application built with Next.js, TypeScript, and Tailwind CSS.

## 🏗️ Architecture

### Design System
- **CSS Variables**: Centralized design tokens in `globals.css`
- **Tailwind Config**: Extended with custom colors, spacing, and utilities
- **Component Library**: Reusable UI components in `src/components/ui/`

### Project Structure
```
src/
├── app/                    # Next.js app router pages
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components
│   ├── dashboard/          # Dashboard-specific components
│   └── rfbs-ui/            # RFBs-specific components
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
├── hooks/                  # Custom React hooks
└── constants/              # Application constants
```

## 🎨 Design System

### Colors
- **Primary**: `#d92335` (Red)
- **Success**: `#10b981` (Green)
- **Error**: `#ef4444` (Red)
- **Warning**: `#f59e0b` (Amber)
- **Info**: `#3b82f6` (Blue)

### Typography
- **Sans**: System UI font stack
- **Playwrite**: Custom font for branding

## 📦 Reusable Components

### Button
```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`  
**Sizes**: `sm`, `md`, `lg`

### Input
```tsx
import { Input } from "@/components/ui";

<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  error={errors.email}
  leftIcon={<MailIcon />}
/>
```

### Select
```tsx
import { Select } from "@/components/ui";

<Select
  label="Status"
  options={[
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" }
  ]}
/>
```

### Badge
```tsx
import { Badge } from "@/components/ui";

<Badge variant="success">Active</Badge>
```

### DataTable
```tsx
import { DataTable } from "@/components/ui";

<DataTable
  columns={columns}
  data={data}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
  pagination={{
    currentPage: 1,
    totalPages: 10,
    onPageChange: setPage
  }}
/>
```

### PageHeader
```tsx
import { PageHeader } from "@/components/ui";

<PageHeader
  title="Companies"
  description="Manage your companies"
  onAdd={handleAdd}
  addButtonText="Add Company"
/>
```

### SearchBar & FilterBar
```tsx
import { SearchBar, FilterBar } from "@/components/ui";

<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Search companies..."
/>

<FilterBar
  filters={filterConfig}
  values={filterValues}
  onChange={handleFilterChange}
/>
```

## 🛠️ Utilities

### Format Functions
```tsx
import { formatDate, formatCurrency, formatNumber } from "@/utils";

formatDate("2024-01-15", "short"); // "Jan 15, 2024"
formatCurrency(1234.56); // "SAR 1,234.56"
formatNumber(1234567); // "1,234,567"
```

### Validation
```tsx
import { isValidEmail, isValidPhone } from "@/utils";

isValidEmail("test@example.com"); // true
isValidPhone("+966501234567"); // true
```

## 🎣 Custom Hooks

### useDebounce
```tsx
import { useDebounce } from "@/hooks/useDebounce";

const debouncedSearch = useDebounce(searchQuery, 500);
```

### useLocalStorage
```tsx
import { useLocalStorage } from "@/hooks/useLocalStorage";

const [value, setValue] = useLocalStorage("key", "defaultValue");
```

## 📝 TypeScript Types

All types are defined in `src/types/index.ts`:

```tsx
import { Status, ButtonVariant, TableColumn, ApiResponse } from "@/types";
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📋 Best Practices

### Component Usage
- Always use reusable UI components from `@/components/ui`
- Follow the design system color palette
- Use TypeScript types for props

### State Management
- Use custom hooks for common patterns
- Leverage `useLocalStorage` for persistent state
- Use `useDebounce` for search/filter inputs

### Styling
- Use Tailwind utility classes
- Reference CSS variables for consistent spacing/colors
- Follow the component size variants (sm, md, lg)

## 🔧 Configuration

### Constants
Application-wide constants are in `src/constants/index.ts`:
- Status options
- Status colors
- Date formats
- Validation rules
- Error messages

### Environment Variables
Create a `.env.local` file for environment-specific configuration.

## 📚 Component Examples

See individual component files in `src/components/ui/` for detailed prop documentation and examples.

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for all new components
3. Follow the design system guidelines
4. Write reusable, composable components
5. Add proper TypeScript types

## 📄 License

Private - All rights reserved
