import React from "react";
import PageHeader, { PageHeaderProps } from "./PageHeader";

/**
 * PageHeaderWrapper - A reusable header component wrapper for all admin pages
 * 
 * This component provides consistent styling (white background, shadow, border) 
 * and layout for page headers across the application.
 * 
 * @example
 * // Basic usage
 * <PageHeaderWrapper
 *   title="Material Requests"
 *   description="Manage and track all material requests"
 *   onAdd={() => setIsDrawerOpen(true)}
 *   addButtonText="New Request"
 * />
 * 
 * @example
 * // With sticky header and additional content (tabs, etc.)
 * <PageHeaderWrapper
 *   title="Users & Teams"
 *   description="Manage your organization's users and teams"
 *   sticky={true}
 *   zIndex={40}
 * >
 *   <Tabs>...</Tabs>
 * </PageHeaderWrapper>
 * 
 * @example
 * // With custom actions instead of default add button
 * <PageHeaderWrapper
 *   title="Settings"
 *   description="Manage application settings"
 *   actions={
 *     <>
 *       <Button>Export</Button>
 *       <Button>Import</Button>
 *     </>
 *   }
 * />
 */
interface PageHeaderWrapperProps extends PageHeaderProps {
  /** Make header sticky at the top when scrolling */
  sticky?: boolean;
  /** Z-index for sticky header (10, 20, 30, 40, or 50) */
  zIndex?: 10 | 20 | 30 | 40 | 50;
  /** Additional CSS classes for the wrapper div */
  className?: string;
  /** Additional CSS classes for the container div */
  containerClassName?: string;
  /** Show bottom border (default: true) */
  showBorder?: boolean;
  /** Show shadow (default: true) */
  showShadow?: boolean;
  /** Additional content to render below the header (e.g., tabs, filters) */
  children?: React.ReactNode;
}

const PageHeaderWrapper: React.FC<PageHeaderWrapperProps> = ({
  sticky = false,
  zIndex = 40,
  className = "",
  containerClassName = "",
  showBorder = true,
  showShadow = true,
  children,
  title,
  description,
  actions,
  onAdd,
  addButtonText,
  ...restProps
}) => {
  const borderClass = showBorder ? "border-b border-gray-200" : "";
  const shadowClass = showShadow ? "shadow-sm" : "";
  const zIndexClasses = {
    10: "z-10",
    20: "z-20",
    30: "z-30",
    40: "z-40",
    50: "z-50",
  };
  const stickyClass = sticky ? `sticky top-0 ${zIndexClasses[zIndex]}` : "";

  return (
    <div
      className={`bg-white ${shadowClass} ${borderClass} ${stickyClass} ${className}`}
    >
      <div className={`px-4 sm:px-6 lg:px-8 py-4 sm:py-6 ${containerClassName}`}>
        <PageHeader
          title={title}
          description={description}
          actions={actions}
          onAdd={onAdd}
          addButtonText={addButtonText}
          {...restProps}
        />
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
};

export default PageHeaderWrapper;

