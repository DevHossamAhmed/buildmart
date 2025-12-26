"use client";
import HeaderBar from "@/components/layout/HeaderBar";
import SideBar from "@/components/layout/SideBar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { BreadcrumbProvider } from "@/contexts/BreadcrumbContext";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <BreadcrumbProvider>
      <div className="min-h-screen bg-gray-50">
        <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <div className="lg:ml-[280px] xl:ml-[320px]">
          <HeaderBar onMenuClick={toggleSidebar} />

          <main className="px-4 sm:px-5 md:px-6 lg:px-8 pt-14 sm:pt-16 md:pt-20 pb-6 sm:pb-8 min-h-screen overflow-y-auto">
            <div className="mt-4 sm:mt-6 md:mt-8 mb-3 sm:mb-4 md:mb-6">
              <Breadcrumb />
            </div>
            {children}
          </main>
        </div>
      </div>
    </BreadcrumbProvider>
  );
}