import { BreadcrumbItem } from "@/components/ui/Breadcrumb";

// Route to label mapping for better breadcrumb labels
const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  "material-request": "Material Request",
  "users&team": "Users & Teams",
  categories: "Categories",
  project: "Projects",
  projects: "Projects",
  settings: "Settings",
  companies: "Companies",
  departments: "Departments",
  wbs: "WBS",
  warehouses: "Warehouses",
  regions: "Regions",
  "cost-code": "Cost Code",
  vendor: "Vendor",
  "vendor-setting": "Vendor Settings",
  "approval-work-flow": "Approval Workflow",
  "approval-workflow": "Approval Workflow",
  rfbs: "RFBs",
  "rfbs-details": "RFBs Details",
  auth: "Authentication",
  login: "Login",
  "sign-up": "Sign Up",
  "forgot-password": "Forgot Password",
};

/**
 * Generate breadcrumb items from a pathname
 */
export const generateBreadcrumbs = (
  pathname: string,
  customLabels?: Record<string, string>,
  dynamicLabels?: Record<string, string>
): BreadcrumbItem[] => {
  const labels = { ...ROUTE_LABELS, ...customLabels };
  const paths = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Skip breadcrumb for root or dashboard (already at home)
  if (pathname === "/" || pathname === "/dashboard") {
    return [{ label: "Dashboard", href: undefined }];
  }

  // Add home/dashboard
  breadcrumbs.push({ label: "Home", href: "/dashboard" });

  // Build breadcrumbs from path segments
  let currentPath = "";
  paths.forEach((path, index) => {
    currentPath += `/${path}`;

    // Handle dynamic routes - use custom label if provided
    if (dynamicLabels && dynamicLabels[path]) {
      const isLast = index === paths.length - 1;
      breadcrumbs.push({
        label: dynamicLabels[path],
        href: isLast ? undefined : currentPath,
      });
      return;
    }

    // Skip if it's a UUID or numeric ID (dynamic route value)
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(path) || /^\d+$/.test(path)) {
      // Use custom label if provided, otherwise skip
      if (dynamicLabels && dynamicLabels[currentPath]) {
        const isLast = index === paths.length - 1;
        breadcrumbs.push({
          label: dynamicLabels[currentPath],
          href: isLast ? undefined : currentPath,
        });
      }
      return;
    }

    // Get label from mapping or format it
    const label =
      labels[path] ||
      path
        .split(/[-_&]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    // Last item is current page (no href)
    const isLast = index === paths.length - 1;
    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath,
    });
  });

  return breadcrumbs;
};

/**
 * Get a friendly label for a route segment
 */
export const getRouteLabel = (segment: string): string => {
  return ROUTE_LABELS[segment] || segment;
};

