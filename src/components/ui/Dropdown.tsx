"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  divider?: boolean;
  danger?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = "right",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (item: DropdownItem) => {
    if (item.href) {
      router.push(item.href);
    } else if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`absolute ${
              align === "right" ? "right-0" : "left-0"
            } mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fade-in`}
          >
            <div className="py-1">
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  {item.divider && (
                    <div className="border-t border-gray-200 my-1" />
                  )}
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm flex items-center gap-2 sm:gap-3 transition-colors ${
                      item.danger
                        ? "text-error hover:bg-error-light"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.icon && (
                      <span className="flex-shrink-0">{item.icon}</span>
                    )}
                    <span className="truncate">{item.label}</span>
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;

