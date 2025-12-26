"use client";

import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import Image from "next/image";
import User from "../../../public/assets/images/user.png";
import Dropdown, { DropdownItem } from "../ui/Dropdown";
import NotificationDropdown, { Notification } from "../ui/NotificationDropdown";

interface HeaderBarProps {
  onMenuClick: () => void;
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  onMenuClick,
  user = { name: "mahmoud", email: "mahmoud@example.com" },
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Material Request",
      message: "A new material request has been submitted for review",
      time: "2 minutes ago",
      read: false,
      type: "info",
    },
    {
      id: 2,
      title: "Approval Required",
      message: "Your approval is required for Project ABC - Material Request MR-2024-001",
      time: "1 hour ago",
      read: false,
      type: "warning",
    },
    {
      id: 3,
      title: "Task Completed",
      message: "Material Request MR-2024-001 has been completed successfully",
      time: "3 hours ago",
      read: true,
      type: "success",
    },
    {
      id: 4,
      title: "System Update",
      message: "New features have been added to the dashboard",
      time: "1 day ago",
      read: true,
      type: "info",
    },
  ]);

  const userMenuItems: DropdownItem[] = [
    {
      label: "Profile",
      icon: <FaUser className="w-4 h-4" />,
      href: "/profile",
    },
    {
      label: "Settings",
      icon: <FaCog className="w-4 h-4" />,
      href: "/settings",
    },
    {
      divider: true,
      label: "",
    },
    {
      label: "Logout",
      icon: <FaSignOutAlt className="w-4 h-4" />,
      onClick: () => {
        console.log("Logout clicked");
        // Add logout logic here
      },
      danger: true,
    },
  ];

  const handleMarkAsRead = (id: string | number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const handleViewAllNotifications = () => {
    console.log("View all notifications");
    // Navigate to notifications page
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const userTrigger = (
    <div className="flex items-center cursor-pointer hover:bg-gray-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-colors">
      <Image
        src={user.image || User}
        alt="User"
        width={32}
        height={32}
        className="rounded-full mr-2 sm:mr-3 w-7 h-7 sm:w-8 sm:h-8"
      />
      <div className="hidden sm:block mr-2">
        <h2 className="text-sm sm:text-base font-medium text-gray-900">
          {user.name || "User"}
        </h2>
        {user.email && (
          <p className="text-xs text-gray-500 hidden md:block">{user.email}</p>
        )}
      </div>
      <IoIosArrowDown className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
    </div>
  );

  const notificationTrigger = (
    <div className="relative cursor-pointer hover:text-primary transition-colors p-2 sm:p-2.5 rounded-md hover:bg-gray-50">
      <IoMdNotificationsOutline className="text-lg sm:text-xl text-gray-700" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-primary text-white text-[10px] sm:text-xs font-bold rounded-full">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </div>
  );

  return (
    <div className="fixed top-0 right-0 z-[999] bg-white border-b border-gray-200 left-0 lg:left-[320px] shadow-sm">
      <div className="w-full flex justify-between lg:justify-end items-center py-3 sm:py-4 px-4 sm:px-5 md:px-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-700 hover:text-primary p-2 -ml-2 rounded-md hover:bg-gray-50 transition-colors"
          aria-label="Toggle menu"
        >
          <HiMenuAlt2 className="text-xl sm:text-2xl" />
        </button>

        <div className="flex gap-2 sm:gap-3 lg:pr-6 xl:pr-8 items-center">
          {/* Notifications Dropdown */}
          <NotificationDropdown
            trigger={notificationTrigger}
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onViewAll={handleViewAllNotifications}
            className="mr-1 sm:mr-2"
          />

          {/* User Dropdown */}
          <Dropdown
            trigger={userTrigger}
            items={userMenuItems}
            align="right"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;