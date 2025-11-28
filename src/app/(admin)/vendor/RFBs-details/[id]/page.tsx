"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileAlt,
  FaDownload,
  FaBoxes,
  FaPaperPlane,
  FaUpload,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

interface ProposalItem {
  id: string;
  itemName: string;
  specification: string;
  requestedQty: number;
  unit: string;
  unitPrice: string;
  totalPrice: string;
  deliveryTime: string;
  notes: string;
}

const RFPDetailsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [inputMethod, setInputMethod] = useState<"manual" | "upload">("manual");
  const [proposalItems, setProposalItems] = useState<ProposalItem[]>([
    {
      id: "1",
      itemName: "",
      specification: "",
      requestedQty: 0,
      unit: "",
      unitPrice: "",
      totalPrice: "",
      deliveryTime: "",
      notes: "",
    },
  ]);

  // Mock RFP Data
  const rfpData = {
    rfpNumber: "RFP-2024-001",
    projectName: "New Office Building - Phase 1",
    department: "Construction",
    requestDate: "2024-11-20",
    dueDate: "2024-12-05",
    status: "pending",
    priority: "high",
    description:
      "We require high-quality construction materials for the foundation and structural work of our new office building project. All materials must meet local building codes and international standards.",
    contactPerson: "Ahmed Hassan",
    contactEmail: "ahmed.hassan@buildmart.com",
    contactPhone: "+96655889955",
    requestedItems: [
      {
        id: "1",
        name: "Portland Cement",
        specification: "Type I, 50kg bags, CEM I 42.5N",
        quantity: 500,
        unit: "bags",
        notes: "Must comply with ASTM C150 standards",
      },
      {
        id: "2",
        name: "Steel Reinforcement Bars",
        specification: "Grade 60, 16mm diameter, 12m length",
        quantity: 2000,
        unit: "pieces",
        notes: "Hot-rolled deformed bars",
      },
      {
        id: "3",
        name: "Ready-Mix Concrete",
        specification: "Grade C30/37, Slump 150mm",
        quantity: 150,
        unit: "m³",
        notes: "Delivery schedule to be coordinated",
      },
    ],
    attachments: [
      {
        id: "1",
        name: "Technical_Specifications.pdf",
        size: "2.4 MB",
        type: "PDF",
      },
      {
        id: "2",
        name: "Project_Drawings.dwg",
        size: "5.1 MB",
        type: "CAD",
      },
    ],
  };

  const handleAddItem = () => {
    const newItem: ProposalItem = {
      id: Date.now().toString(),
      itemName: "",
      specification: "",
      requestedQty: 0,
      unit: "",
      unitPrice: "",
      totalPrice: "",
      deliveryTime: "",
      notes: "",
    };
    setProposalItems([...proposalItems, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setProposalItems(proposalItems.filter((item) => item.id !== id));
  };

  const handleItemChange = (id: string, field: string, value: string | number) => {
    setProposalItems(
      proposalItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          // Auto-calculate total price
          if (field === "unitPrice" || field === "requestedQty") {
            const qty = field === "requestedQty" ? Number(value) : item.requestedQty;
            const price = field === "unitPrice" ? value : item.unitPrice;
            updatedItem.totalPrice = (qty * Number(price)).toFixed(2);
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const calculateGrandTotal = () => {
    return proposalItems
      .reduce((sum, item) => sum + Number(item.totalPrice || 0), 0)
      .toFixed(2);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      reviewed: "bg-blue-100 text-blue-800 border-blue-300",
      responded: "bg-green-100 text-green-800 border-green-300",
    };
    const icons = {
      pending: <FaClock className="text-[12px]" />,
      reviewed: <FaCheckCircle className="text-[12px]" />,
      responded: <FaCheckCircle className="text-[12px]" />,
    };
    return (
      <span
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold border ${
          styles[status as keyof typeof styles]
        }`}
      >
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: "bg-red-50 text-red-700 border-red-200",
      medium: "bg-orange-50 text-orange-700 border-orange-200",
      low: "bg-gray-50 text-gray-700 border-gray-200",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-[11px] font-medium border ${
          styles[priority as keyof typeof styles]
        }`}
      >
        {priority.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-red-600 mb-6 transition-colors"
      >
        <FaArrowLeft />
        <span className="font-medium">Back to Requests</span>
      </button>

      {/* Header */}
      <div className=" text-black rounded-xl p-6 mb-6 shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{rfpData.rfpNumber}</h1>
            <p className="text-black text-lg">{rfpData.projectName}</p>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge(rfpData.status)}
            {getPriorityBadge(rfpData.priority)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-red-600" />
            <span className="text-red-600">Request Date:</span>
            <span className="font-semibold">{rfpData.requestDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-red-600" />
            <span className="text-red-600">Due Date:</span>
            <span className="font-semibold">{rfpData.dueDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBuilding className="text-red-600" />
            <span className="text-red-600">Department:</span>
            <span className="font-semibold">{rfpData.department}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - RFP Information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <FaFileAlt className="text-red-600" />
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              {rfpData.description}
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              Contact Person
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Name</p>
                <p className="text-gray-800 font-medium">{rfpData.contactPerson}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-blue-600 font-medium flex items-center gap-2 text-sm">
                  <FaEnvelope className="text-[10px]" />
                  {rfpData.contactEmail}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="text-gray-800 font-medium flex items-center gap-2 text-sm">
                  <FaPhone className="text-[10px]" />
                  {rfpData.contactPhone}
                </p>
              </div>
            </div>
          </div>

          {/* Requested Items */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaBoxes className="text-red-600" />
              Requested Items ({rfpData.requestedItems.length})
            </h3>
            <div className="space-y-3">
              {rfpData.requestedItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded">
                          #{index + 1}
                        </span>
                        <h4 className="text-gray-800 font-bold text-sm">
                          {item.name}
                        </h4>
                      </div>
                      <p className="text-gray-600 text-xs mb-1">
                        {item.specification}
                      </p>
                    </div>
                    <div className="text-right ml-3">
                      <p className="text-lg font-bold text-red-600">
                        {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">{item.unit}</p>
                    </div>
                  </div>
                  {item.notes && (
                    <div className="bg-yellow-50 border-l-2 border-yellow-400 p-2 mt-2">
                      <p className="text-xs text-gray-700">
                        <span className="font-semibold">Note:</span> {item.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}
          {rfpData.attachments.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaFileAlt className="text-red-600" />
                Attachments ({rfpData.attachments.length})
              </h3>
              <div className="space-y-2">
                {rfpData.attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                        <FaFileAlt className="text-red-600 text-sm" />
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium text-sm">
                          {file.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {file.size} • {file.type}
                        </p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:bg-blue-50 p-2 rounded transition-colors">
                      <FaDownload className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Proposal Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            {/* Form Header */}
            <div className="border-b border-gray-200 p-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Submit Your Proposal
              </h2>

              {/* Input Method Toggle */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setInputMethod("manual")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    inputMethod === "manual"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FaEdit />
                  Manual Entry
                </button>
                <button
                  onClick={() => setInputMethod("upload")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    inputMethod === "upload"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FaUpload />
                  Upload File
                </button>
              </div>
            </div>

            <div className="p-5">
              {inputMethod === "manual" ? (
                <>
                  {/* Manual Entry Form */}
                  <div className="space-y-4 mb-6">
                    {proposalItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-800">
                            Item #{index + 1}
                          </h4>
                          {proposalItems.length > 1 && (
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-600 hover:bg-red-50 p-2 rounded transition-colors"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Item Name *
                            </label>
                            <input
                              type="text"
                              value={item.itemName}
                              onChange={(e) =>
                                handleItemChange(item.id, "itemName", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="Enter item name"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Specification *
                            </label>
                            <textarea
                              value={item.specification}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "specification",
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="Enter specifications"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Quantity *
                            </label>
                            <input
                              type="number"
                              value={item.requestedQty || ""}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "requestedQty",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="0"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Unit *
                            </label>
                            <input
                              type="text"
                              value={item.unit}
                              onChange={(e) =>
                                handleItemChange(item.id, "unit", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="e.g., bags, pieces"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Unit Price (SAR) *
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "unitPrice",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="0.00"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Total Price (SAR)
                            </label>
                            <input
                              type="text"
                              value={item.totalPrice}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 font-semibold"
                              placeholder="0.00"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Delivery Time *
                            </label>
                            <input
                              type="text"
                              value={item.deliveryTime}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "deliveryTime",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="e.g., 5-7 business days"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Notes (Optional)
                            </label>
                            <textarea
                              value={item.notes}
                              onChange={(e) =>
                                handleItemChange(item.id, "notes", e.target.value)
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="Add any additional notes"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Item Button */}
                  <button
                    onClick={handleAddItem}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-red-600 hover:text-red-600 transition-colors font-medium flex items-center justify-center gap-2 mb-6"
                  >
                    <FaPlus />
                    Add Another Item
                  </button>

                  {/* Grand Total */}
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-5 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-800">
                        Grand Total:
                      </span>
                      <span className="text-3xl font-bold text-red-600">
                        {calculateGrandTotal()} SAR
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                /* Upload File Section */
                <div className="py-12">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-red-600 transition-colors">
                    <FaUpload className="text-6xl text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Upload Your Proposal File
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Upload an Excel or PDF file containing your proposal details
                    </p>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.pdf"
                      className="hidden"
                      id="fileUpload"
                    />
                    <label
                      htmlFor="fileUpload"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium cursor-pointer"
                    >
                      <FaUpload />
                      Choose File
                    </label>
                    <p className="text-sm text-gray-500 mt-4">
                      Supported formats: Excel (.xlsx, .xls), PDF (.pdf)
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={() => router.back()}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2 shadow-lg">
                  <FaPaperPlane />
                  Submit Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFPDetailsPage;