"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  User,
  Calendar,
  Package,
  DollarSign,
  FileText,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  MessageSquare,
  Paperclip,
  Printer,
  Share2,
  Eye,
} from "lucide-react";
import Link from "next/link";

const RFBDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("items");
  const [newComment, setNewComment] = useState("");

  // Sample RFB Data
  const rfbData = {
    id: "RFBs-001",
    status: "submitted",
    supplier: {
      name: "Ahmed Steel Co.",
      contactPerson: "Ahmed Hassan",
      email: "ahmed.hassan@ahmedsteel.com",
      phone: "+966 50 123 4567",
      address: "Industrial Area, Riyadh, Saudi Arabia",
      rating: 4.5,
      completedOrders: 127,
    },
    requestDetails: {
      materialRequestId: "MR-001",
      projectName: "Building A",
      projectCode: "PRJ-2024-001",
      sentDate: "2025-02-11",
      dueDate: "2025-02-18",
      responseDate: "2025-02-13",
      responseTime: "2 days",
    },
    pricing: {
      subtotal: 12050,
      tax: 1807.5,
      shipping: 500,
      discount: 0,
      total: 14357.5,
    },
    items: [
      {
        id: 1,
        description: "Steel Rebar 16mm",
        requestedQty: 300,
        offeredQty: 300,
        unit: "kg",
        unitPrice: 26.5,
        totalPrice: 7950,
        availability: "In Stock",
        deliveryTime: "5 days",
      },
      {
        id: 2,
        description: "Steel Rebar 12mm",
        requestedQty: 200,
        offeredQty: 200,
        unit: "kg",
        unitPrice: 23.5,
        totalPrice: 4700,
        availability: "In Stock",
        deliveryTime: "5 days",
      },
    ],
    terms: {
      paymentTerms: "Net 30 days",
      deliveryTerms: "FOB Destination",
      warranty: "12 months manufacturer warranty",
      validityPeriod: "30 days from submission",
    },
    documents: [
      { name: "Quote_RFBs-001.pdf", size: "245 KB", type: "PDF" },
      { name: "Product_Specs.pdf", size: "1.2 MB", type: "PDF" },
      { name: "Certifications.pdf", size: "892 KB", type: "PDF" },
    ],
    activities: [
      {
        id: 1,
        user: "Ahmed Hassan",
        action: "submitted",
        message: "Quote submitted with competitive pricing",
        timestamp: "2025-02-13 02:30 PM",
        type: "system",
      },
      {
        id: 2,
        user: "System",
        action: "sent",
        message: "RFB sent to supplier",
        timestamp: "2025-02-11 10:00 AM",
        type: "system",
      },
    ],
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      submitted: "bg-blue-100 text-blue-700 border-blue-300",
      approved: "bg-green-100 text-green-700 border-green-300",
      rejected: "bg-red-100 text-red-700 border-red-300",
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <CheckCircle className="w-5 h-5" />;
      case "pending":
        return <Clock className="w-5 h-5" />;
      case "approved":
        return <CheckCircle className="w-5 h-5" />;
      case "rejected":
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link href={`/RFBs/${rfbData.requestDetails.materialRequestId}`}>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {rfbData.id}
                  </h1>
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(
                      rfbData.status
                    )}`}
                  >
                    {getStatusIcon(rfbData.status)}
                    {rfbData.status.charAt(0).toUpperCase() +
                      rfbData.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Request for Bid - {rfbData.supplier.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
                <Download className="w-4 h-4" />
                Download
              </button>
              <button className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Approve Quote
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200">
            {["items", "terms", "documents", "activity"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-medium cursor-pointer transition-colors relative ${
                  activeTab === tab
                    ? "text-red-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-600">Items</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {rfbData.items.length}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-600">Subtotal</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  ${rfbData.pricing.subtotal.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <DollarSign className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-xs text-gray-600">Tax (15%)</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  ${rfbData.pricing.tax.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-600">Total</p>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  ${rfbData.pricing.total.toLocaleString()}
                </p>
              </div>
            </div>

            {activeTab === "items" && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quoted Items
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Description
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Qty
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Unit Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Total
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Availability
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                          Delivery
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {rfbData.items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">
                            {item.description}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {item.offeredQty} {item.unit}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">
                            ${item.unitPrice}
                          </td>
                          <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                            ${item.totalPrice.toLocaleString()}
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                              {item.availability}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {item.deliveryTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pricing Breakdown */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-end">
                    <div className="w-80 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium text-gray-900">
                          ${rfbData.pricing.subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax (15%):</span>
                        <span className="font-medium text-gray-900">
                          ${rfbData.pricing.tax.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="font-medium text-gray-900">
                          ${rfbData.pricing.shipping.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm pt-3 border-t border-gray-200">
                        <span className="font-semibold text-gray-900">
                          Total Amount:
                        </span>
                        <span className="font-bold text-lg text-green-600">
                          ${rfbData.pricing.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "terms" && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Terms & Conditions
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">
                        Payment Terms
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {rfbData.terms.paymentTerms}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">
                        Delivery Terms
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {rfbData.terms.deliveryTerms}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Warranty</p>
                      <p className="text-sm font-medium text-gray-900">
                        {rfbData.terms.warranty}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">
                        Quote Validity
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {rfbData.terms.validityPeriod}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Additional Notes
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5"></div>
                      <span>
                        All materials meet ASTM A615 Grade 60 specifications
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5"></div>
                      <span>Mill test certificates included with delivery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5"></div>
                      <span>Free delivery within Riyadh city limits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5"></div>
                      <span>
                        Bulk discounts available for orders over 1000kg
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Attached Documents
                  </h3>
                  <button className="px-4 py-2 bg-red-600 text-white cursor-pointer rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-medium">
                    <Paperclip className="w-4 h-4 rotate-45" /> Upload Document
                  </button>
                </div>

                <div className="space-y-3">
                  {rfbData.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <FileText className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500">{doc.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Activity Timeline
                </h3>
                <div className="space-y-6">
                  {rfbData.activities.map((activity) => (
                    <div key={activity.id} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {activity.user.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-gray-900">
                              {activity.user}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.timestamp}
                            </p>
                          </div>
                          <p className="text-sm text-gray-700">
                            {activity.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                        M
                      </div>
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment or note..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none resize-none"
                        rows={3}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Paperclip className="w-5 h-5" />
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Supplier Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">
                Supplier Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-bold text-gray-900 mb-1">
                    {rfbData.supplier.name}
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rfbData.supplier.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      {rfbData.supplier.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {rfbData.supplier.completedOrders} completed orders
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600">Contact Person</p>
                      <p className="text-sm font-medium text-gray-900">
                        {rfbData.supplier.contactPerson}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="text-sm font-medium text-gray-900">
                        {rfbData.supplier.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600">Phone</p>
                      <p className="text-sm font-medium text-gray-900">
                        {rfbData.supplier.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600">Address</p>
                      <p className="text-sm font-medium text-gray-900">
                        {rfbData.supplier.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Request Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">
                Request Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Material Request</p>
                    <p className="text-sm font-medium text-gray-900">
                      {rfbData.requestDetails.materialRequestId}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Project</p>
                    <p className="text-sm font-medium text-gray-900">
                      {rfbData.requestDetails.projectName}
                    </p>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">
                      {rfbData.requestDetails.projectCode}
                    </p>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">Riyadh/ABCC/IT</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Sent Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {rfbData.requestDetails.sentDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Response Time</p>
                    <p className="text-sm font-medium text-gray-900">
                      {rfbData.requestDetails.responseTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Due Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {rfbData.requestDetails.dueDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFBDetailsPage;
