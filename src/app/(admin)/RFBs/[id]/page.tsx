"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Download,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
  User,
  Building2,
  Package,
  AlertCircle,
  MessageSquare,
  Paperclip,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";

const RFBsDetailPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [newComment, setNewComment] = useState("");
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Sample data for the material request
  const requestData = {
    id: "MR-001",
    title: "Steel Rebar Grade 60",
    status: "draft",
    priority: "high",
    projectName: "Building A",
    projectCode: "PRJ-2024-001",
    requestedBy: "Mahmoud Ahmed",
    requestedDate: "2025-02-10",
    dueDate: "2025-10-15",
    description:
      "Required for foundation reinforcement work in Building A. Must meet ASTM A615 Grade 60 specifications with proper certification.",
    rfbsCount: 3,
    projectCompnay: "ABCC",
    projectDepartment: "IT",
    projectRegion: "Riyadh",
  };

  // BOQ Items data
  const boqItems = [
    {
      id: 1,
      category: "Construction",
      description: "Steel Rebar 16mm",
      quantity: 300,
      unit: "kg",
      unitPrice: 25.5,
      totalPrice: 7650,
    },
    {
      id: 2,
      category: "Construction",
      description: "Steel Rebar 12mm",
      quantity: 200,
      unit: "kg",
      unitPrice: 22.0,
      totalPrice: 4400,
    },
  ];

  // RFBs (Request for Bids) data
  const rfbsData = [
    {
      id: "RFPs-001",
      supplier: "Ahmed Steel Co.",
      status: "pending",
      submittedDate: "2025-02-11",
      totalAmount: 11500,
      responseTime: "2 days",
    },
    {
      id: "RFPs-002",
      supplier: "Modern Materials Ltd.",
      status: "submitted",
      submittedDate: "2025-02-12",
      totalAmount: 12050,
      responseTime: "1 day",
    },
    {
      id: "RFPs-003",
      supplier: "Prime Construction Supply",
      status: "pending",
      submittedDate: "2025-02-11",
      totalAmount: 11800,
      responseTime: "2 days",
    },
  ];

  const documentsData = [
    {
      name: "Specification Sheet - Rebar A615.pdf",
      size: "1.2 MB",
      url: "/docs/spec-rebar-a615.pdf",
    },
    {
      name: "Project Drawing A-101.dwg",
      size: "3.5 MB",
      url: "/docs/drawing-a101.dwg",
    },
    {
      name: "Material Request Form.xlsx",
      size: "45 KB",
      url: "/docs/mr-form.xlsx",
    },
  ];

  // Comments/Activity data
  const activities = [
    {
      id: 1,
      user: "Sara Ali",
      action: "commented",
      message:
        "Please confirm if we need mill test certificates for this order",
      timestamp: "2025-02-12 10:30 AM",
      type: "comment",
    },
    {
      id: 2,
      user: "Mahmoud Ahmed",
      action: "created",
      message: "Material request created and submitted for approval",
      timestamp: "2025-02-10 09:15 AM",
      type: "system",
    },
  ];

  const fileTypes = [
    { value: "specification", label: "Specification" },
    { value: "drawing", label: "Drawing" },
    { value: "certificate", label: "Certificate" },
    { value: "quotation", label: "Quotation" },
    { value: "invoice", label: "Invoice" },
    { value: "other", label: "Other" },
  ];
  //@ts-expect-error:status
  const getStatusColor = (status) => {
    const colors = {
      draft: "bg-gray-100 text-gray-700 border-gray-300",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      submitted: "bg-blue-100 text-blue-700 border-blue-300",
      approved: "bg-green-100 text-green-700 border-green-300",
      rejected: "bg-red-100 text-red-700 border-red-300",
    };
    //@ts-expect-error:status
    return colors[status] || colors.draft;
  };
  //@ts-expect-error:status
  const getPriorityColor = (priority) => {
    const colors = {
      urgent: "bg-red-100 text-red-700 border-red-300",
      high: "bg-orange-100 text-orange-700 border-orange-300",
      normal: "bg-blue-100 text-blue-700 border-blue-300",
      low: "bg-slate-100 text-slate-700 border-slate-300",
    };
    //@ts-expect-error:status
    return colors[priority] || colors.normal;
  };

  const totalAmount = boqItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDrop = (e: {
    preventDefault: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataTransfer: { files: any };
  }) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadFile(files[0]);
      setFileName(files[0].name);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileSelect = (e: { target: { files: any } }) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadFile(files[0]);
      setFileName(files[0].name);
    }
  };

  const handleUploadSubmit = () => {
    console.log("Uploading file:", { uploadFile, fileName, fileType });
    setShowUploadModal(false);
    setUploadFile(null);
    setFileName("");
    setFileType("");
  };

  const resetUploadModal = () => {
    setShowUploadModal(false);
    setUploadFile(null);
    setFileName("");
    setFileType("");
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link href="/material-request">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {requestData.id}
                  </h1>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      requestData.status
                    )}`}
                  >
                    {requestData.status.charAt(0).toUpperCase() +
                      requestData.status.slice(1)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                      requestData.priority
                    )}`}
                  >
                    {requestData.priority.charAt(0).toUpperCase() +
                      requestData.priority.slice(1)}{" "}
                    Priority
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {requestData.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                className="px-4 py-2 text-white cursor-pointer rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm font-medium"
                style={{ backgroundColor: "#d92335" }}
              >
                <Send className="w-4 h-4" />
                Send RFPs
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowStatusMenu(!showStatusMenu)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
                {showStatusMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button className="w-full px-4 py-2 text-left cursor-pointer text-sm hover:bg-gray-50 flex items-center gap-2">
                      <Edit2 className="w-4 h-4" />
                      Edit Request
                    </button>
                    <button className="w-full px-4 py-2 text-left cursor-pointer text-sm hover:bg-gray-50 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View History
                    </button>
                    <button className="w-full px-4 py-2 text-left cursor-pointer text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 ">
            {["overview", "rfps", "documents", "activity"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-medium transition-colors cursor-pointer relative ${
                  activeTab === tab
                    ? "text-red-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: "#d92335" }}
                  />
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
            {activeTab === "overview" && (
              <>
                {/* Overview Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600">Total Items</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {boqItems.length}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600">Est. Value</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      ${totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <ShoppingCart className="w-5 h-5 text-purple-600" />
                      </div>
                      <p className="text-sm text-gray-600">RFPs Sent</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {requestData.rfbsCount}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {requestData.description}
                  </p>
                </div>

                {/* BOQ Summary */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quantities
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                            Category
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                            Description
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {boqItems.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4">
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                {item.category}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {item.description}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600">
                              {item.quantity} {item.unit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === "rfps" && (
              <div className="space-y-4">
                <div className="flex items-center justify-end mb-4">
                  <button
                    className="px-4 py-2 text-white cursor-pointer rounded-lg hover:opacity-90 text-sm font-medium"
                    style={{ backgroundColor: "#d92335" }}
                  >
                    <Send className="w-4 h-4 inline mr-2" />
                    Send New RFB
                  </button>
                </div>
                {rfbsData.map((rfb) => (
                  <div
                    key={rfb.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-base font-semibold text-gray-900">
                            {rfb.id}
                          </h4>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              rfb.status
                            )}`}
                          >
                            {rfb.status.charAt(0).toUpperCase() +
                              rfb.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 font-medium mb-2">
                          {rfb.supplier}
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">Submitted</p>
                            <p className="text-gray-900 font-medium">
                              {rfb.submittedDate}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Response Time</p>
                            <p className="text-gray-900 font-medium">
                              {rfb.responseTime}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Total Amount</p>
                            <p className="text-gray-900 font-bold text-lg">
                              ${rfb.totalAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Link href={`/RFBs-details/${rfb.id}`}>
                        <button className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "documents" && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Attached Documents
                  </h3>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="px-4 py-2 text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-2 text-sm font-medium"
                    style={{ backgroundColor: "#d92335" }}
                  >
                    <Upload className="w-4 h-4" /> Upload Document
                  </button>
                </div>

                <div className="space-y-3">
                  {documentsData.map((doc, index) => (
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
                          <Trash2 className="w-4 h-4 text-gray-600" />
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
                  Activity & Comments
                </h3>
                <div className="space-y-6">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
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
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                        M
                      </div>
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none resize-none"
                        rows={3}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Paperclip className="w-5 h-5" />
                        </button>
                        <button
                          className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                          style={{ backgroundColor: "#d92335" }}
                        >
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
            {/* Request Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">
                Request Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Summited Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {requestData.requestedDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Due Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {requestData.dueDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Summited By</p>
                    <p className="text-sm font-medium text-gray-900">
                      {requestData.requestedBy}
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 mb-1">Project</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {requestData.projectName}
                      </p>
                      <p className="text-xs text-gray-500 font-mono mt-1">
                        {requestData.projectCode}
                      </p>
                      <div className="flex items-center ">
                        <span className="text-xs font-mono text-gray-500">
                          {requestData.projectRegion}/
                        </span>
                        <span className="text-xs font-mono text-gray-500">
                          {requestData.projectCompnay}/
                        </span>{" "}
                        <span className="text-xs font-mono text-gray-500">
                          {requestData.projectDepartment}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2.5 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit Request
                </button>
                <button className="w-full px-4 py-2.5 bg-gray-50 cursor-pointer hover:bg-gray-100 rounded-lg text-left text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button className="w-full px-4 py-2.5 bg-gray-50 cursor-pointer hover:bg-gray-100 rounded-lg text-left text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Add Comment
                </button>
              </div>
            </div>

            {/* Status History */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">
                Status History
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-gray-900">Created</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Feb 10, 2025 - 9:15 AM
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      by Mahmoud Ahmed
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-gray-900">
                      Sent to Review
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Feb 10, 2025 - 10:00 AM
                    </p>
                    <p className="text-xs text-gray-500 mt-1">by System</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-gray-900">Draft</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Feb 13, 2025 - 08:00 AM
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Status changed to Draft
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal (Upload Document) */}
      {showUploadModal && (
              <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Upload New Document
                    </h3>
                    <button
                      onClick={resetUploadModal}
                      className="p-1 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
      
                  <div className="p-6 space-y-4">
                    <div>
                      <label
                        htmlFor="document-name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Document Name
                      </label>
                      <input
                        id="document-name"
                        type="text"
                        placeholder="Enter document name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document Type
                      </label>
                      <div className="relative">
                        <select
                          value={fileType}
                          onChange={(e) => setFileType(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 appearance-none pr-10"
                        >
                          <option value="" disabled>
                            Select a document type
                          </option>
                          <option value="specification" >
                            Specification
                          </option>
                          <option value="drawing" >
                            Drawing
                          </option>
                          <option value="certificate" >
                            Certificate
                          </option>
                          <option value="quotation" >
                            Quotation
                          </option>
                          <option value="invoice" >
                            Invoice
                          </option>
                          <option value="other" >
                            Other
                          </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed p-10 rounded-lg text-center transition-colors ${
                        isDragging
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    >
                      {uploadFile ? (
                        <div className="flex items-center justify-center gap-3">
                          <p className="text-sm font-medium text-gray-900">
                          </p>
                          <button
                            onClick={() => setUploadFile(null)}
                            className="ml-4 text-red-500 hover:text-red-700"
                          >
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-gray-600">
                            Drag and drop your file here, or{" "}
                            <label className="text-red-600 font-medium cursor-pointer hover:text-red-700">
                              <input
                                type="file"
                                className="hidden"
                                onChange={handleFileSelect}
                              />
                              browse
                            </label>
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Max file size: 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
      
                  {/* Modal Footer */}
                  <div className="p-5 border-t border-gray-200 flex justify-end gap-3">
                    <button
                      onClick={resetUploadModal}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUploadSubmit}
                      disabled={!uploadFile || !fileType}
                      className={`px-4 py-2 text-white rounded-lg text-sm font-medium transition-opacity ${
                        !uploadFile || !fileType
                          ? "bg-red-300 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            )}
    </div>
  );
};

export default RFBsDetailPage;
