"use client";

import React, { useState } from "react";
import { Palette, Moon, Sun, Monitor } from "lucide-react";
import Button from "@/components/ui/Button";

type Theme = "light" | "dark" | "system";
type Language = "en" | "ar";

const AppearanceTab: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("system");
  const [language, setLanguage] = useState<Language>("en");
  const [compactMode, setCompactMode] = useState(false);
  const [animations, setAnimations] = useState(true);

  const themes = [
    {
      id: "light",
      label: "Light",
      icon: Sun,
      description: "Light theme for daytime use",
    },
    {
      id: "dark",
      label: "Dark",
      icon: Moon,
      description: "Dark theme for low-light environments",
    },
    {
      id: "system",
      label: "System",
      icon: Monitor,
      description: "Follow your system preference",
    },
  ];

  const languages = [
    { id: "en", label: "English", flag: "🇬🇧" },
    { id: "ar", label: "العربية", flag: "🇸🇦" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Palette className="text-purple-600" />
          Appearance Settings
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Customize the look and feel of your application
        </p>
      </div>

      <div className="space-y-6">
        {/* Theme Selection */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Theme Preference
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isSelected = theme === themeOption.id;
              return (
                <button
                  key={themeOption.id}
                  onClick={() => setTheme(themeOption.id as Theme)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    isSelected
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon
                      className={`w-5 h-5 ${
                        isSelected ? "text-purple-600" : "text-gray-600"
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        isSelected ? "text-purple-900" : "text-gray-900"
                      }`}
                    >
                      {themeOption.label}
                    </span>
                    {isSelected && (
                      <div className="ml-auto w-2 h-2 bg-purple-600 rounded-full" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {themeOption.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Selection */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Language
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
            {languages.map((lang) => {
              const isSelected = language === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id as Language)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    isSelected
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span
                      className={`font-semibold ${
                        isSelected ? "text-purple-900" : "text-gray-900"
                      }`}
                    >
                      {lang.label}
                    </span>
                    {isSelected && (
                      <div className="ml-auto w-2 h-2 bg-purple-600 rounded-full" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Display Options */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Display Options
          </h3>
          <div className="space-y-4">
            {/* Compact Mode */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Compact Mode</p>
                <p className="text-sm text-gray-600">
                  Reduce spacing and padding for a more compact view
                </p>
              </div>
              <button
                onClick={() => setCompactMode(!compactMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  compactMode ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    compactMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Animations */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Animations</p>
                <p className="text-sm text-gray-600">
                  Enable smooth transitions and animations
                </p>
              </div>
              <button
                onClick={() => setAnimations(!animations)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  animations ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    animations ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Preview
          </h3>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600" />
              <div>
                <p className="font-semibold text-gray-900">Sample Card</p>
                <p className="text-sm text-gray-600">
                  This is how your interface will look
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded w-3/4" />
              <div className="h-2 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="primary"
            onClick={() => {
              console.log("Saving appearance settings:", {
                theme,
                language,
                compactMode,
                animations,
              });
            }}
            style={{ backgroundColor: "#a855f7" }}
          >
            Save Appearance Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;

