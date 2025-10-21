import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDashboardLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

import { 
  FaClipboardList, 
  FaBuilding, 
  FaSitemap, 
  FaTasks, 
  FaWarehouse, 
  FaMapMarkedAlt,
  FaCode
} from "react-icons/fa"; 

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: RiDashboardLine, 
  },
  {
    name: "Material Request",
    href: "/material-request",
    icon: FaClipboardList, 
  },
  {
    name: "Users & Team",
    href: "/users&team",
    icon: FaClipboardList, 
  },
  {
    name: "Project",
    href: "/project",
    icon: FaCode, 
  },
  {
    name: "Companies",
    href: "/companies",
    icon: FaBuilding, 
  },
  {
    name: "Departments",
    href: "/departments",
    icon: FaSitemap, 
  },
  {
    name: "Activities",
    href: "/activities",
    icon: FaTasks, 
  },
  {
    name: "Warehouses",
    href: "/warehouses",
    icon: FaWarehouse, 
  },
  {
    name: "Regions",
    href: "/regions",
    icon: FaMapMarkedAlt, 
  },
];

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          h-screen w-[320px] bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="px-6 py-5 flex items-center justify-between">
          <div className="w-full text-center">
            <h1
              className="
                text-red-600 
                text-4xl 
                font-playwrite 
                font-extrabold 
                drop-shadow-md 
              "
            >
              Buildmart
            </h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-600 hover:text-gray-800 p-1"
          >
            <IoMdClose className="text-[24px]" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href;
              
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200
                      ${isActive 
                        ? "bg-red-600 text-white" 
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#d92335]"
                      }
                    `}
                    onClick={onClose}
                  >
                    <link.icon className="text-[20px]" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;