"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";

interface Category {
  id: number;
  name: string;
}

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { categoryName: string; parentCategory: string }) => void;
  categoriesData: Category[];
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  categoriesData,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  const handleSubmit = () => {
    onSubmit({ categoryName, parentCategory });
    setCategoryName("");
    setParentCategory("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-900">
            Add Manual Category
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <Select
              label="Parent Category"
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              options={[
                { value: "", label: "Select parent category" },
                ...categoriesData.map((cat) => ({
                  value: cat.name,
                  label: cat.name,
                })),
              ]}
              size="md"
              fullWidth
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!categoryName}
            style={{ backgroundColor: "#d92335" }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;

