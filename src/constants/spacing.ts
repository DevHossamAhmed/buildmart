// Spacing Constants for Consistent Padding and Margins

export const SPACING = {
  // Padding
  padding: {
    xs: "p-1 sm:p-2",
    sm: "p-2 sm:p-3",
    md: "p-3 sm:p-4 md:p-5",
    lg: "p-4 sm:p-5 md:p-6",
    xl: "p-5 sm:p-6 md:p-8",
  },
  paddingX: {
    xs: "px-2 sm:px-3",
    sm: "px-3 sm:px-4",
    md: "px-4 sm:px-5 md:px-6",
    lg: "px-5 sm:px-6 md:px-8",
    xl: "px-6 sm:px-8 md:px-10",
  },
  paddingY: {
    xs: "py-1 sm:py-2",
    sm: "py-2 sm:py-3",
    md: "py-3 sm:py-4 md:py-5",
    lg: "py-4 sm:py-5 md:py-6",
    xl: "py-5 sm:py-6 md:py-8",
  },
  // Margin
  margin: {
    xs: "m-1 sm:m-2",
    sm: "m-2 sm:m-3",
    md: "m-3 sm:m-4 md:m-5",
    lg: "m-4 sm:m-5 md:m-6",
    xl: "m-5 sm:m-6 md:m-8",
  },
  marginX: {
    xs: "mx-1 sm:mx-2",
    sm: "mx-2 sm:mx-3",
    md: "mx-3 sm:mx-4 md:mx-5",
    lg: "mx-4 sm:mx-5 md:mx-6",
    xl: "mx-5 sm:mx-6 md:mx-8",
  },
  marginY: {
    xs: "my-1 sm:my-2",
    sm: "my-2 sm:my-3",
    md: "my-3 sm:my-4 md:my-5",
    lg: "my-4 sm:my-5 md:my-6",
    xl: "my-5 sm:my-6 md:my-8",
  },
  // Gap
  gap: {
    xs: "gap-1 sm:gap-2",
    sm: "gap-2 sm:gap-3",
    md: "gap-3 sm:gap-4 md:gap-5",
    lg: "gap-4 sm:gap-5 md:gap-6",
    xl: "gap-5 sm:gap-6 md:gap-8",
  },
  // Container Padding
  container: {
    mobile: "px-4",
    tablet: "sm:px-6",
    desktop: "md:px-8",
    wide: "lg:px-10",
  },
  // Section Spacing
  section: {
    mobile: "py-6",
    tablet: "sm:py-8",
    desktop: "md:py-10",
    wide: "lg:py-12",
  },
} as const;

// Responsive Breakpoints
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

