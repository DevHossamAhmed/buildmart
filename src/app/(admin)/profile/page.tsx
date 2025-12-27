"use client";

import React, { useState } from "react";
import {
  User,
  Lock,
  Shield,
  Palette,
  Save,
} from "lucide-react";
import PageHeaderWrapper from "@/components/ui/PageHeaderWrapper";
import Button from "@/components/ui/Button";
import UpdateProfileTab from "./components/UpdateProfileTab";
import ChangePasswordTab from "./components/ChangePasswordTab";
import SecurityTab from "./components/SecurityTab";
import AppearanceTab from "./components/AppearanceTab";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "password" | "security" | "appearance">(
    "profile"
  );

  const tabs = [
    {
      id: "profile",
      label: "Update Profile",
      icon: User,
      color: "blue",
    },
    {
      id: "password",
      label: "Change Password",
      icon: Lock,
      color: "green",
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      color: "red",
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: Palette,
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <PageHeaderWrapper
        title="Profile Settings"
        description="Manage your profile information, security settings, and preferences"
        sticky={true}
        zIndex={40}
        actions={
          <Button
            variant="primary"
            size="md"
            leftIcon={<Save className="w-4 h-4" />}
            style={{ backgroundColor: "#d92335" }}
          >
            Save All Changes
          </Button>
        }
      >
        {/* Tabs */}
        <div className="flex border-b border-gray-200 -mb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-medium transition-all ${
                  activeTab === tab.id
                    ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <Icon className="text-[20px]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </PageHeaderWrapper>

      {/* Content Area */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Update Profile Tab */}
          {activeTab === "profile" && <UpdateProfileTab />}

          {/* Change Password Tab */}
          {activeTab === "password" && <ChangePasswordTab />}

          {/* Security Tab */}
          {activeTab === "security" && <SecurityTab />}

          {/* Appearance Tab */}
          {activeTab === "appearance" && <AppearanceTab />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

