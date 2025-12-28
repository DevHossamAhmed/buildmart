"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export interface MaterialRequestFormData {
  materialName: string;
  quantity: string;
  unit: string;
  category: string;
  priority: string;
  description: string;
  projectName: string;
  requestedDate: string;
  duedate: string;
  estValue: string;
}

export interface BoqItem {
  id: number;
  category: string;
  description: string;
  quantity: number;
  unit: string;
}

interface CreateMaterialRequestProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: MaterialRequestFormData, boqItems: BoqItem[]) => void;
  onSaveDraft?: (formData: MaterialRequestFormData, boqItems: BoqItem[]) => void;
}

const CreateMaterialRequest: React.FC<CreateMaterialRequestProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onSaveDraft,
}) => {
  const [boqItems, setBoqItems] = useState<BoqItem[]>([
    {
      id: 1,
      category: "",
      description: "",
      quantity: 0,
      unit: "",
    },
  ]);

  const [formData, setFormData] = useState<MaterialRequestFormData>({
    materialName: "",
    quantity: "",
    unit: "units",
    category: "",
    priority: "normal",
    description: "",
    projectName: "",
    requestedDate: "",
    duedate: "",
    estValue: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBoqChange = (id: number, field: string, value: string | number) => {
    setBoqItems(
      boqItems.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const addBoqRow = () => {
    const newId = Math.max(...boqItems.map((item) => item.id), 0) + 1;
    setBoqItems([
      ...boqItems,
      {
        id: newId,
        category: "",
        unit: "",
        quantity: 0,
        description: "",
      },
    ]);
  };

  const removeBoqRow = (id: number) => {
    if (boqItems.length > 1) {
      setBoqItems(boqItems.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData, boqItems);
    resetForm();
  };

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft(formData, boqItems);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      materialName: "",
      quantity: "",
      unit: "units",
      category: "",
      priority: "normal",
      description: "",
      projectName: "",
      requestedDate: "",
      duedate: "",
      estValue: "",
    });
    setBoqItems([
      {
        id: 1,
        category: "",
        description: "",
        quantity: 0,
        unit: "",
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/10 bg-opacity-50 z-[99999] transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-[100000] flex flex-col animate-slide-in">
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span className="text-xl font-bold">×</span>
          </button>
        </div>

        {/* Header */}
        <div className="p-6 pt-16 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">New Material Request</h2>
          <p className="text-sm text-gray-600 mt-1">
            Fill in the details to create a new request
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {/* Request Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Request Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="materialName"
                value={formData.materialName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Steel Rebar Grade 60"
              />
            </div>

            {/* Project Name and Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <select
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select Project</option>
                  <option value="PRJ-2024-001 - Structural Steel Installation">
                    PRJ-2024-001 - Structural Steel Installation
                  </option>
                  <option value="PRJ-2024-002 - HVAC System Upgrade">
                    PRJ-2024-002 - HVAC System Upgrade
                  </option>
                  <option value="PRJ-2024-003 - Electrical Infrastructure">
                    PRJ-2024-003 - Electrical Infrastructure
                  </option>
                  <option value="PRJ-2024-004 - Foundation & Concrete Works">
                    PRJ-2024-004 - Foundation & Concrete Works
                  </option>
                  <option value="PRJ-2024-005 - Plumbing & Drainage System">
                    PRJ-2024-005 - Plumbing & Drainage System
                  </option>
                  <option value="PRJ-2024-006 - Facade & Cladding Works">
                    PRJ-2024-006 - Facade & Cladding Works
                  </option>
                  <option value="PRJ-2024-007 - MEP Integration Phase 1">
                    PRJ-2024-007 - MEP Integration Phase 1
                  </option>
                  <option value="PRJ-2024-008 - Fire Safety Systems">
                    PRJ-2024-008 - Fire Safety Systems
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="duedate"
                value={formData.duedate}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Est. Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Est.Value <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="estValue"
                value={formData.estValue}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description / Notes
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Add any additional information or special requirements..."
              />
            </div>

            {/* BOQ Section */}
            <div className="w-full h-[1px] bg-gray-300 mx-auto mt-[20px]"></div>
            <div className="w-full flex justify-between items-center">
              <h2 className="pt-1 text-lg font-semibold text-gray-900">BOQs</h2>
              <button className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-600 transition-colors">
                Import
              </button>
            </div>

            {/* BOQ Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm table-fixed">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="w-[20%] px-1 py-1 text-left text-[10px] font-semibold text-gray-700 border-r border-gray-300">
                      Category
                    </th>
                    <th className="w-[15%] px-1 py-1 text-left text-[10px] font-semibold text-gray-700 border-r border-gray-300">
                      Description
                    </th>
                    <th className="w-[12%] px-1 py-1 text-left text-[10px] font-semibold text-gray-700 border-r border-gray-300">
                      Quantity
                    </th>
                    <th className="w-[15%] px-1 py-1 text-left text-[10px] font-semibold text-gray-700 border-r border-gray-300">
                      Unit
                    </th>
                    <th className="w-[10%] px-1 py-1 text-center text-[10px] font-semibold text-gray-700"></th>
                  </tr>
                </thead>
                <tbody>
                  {boqItems.map((boqItem) => (
                    <tr key={boqItem.id} className="border-b border-gray-200">
                      <td className="px-2 py-2 border-r border-gray-200">
                        <select
                          value={boqItem.category}
                          onChange={(e) =>
                            handleBoqChange(boqItem.id, "category", e.target.value)
                          }
                          className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="">Select</option>
                          <option value="Construction">Construction</option>
                          <option value="Electrical">Electrical</option>
                          <option value="Plumbing">Plumbing</option>
                          <option value="Finishing">Finishing</option>
                          <option value="Safety">Safety</option>
                        </select>
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <input
                          type="text"
                          value={boqItem.description}
                          onChange={(e) =>
                            handleBoqChange(boqItem.id, "description", e.target.value)
                          }
                          className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Description"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <input
                          type="number"
                          value={boqItem.quantity}
                          onChange={(e) =>
                            handleBoqChange(
                              boqItem.id,
                              "quantity",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-200">
                        <select
                          value={boqItem.unit}
                          onChange={(e) =>
                            handleBoqChange(boqItem.id, "unit", e.target.value)
                          }
                          className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="">Select</option>
                          <option value="units">Units</option>
                          <option value="kg">Kg</option>
                          <option value="tons">Tons</option>
                          <option value="meters">Meters</option>
                          <option value="bags">Bags</option>
                          <option value="gallons">Gallons</option>
                        </select>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <button
                          onClick={() => removeBoqRow(boqItem.id)}
                          className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          disabled={boqItems.length === 1}
                          title="Remove row"
                        >
                          <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Row Button */}
            <button
              onClick={addBoqRow}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Row
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-3">
            {onSaveDraft && (
              <button
                onClick={handleSaveDraft}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Save as Draft
              </button>
            )}
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 text-white rounded-lg shadow-md hover:opacity-90 transition-opacity font-medium"
              style={{ backgroundColor: "#d92335" }}
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMaterialRequest;

