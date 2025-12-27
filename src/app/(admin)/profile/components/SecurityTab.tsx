"use client";

import React, { useState } from "react";
import { Shield, Smartphone, Mail, Key, Check, X } from "lucide-react";
import Button from "@/components/ui/Button";

interface SecuritySession {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
}

const SecurityTab: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const [sessions, setSessions] = useState<SecuritySession[]>([
    {
      id: "1",
      device: "Windows PC",
      browser: "Chrome 120.0",
      location: "Cairo, Egypt",
      lastActive: "Active now",
      current: true,
    },
    {
      id: "2",
      device: "iPhone 13",
      browser: "Safari 17.0",
      location: "Alexandria, Egypt",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: "3",
      device: "MacBook Pro",
      browser: "Chrome 119.0",
      location: "Cairo, Egypt",
      lastActive: "1 day ago",
      current: false,
    },
  ]);

  const handleRevokeSession = (sessionId: string) => {
    setSessions(sessions.filter((s) => s.id !== sessionId));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Shield className="text-red-600" />
          Security Settings
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage your account security and privacy settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Two-Factor Authentication */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-600">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                twoFactorEnabled ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          {twoFactorEnabled && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Two-factor authentication is enabled.</strong> You'll be
                asked for a verification code when signing in.
              </p>
            </div>
          )}
        </div>

        {/* Email Notifications */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Email Notifications
                </h3>
                <p className="text-sm text-gray-600">
                  Receive security alerts via email
                </p>
              </div>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailNotifications ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Login Alerts */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Login Alerts
                </h3>
                <p className="text-sm text-gray-600">
                  Get notified when someone logs into your account
                </p>
              </div>
            </div>
            <button
              onClick={() => setLoginAlerts(!loginAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                loginAlerts ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  loginAlerts ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-gray-600" />
                Active Sessions
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Manage devices that are currently signed in to your account
              </p>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`p-4 border rounded-lg ${
                  session.current
                    ? "border-blue-300 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">
                        {session.device}
                      </p>
                      {session.current && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Current Session
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{session.browser}</p>
                    <p className="text-sm text-gray-500">{session.location}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Last active: {session.lastActive}
                    </p>
                  </div>
                  {!session.current && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRevokeSession(session.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {sessions.length === 0 && (
            <div className="text-center py-8">
              <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No active sessions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;

