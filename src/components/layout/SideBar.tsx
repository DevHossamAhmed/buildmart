"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDashboardLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import {
  FaClipboardList,
  FaCode,
  FaHandshake,
  FaUserCog,
  FaUsers,
  FaBox,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationLinks = [
  { name: "Dashboard", href: "/dashboard", icon: RiDashboardLine },
  { name: "Material Request", href: "/material-request", icon: FaClipboardList },
  { name: "Users & Teams", href: "/users&team", icon: FaUsers },
  { name: "Categories", href: "/categories", icon: FaBox },
  { name: "Project", href: "/project", icon: FaCode },
];

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          h-screen w-[280px] sm:w-[300px] lg:w-[320px] 
          bg-gradient-to-b from-white to-gray-50
          border-r border-gray-200/80 
          shadow-xl lg:shadow-2xl
          flex flex-col fixed top-0 left-0 z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="px-4 sm:px-5 lg:px-6 py-5 sm:py-6 flex items-center justify-between border-b border-gray-200/60 bg-white/50 backdrop-blur-sm">
          <div className="w-full text-center">
            <h1
              className="
                text-red-600 
                text-2xl sm:text-3xl lg:text-4xl 
                font-playwrite 
                font-extrabold 
                drop-shadow-lg
                tracking-tight
              "
            >
              Buildmart
            </h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 active:scale-95"
            aria-label="Close sidebar"
          >
            <IoMdClose className="text-xl sm:text-2xl" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 px-3 sm:px-4 lg:px-5 py-4 sm:py-5 lg:py-6 overflow-y-auto">
          <ul className="space-y-1.5 sm:space-y-2">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`group flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 relative
                      ${
                        isActive
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 scale-[1.02]"
                          : "text-gray-700 hover:bg-gray-100/80 hover:text-red-600 hover:shadow-md hover:scale-[1.01]"
                      }`}
                    onClick={onClose}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full opacity-80" />
                    )}
                    <link.icon
                      className={`text-lg sm:text-xl flex-shrink-0 transition-transform duration-200 ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`}
                    />
                    <span className="truncate font-semibold">{link.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </Link>
                </li>
              );
            })}


            {/* Vendor Link */}
            <li>
              <Link
                href="/vendor"
                className={`group flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 relative
                  ${
                    pathname === "/vendor"
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 scale-[1.02]"
                      : "text-gray-700 hover:bg-gray-100/80 hover:text-red-600 hover:shadow-md hover:scale-[1.01]"
                  }`}
                onClick={onClose}
              >
                {pathname === "/vendor" && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full opacity-80" />
                )}
                <FaHandshake
                  className={`text-lg sm:text-xl flex-shrink-0 transition-transform duration-200 ${
                    pathname === "/vendor" ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                <span className="truncate font-semibold">Vendor</span>
                {pathname === "/vendor" && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            </li>

            {/* Vendor Setting Link */}
            <li>
              <Link
                href="/vendor-setting"
                className={`group flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 relative
                  ${
                    pathname === "/vendor-setting"
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 scale-[1.02]"
                      : "text-gray-700 hover:bg-gray-100/80 hover:text-red-600 hover:shadow-md hover:scale-[1.01]"
                  }`}
                onClick={onClose}
              >
                {pathname === "/vendor-setting" && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full opacity-80" />
                )}
                <FaUserCog
                  className={`text-lg sm:text-xl flex-shrink-0 transition-transform duration-200 ${
                    pathname === "/vendor-setting" ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                <span className="truncate font-semibold">Vendor Setting</span>
                {pathname === "/vendor-setting" && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-3 sm:px-4 lg:px-5 py-3 sm:py-4 border-t border-gray-200/60 bg-white/50 backdrop-blur-sm space-y-2">
          {/* Settings Link */}
          <Link
            href="/settings"
            className={`w-full group flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 relative
              ${
                pathname === "/settings"
                  ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg shadow-gray-500/30 scale-[1.02]"
                  : "text-gray-700 hover:bg-gray-100/80 hover:text-gray-900 hover:shadow-md hover:scale-[1.01]"
              }`}
            onClick={onClose}
          >
            {pathname === "/settings" && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full opacity-80" />
            )}
            <FaCog
              className={`text-lg sm:text-xl flex-shrink-0 transition-transform duration-200 ${
                pathname === "/settings" ? "scale-110" : "group-hover:rotate-90 group-hover:scale-110"
              }`}
            />
            <span className="truncate">Settings</span>
            {pathname === "/settings" && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
            )}
          </Link>

          {/* Logout Button */}
          <button
            onClick={() => {
              console.log("Logout clicked");
              // Add logout logic here
              // Example: router.push("/auth/login");
            }}
            className="w-full group flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 text-red-600 hover:bg-red-50 hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
          >
            <FaSignOutAlt className="text-lg sm:text-xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span className="truncate">Logout</span>
          </button>

          {/* Copyright */}
          <div className="text-center pt-2 border-t border-gray-200/40">
            <p className="text-xs text-gray-500 font-medium">
              © 2025 Buildmart
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              Version 1.0.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
