"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

export interface ProjectFormData {
  projectName: string;
  projectCode: string;
  location: string;
  startDate: string;
  endDate: string;
  projectManager: string;
  status: string;
  budget: string;
  description: string;
  projectPortofolioDirector: string;
  projectDirector: string;
}

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: "",
    projectCode: "",
    location: "",
    startDate: "",
    endDate: "",
    projectManager: "",
    status: "active",
    budget: "",
    description: "",
    projectPortofolioDirector: "",
    projectDirector: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      projectName: "",
      projectCode: "",
      location: "",
      startDate: "",
      endDate: "",
      projectManager: "",
      status: "active",
      budget: "",
      description: "",
      projectPortofolioDirector: "",
      projectDirector: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/10 bg-opacity-50 z-[99999] transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-[100000] flex flex-col">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span className="text-xl font-bold">×</span>
          </button>
        </div>

        <div className="p-6 pt-16 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
          <p className="text-sm text-gray-600 mt-1">Fill in the project details</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Building A Construction"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="projectCode"
                  value={formData.projectCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="BA-2025"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                >
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="on-hold">On Hold</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13820.901577242525!2d31.1590912!3d30.001683800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1761320431231!5m2!1sar!2seg"
                width="100%"
                height="150"
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Portofolio Director{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="projectPortofolioDirector"
                value={formData.projectPortofolioDirector}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Project Portofolio Director"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Director <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="projectDirector"
                value={formData.projectDirector}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Project Director"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Manager <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="projectManager"
                value={formData.projectManager}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Project Manager"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget (SAR) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="0"
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
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Project description and additional details..."
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1"
              style={{ backgroundColor: "#d92335" }}
            >
              Create Project
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProjectModal;

