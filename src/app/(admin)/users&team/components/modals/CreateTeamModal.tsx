"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  usersData: Array<{ id: number; name: string; avatar: string; role: string }>;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  usersData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
    members: [] as number[],
  });

  const permissions = [
    { id: "view-projects", label: "View Projects", description: "Can view all projects" },
    { id: "create-projects", label: "Create Projects", description: "Can create new projects" },
    { id: "edit-projects", label: "Edit Projects", description: "Can edit project details" },
    { id: "delete-projects", label: "Delete Projects", description: "Can delete projects" },
    { id: "manage-rfbs", label: "Manage RFBs", description: "Can create and manage RFBs" },
    { id: "approve-requests", label: "Approve Requests", description: "Can approve material requests" },
    { id: "manage-users", label: "Manage Users", description: "Can add and edit users" },
    { id: "view-reports", label: "View Reports", description: "Can access all reports" },
    { id: "manage-documents", label: "Manage Documents", description: "Can upload and delete documents" },
    { id: "financial-access", label: "Financial Access", description: "Can view financial data" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  const handleMemberChange = (userId: number) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.includes(userId)
        ? prev.members.filter((id) => id !== userId)
        : [...prev.members, userId],
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      name: "",
      description: "",
      permissions: [],
      members: [],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-900">Create New Team</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter team name"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter team description"
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Permissions <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                {permissions.map((permission) => (
                  <label
                    key={permission.id}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission.id)}
                      onChange={() => handlePermissionChange(permission.id)}
                      className="w-4 h-4 text-primary focus:ring-primary rounded mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {permission.label}
                      </p>
                      <p className="text-xs text-gray-500">
                        {permission.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Members
            </label>
            <div className="border border-gray-200 rounded-lg p-4 max-h-48 overflow-y-auto">
              <div className="space-y-2">
                {usersData.map((user) => (
                  <label
                    key={user.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.members.includes(user.id)}
                      onChange={() => handleMemberChange(user.id)}
                      className="w-4 h-4 text-primary focus:ring-primary rounded"
                    />
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                      style={{ backgroundColor: "#d92335" }}
                    >
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            style={{ backgroundColor: "#d92335" }}
          >
            Create Team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamModal;

