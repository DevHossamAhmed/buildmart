/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Settings,
  Plus,
  Edit2,
  Trash2,
  Check,
  DollarSign,
  Truck,
  Clock,
  Save,
} from "lucide-react";
import PageHeaderWrapper from "@/components/ui/PageHeaderWrapper";
import Button from "@/components/ui/Button";
import { AddTermModal } from "./components/modals";

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

  const handleAddTerm = (data: any) => {
    if (activeTab === "payment") {
      const newTerm: PaymentTerm = {
        id: String(paymentTerms.length + 1),
        name: data.name,
        days: parseInt(data.days),
        description: data.description,
        isDefault: data.isDefault,
      };
      if (data.isDefault) {
        setPaymentTerms(
          paymentTerms.map((t) => ({ ...t, isDefault: false })).concat(newTerm)
        );
      } else {
        setPaymentTerms([...paymentTerms, newTerm]);
      }
    } else if (activeTab === "delivery") {
      const newTerm: DeliveryTerm = {
        id: String(deliveryTerms.length + 1),
        name: data.name,
        code: data.code,
        description: data.description,
        isDefault: data.isDefault,
      };
      if (data.isDefault) {
        setDeliveryTerms(
          deliveryTerms.map((t) => ({ ...t, isDefault: false })).concat(newTerm)
        );
      } else {
        setDeliveryTerms([...deliveryTerms, newTerm]);
      }
    } else {
      const newTime: DeliveryTime = {
        id: String(deliveryTimes.length + 1),
        name: data.name,
        minDays: parseInt(data.minDays),
        maxDays: parseInt(data.maxDays),
        description: data.description,
        isDefault: data.isDefault,
      };
      if (data.isDefault) {
        setDeliveryTimes(
          deliveryTimes.map((t) => ({ ...t, isDefault: false })).concat(newTime)
        );
      } else {
        setDeliveryTimes([...deliveryTimes, newTime]);
      }
    }
  };

  const tabs = [
    {
      id: "payment",
      label: "Payment Terms",
      icon: DollarSign,
      color: "green",
    },
    {
      id: "delivery",
      label: "Delivery Terms",
      icon: Truck,
      color: "blue",
    },
    {
      id: "time",
      label: "Delivery Time",
      icon: Clock,
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <PageHeaderWrapper
        title="Vendor Settings"
        description="Manage payment terms, delivery terms, and delivery timeframes"
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
      </PageHeaderWrapper>

      {/* Content Area */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Payment Terms Tab */}
          {activeTab === "payment" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <DollarSign className="text-green-600" />
                    Payment Terms
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Define payment conditions and due dates for vendors
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<Plus className="w-4 h-4" />}
                  onClick={() => setShowAddModal(true)}
                  style={{ backgroundColor: "#10b981" }}
                >
                  Add Payment Term
                </Button>
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
                              <Check className="text-[10px]" />
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
                            <Check className="text-[16px]" />
                          </button>
                        )}
                        <button
                          onClick={() => setEditingPaymentId(term.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="text-[16px]" />
                        </button>
                        <button
                          onClick={() => handleDelete(term.id, "payment")}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="text-[16px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {paymentTerms.length === 0 && (
                <div className="text-center py-12">
                  <DollarSign className="text-gray-300 text-5xl mx-auto mb-4" />
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
                    <Truck className="text-blue-600" />
                    Delivery Terms (Incoterms)
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Define shipping and delivery responsibilities
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<Plus className="w-4 h-4" />}
                  onClick={() => setShowAddModal(true)}
                  style={{ backgroundColor: "#3b82f6" }}
                >
                  Add Delivery Term
                </Button>
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
                              <Check className="text-[10px]" />
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
                            <Check className="text-[16px]" />
                          </button>
                        )}
                        <button
                          onClick={() => setEditingDeliveryId(term.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="text-[16px]" />
                        </button>
                        <button
                          onClick={() => handleDelete(term.id, "delivery")}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="text-[16px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {deliveryTerms.length === 0 && (
                <div className="text-center py-12">
                  <Truck className="text-gray-300 text-5xl mx-auto mb-4" />
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
                    <Clock className="text-orange-600" />
                    Delivery Timeframes
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Define expected delivery duration ranges
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<Plus className="w-4 h-4" />}
                  onClick={() => setShowAddModal(true)}
                  style={{ backgroundColor: "#f97316" }}
                >
                  Add Delivery Time
                </Button>
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
                              <Check className="text-[10px]" />
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
                            <Check className="text-[16px]" />
                          </button>
                        )}
                        <button
                          onClick={() => setEditingTimeId(time.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="text-[16px]" />
                        </button>
                        <button
                          onClick={() => handleDelete(time.id, "time")}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="text-[16px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {deliveryTimes.length === 0 && (
                <div className="text-center py-12">
                  <Clock className="text-gray-300 text-5xl mx-auto mb-4" />
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
              <Settings className="w-5 h-5 text-blue-600" />
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
      </div>

      {/* Add/Edit Modal */}
      <AddTermModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddTerm}
        activeTab={activeTab}
      />
    </div>
  );
};

export default VendorSettingsPage;
