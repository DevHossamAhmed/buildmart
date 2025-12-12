/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  FaCog,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaMoneyBillWave,
  FaTruck,
  FaClock,
  FaSave,
} from "react-icons/fa";

interface PaymentTerm {
  id: string;
  name: string;
  days: number;
  description: string;
  isDefault: boolean;
}

interface DeliveryTerm {
  id: string;
  name: string;
  code: string;
  description: string;
  isDefault: boolean;
}

interface DeliveryTime {
  id: string;
  name: string;
  minDays: number;
  maxDays: number;
  description: string;
  isDefault: boolean;
}

const VendorSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<"payment" | "delivery" | "time">(
    "payment"
  );

  // Payment Terms State
  const [paymentTerms, setPaymentTerms] = useState<PaymentTerm[]>([
    {
      id: "1",
      name: "Net 30",
      days: 30,
      description: "Payment due within 30 days",
      isDefault: true,
    },
    {
      id: "2",
      name: "Net 60",
      days: 60,
      description: "Payment due within 60 days",
      isDefault: false,
    },
    {
      id: "3",
      name: "Net 90",
      days: 90,
      description: "Payment due within 90 days",
      isDefault: false,
    },
  ]);

  // Delivery Terms State
  const [deliveryTerms, setDeliveryTerms] = useState<DeliveryTerm[]>([
    {
      id: "1",
      name: "Ex Works",
      code: "EXW",
      description: "Seller makes goods available at their premises",
      isDefault: false,
    },
    {
      id: "2",
      name: "Free On Board",
      code: "FOB",
      description: "Seller delivers goods on board vessel",
      isDefault: true,
    },
    {
      id: "3",
      name: "Cost Insurance Freight",
      code: "CIF",
      description: "Seller pays for shipping and insurance",
      isDefault: false,
    },
    {
      id: "4",
      name: "Delivered Duty Paid",
      code: "DDP",
      description: "Seller responsible for all costs until delivery",
      isDefault: false,
    },
  ]);

  // Delivery Times State
  const [deliveryTimes, setDeliveryTimes] = useState<DeliveryTime[]>([
    {
      id: "1",
      name: "Express",
      minDays: 1,
      maxDays: 3,
      description: "Fast delivery for urgent orders",
      isDefault: false,
    },
    {
      id: "2",
      name: "Standard",
      minDays: 5,
      maxDays: 7,
      description: "Regular delivery timeframe",
      isDefault: true,
    },
    {
      id: "3",
      name: "Economy",
      minDays: 10,
      maxDays: 14,
      description: "Cost-effective delivery option",
      isDefault: false,
    },
  ]);

  const [editingPaymentId, setEditingPaymentId] = useState<string | null>(null);
  const [editingDeliveryId, setEditingDeliveryId] = useState<string | null>(null);
  const [editingTimeId, setEditingTimeId] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleSetDefault = (id: string, type: "payment" | "delivery" | "time") => {
    if (type === "payment") {
      setPaymentTerms(
        paymentTerms.map((term) => ({
          ...term,
          isDefault: term.id === id,
        }))
      );
    } else if (type === "delivery") {
      setDeliveryTerms(
        deliveryTerms.map((term) => ({
          ...term,
          isDefault: term.id === id,
        }))
      );
    } else {
      setDeliveryTimes(
        deliveryTimes.map((time) => ({
          ...time,
          isDefault: time.id === id,
        }))
      );
    }
  };

  const handleDelete = (id: string, type: "payment" | "delivery" | "time") => {
    if (type === "payment") {
      setPaymentTerms(paymentTerms.filter((term) => term.id !== id));
    } else if (type === "delivery") {
      setDeliveryTerms(deliveryTerms.filter((term) => term.id !== id));
    } else {
      setDeliveryTimes(deliveryTimes.filter((time) => time.id !== id));
    }
  };

  const tabs = [
    {
      id: "payment",
      label: "Payment Terms",
      icon: FaMoneyBillWave,
      color: "green",
    },
    {
      id: "delivery",
      label: "Delivery Terms",
      icon: FaTruck,
      color: "blue",
    },
    {
      id: "time",
      label: "Delivery Time",
      icon: FaClock,
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FaCog className="text-red-600 text-[24px]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Vendor Settings</h1>
              <p className="text-gray-600 text-sm">
                Manage payment terms, delivery terms, and delivery timeframes
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm">
            <FaSave />
            Save All Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-medium transition-all ${
                activeTab === tab.id
                  ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="text-[20px]" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Payment Terms Tab */}
        {activeTab === "payment" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-600" />
                  Payment Terms
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Define payment conditions and due dates for vendors
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <FaPlus />
                Add Payment Term
              </button>
            </div>

            <div className="space-y-3">
              {paymentTerms.map((term) => (
                <div
                  key={term.id}
                  className={`border rounded-lg p-4 transition-all ${
                    term.isDefault
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 hover:border-green-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                          {term.name}
                        </h3>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
                          {term.days} Days
                        </span>
                        {term.isDefault && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1">
                            <FaCheck className="text-[10px]" />
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{term.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {!term.isDefault && (
                        <button
                          onClick={() => handleSetDefault(term.id, "payment")}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Set as Default"
                        >
                          <FaCheck className="text-[16px]" />
                        </button>
                      )}
                      <button
                        onClick={() => setEditingPaymentId(term.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit className="text-[16px]" />
                      </button>
                      <button
                        onClick={() => handleDelete(term.id, "payment")}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrash className="text-[16px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {paymentTerms.length === 0 && (
              <div className="text-center py-12">
                <FaMoneyBillWave className="text-gray-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No payment terms added yet</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-4 text-red-600 hover:text-red-700 font-medium"
                >
                  Add your first payment term
                </button>
              </div>
            )}
          </div>
        )}

        {/* Delivery Terms Tab */}
        {activeTab === "delivery" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaTruck className="text-blue-600" />
                  Delivery Terms (Incoterms)
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Define shipping and delivery responsibilities
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <FaPlus />
                Add Delivery Term
              </button>
            </div>

            <div className="space-y-3">
              {deliveryTerms.map((term) => (
                <div
                  key={term.id}
                  className={`border rounded-lg p-4 transition-all ${
                    term.isDefault
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                          {term.name}
                        </h3>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300 font-mono">
                          {term.code}
                        </span>
                        {term.isDefault && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300 flex items-center gap-1">
                            <FaCheck className="text-[10px]" />
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{term.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {!term.isDefault && (
                        <button
                          onClick={() => handleSetDefault(term.id, "delivery")}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Set as Default"
                        >
                          <FaCheck className="text-[16px]" />
                        </button>
                      )}
                      <button
                        onClick={() => setEditingDeliveryId(term.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit className="text-[16px]" />
                      </button>
                      <button
                        onClick={() => handleDelete(term.id, "delivery")}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrash className="text-[16px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {deliveryTerms.length === 0 && (
              <div className="text-center py-12">
                <FaTruck className="text-gray-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No delivery terms added yet</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-4 text-red-600 hover:text-red-700 font-medium"
                >
                  Add your first delivery term
                </button>
              </div>
            )}
          </div>
        )}

        {/* Delivery Time Tab */}
        {activeTab === "time" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaClock className="text-orange-600" />
                  Delivery Timeframes
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Define expected delivery duration ranges
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                <FaPlus />
                Add Delivery Time
              </button>
            </div>

            <div className="space-y-3">
              {deliveryTimes.map((time) => (
                <div
                  key={time.id}
                  className={`border rounded-lg p-4 transition-all ${
                    time.isDefault
                      ? "border-orange-300 bg-orange-50"
                      : "border-gray-200 hover:border-orange-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                          {time.name}
                        </h3>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-300">
                          {time.minDays} - {time.maxDays} Days
                        </span>
                        {time.isDefault && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300 flex items-center gap-1">
                            <FaCheck className="text-[10px]" />
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{time.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {!time.isDefault && (
                        <button
                          onClick={() => handleSetDefault(time.id, "time")}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Set as Default"
                        >
                          <FaCheck className="text-[16px]" />
                        </button>
                      )}
                      <button
                        onClick={() => setEditingTimeId(time.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit className="text-[16px]" />
                      </button>
                      <button
                        onClick={() => handleDelete(time.id, "time")}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrash className="text-[16px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {deliveryTimes.length === 0 && (
              <div className="text-center py-12">
                <FaClock className="text-gray-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No delivery timeframes added yet
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-4 text-red-600 hover:text-red-700 font-medium"
                >
                  Add your first delivery timeframe
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
            <FaCog className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">
              Configuration Tips
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>
                • <strong>Payment Terms:</strong> Set the number of days vendors
                have to complete payment
              </li>
              <li>
                • <strong>Delivery Terms:</strong> Define who is responsible for
                shipping costs and risks
              </li>
              <li>
                • <strong>Delivery Time:</strong> Specify expected delivery
                duration ranges for planning
              </li>
              <li>
                • Mark one option as <strong>default</strong> in each category for
                automatic selection
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Add New{" "}
                {activeTab === "payment"
                  ? "Payment Term"
                  : activeTab === "delivery"
                  ? "Delivery Term"
                  : "Delivery Time"}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <FaTimes className="text-[20px]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "payment" && (
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Term Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., Net 30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Days *
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Payment due within 30 days"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="default" className="rounded" />
                    <label htmlFor="default" className="text-sm text-gray-700">
                      Set as default payment term
                    </label>
                  </div>
                </form>
              )}

              {activeTab === "delivery" && (
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Term Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., Free On Board"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Code *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
                      placeholder="FOB"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Describe the responsibilities and conditions"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="default" className="rounded" />
                    <label htmlFor="default" className="text-sm text-gray-700">
                      Set as default delivery term
                    </label>
                  </div>
                </form>
              )}

              {activeTab === "time" && (
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timeframe Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., Standard"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Days *
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Maximum Days *
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="7"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Regular delivery timeframe"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="default" className="rounded" />
                    <label htmlFor="default" className="text-sm text-gray-700">
                      Set as default delivery timeframe
                    </label>
                  </div>
                </form>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                Add {activeTab === "payment" ? "Payment Term" : activeTab === "delivery" ? "Delivery Term" : "Delivery Time"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorSettingsPage;