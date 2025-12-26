"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { generateBreadcrumbs } from "@/utils/breadcrumbs";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
  customLabels?: Record<string, string>;
  useContext?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  className = "",
  customLabels,
  useContext: useContextBreadcrumbs = true,
}) => {
  const pathname = usePathname();
  let contextBreadcrumbs: BreadcrumbItem[] = [];

  // Try to use context breadcrumbs if available
  if (useContextBreadcrumbs) {
    try {
      const context = useBreadcrumbContext();
      contextBreadcrumbs = context.breadcrumbs;
    } catch {
      // Context not available, use default behavior
    }
  }

  // Priority: items prop > context breadcrumbs > generated breadcrumbs
  const breadcrumbs =
    items ||
    (contextBreadcrumbs.length > 0
      ? contextBreadcrumbs
      : generateBreadcrumbs(pathname, customLabels));

  if (breadcrumbs.length === 0) return null;

  if (breadcrumbs.length === 0) return null;

  return (
    <nav
      className={`flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mx-1 sm:mx-2 flex-shrink-0" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1 py-1"
                >
                  {index === 0 && showHome && (
                    <Home className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  )}
                  <span className="truncate max-w-[100px] sm:max-w-[150px] md:max-w-none">
                    {item.label}
                  </span>
                </Link>
              ) : (
                <span
                  className="text-gray-900 font-medium flex items-center gap-1 py-1"
                  aria-current="page"
                >
                  {index === 0 && showHome && (
                    <Home className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  )}
                  <span className="truncate max-w-[100px] sm:max-w-[150px] md:max-w-none">
                    {item.label}
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

