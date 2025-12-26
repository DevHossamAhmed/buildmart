"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaBell,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

export interface Notification {
  id: string | number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: "info" | "success" | "warning" | "error";
  onClick?: () => void;
  href?: string;
}

interface NotificationDropdownProps {
  trigger: React.ReactNode;
  notifications: Notification[];
  onMarkAsRead?: (id: string | number) => void;
  onViewAll?: () => void;
  className?: string;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  trigger,
  notifications,
  onMarkAsRead,
  onViewAll,
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

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    if (notification.href) {
      router.push(notification.href);
    } else if (notification.onClick) {
      notification.onClick();
    }
    setIsOpen(false);
  };

  const getNotificationIcon = (type?: string) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="w-4 h-4 text-success" />;
      case "warning":
        return <FaExclamationCircle className="w-4 h-4 text-warning" />;
      case "error":
        return <FaExclamationCircle className="w-4 h-4 text-error" />;
      default:
        return <FaInfoCircle className="w-4 h-4 text-info" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fade-in max-h-[80vh] sm:max-h-96 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="px-1.5 sm:px-2 py-0.5 bg-primary text-white text-[10px] sm:text-xs font-medium rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 sm:py-12 text-center text-xs sm:text-sm text-gray-500">
                  No notifications
                </div>
              ) : (
                <div className="py-1">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors border-l-2 ${
                        notification.read
                          ? "border-transparent"
                          : "border-primary"
                      }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs sm:text-sm font-medium ${
                              notification.read ? "text-gray-600" : "text-gray-900"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mt-2" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {onViewAll && notifications.length > 0 && (
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    onViewAll();
                    setIsOpen(false);
                  }}
                  className="w-full text-center text-xs sm:text-sm text-primary hover:text-primary-dark font-medium"
                >
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;

