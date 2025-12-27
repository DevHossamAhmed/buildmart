"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Building, Calendar } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const UpdateProfileTab: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "Mahmoud",
    lastName: "Ahmed",
    email: "mahmoud@example.com",
    phone: "+20 100 123 4567",
    address: "123 Main Street, Cairo, Egypt",
    company: "BuildMart Construction",
    jobTitle: "Project Manager",
    bio: "Experienced project manager with 10+ years in construction management.",
    dateOfBirth: "1990-01-15",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
    setIsEditing(false);
    // Add save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <User className="text-blue-600" />
            Profile Information
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Update your personal information and contact details
          </p>
        </div>
        {!isEditing && (
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsEditing(true)}
            style={{ backgroundColor: "#3b82f6" }}
          >
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Picture Section */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              {formData.firstName[0]}{formData.lastName[0]}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg">
                <User className="w-4 h-4" />
              </button>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {formData.firstName} {formData.lastName}
            </h3>
            <p className="text-sm text-gray-600">{formData.jobTitle}</p>
            <p className="text-sm text-gray-500">{formData.company}</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            disabled={!isEditing}
            required
            leftIcon={<User className="w-4 h-4" />}
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            disabled={!isEditing}
            required
            leftIcon={<User className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            required
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            leftIcon={<Phone className="w-4 h-4" />}
          />
        </div>

        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          disabled={!isEditing}
          leftIcon={<MapPin className="w-4 h-4" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            disabled={!isEditing}
            leftIcon={<Building className="w-4 h-4" />}
          />
          <Input
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Input
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            disabled={!isEditing}
            leftIcon={<Calendar className="w-4 h-4" />}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>

        {isEditing && (
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              style={{ backgroundColor: "#3b82f6" }}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfileTab;

