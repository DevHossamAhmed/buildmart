/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Download,
  Send,
  Clock,
  CheckCircle,
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
  ShoppingCart,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import PageHeaderWrapper from "@/components/ui/PageHeaderWrapper";
import StatCard from "@/components/ui/StatCard";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { STATUS_COLORS } from "@/constants";
import { CommunicationTab, DocumentsTab, RFPsTab } from "@/components/ui";

const RFBsDetailPage = () => {
  const params = useParams();
  const rfbsId = params?.id as string;
  const { setBreadcrumbs } = useBreadcrumbContext();
  const [activeTab, setActiveTab] = useState("overview");
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  // Set custom breadcrumbs for this dynamic route
  useEffect(() => {
    setBreadcrumbs([
      { label: "Home", href: "/dashboard" },
      { label: "Material Requests", href: "/material-request" },
      { label: `RFB ${rfbsId || "Details"}` },
    ]);
  }, [rfbsId, setBreadcrumbs]);

  // Sample data for the material request
  const requestData = {
    id: "MR-002",
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
      mrCode: "MR-2024-001",
      masterCode: "MC-STEEL-001",
    },
    {
      id: 2,
      category: "Construction",
      description: "Steel Rebar 12mm",
      quantity: 200,
      unit: "kg",
      unitPrice: 22.0,
      totalPrice: 4400,
      mrCode: "MR-2024-002",
      masterCode: "MC-STEEL-002",
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
      contactPerson: "Ahmed Hassan",
      contactEmail: "ahmed@steelco.com",
      contactPhone: "+966 50 123 4567",
      items: [
        {
          id: "VND-001",
          description: "Steel Rebar 16mm",
          quantity: 300,
          unit: "kg",
          unitPrice: 26.5,
          totalPrice: 7950,
        },
        {
          id: "VND-002",
          description: "Steel Rebar 12mm",
          quantity: 200,
          unit: "kg",
          unitPrice: 22.5,
          totalPrice: 4500,
        },
      ],
      attachments: [
        { name: "Quotation_RFPs-001.pdf", size: "245 KB", url: "/docs/quotation-001.pdf" },
        { name: "Specification_Sheet.pdf", size: "1.2 MB", url: "/docs/spec-001.pdf" },
      ],
    },
    {
      id: "RFPs-002",
      supplier: "Modern Materials Ltd.",
      status: "submitted",
      submittedDate: "2025-02-12",
      totalAmount: 12050,
      responseTime: "1 day",
      contactPerson: "Sarah Ali",
      contactEmail: "sarah@modernmaterials.com",
      contactPhone: "+966 50 234 5678",
      items: [
        {
          id: "VND-003",
          description: "Steel Rebar 16mm",
          quantity: 300,
          unit: "kg",
          unitPrice: 25.0,
          totalPrice: 7500,
        },
        {
          id: "VND-004",
          description: "Steel Rebar 12mm",
          quantity: 200,
          unit: "kg",
          unitPrice: 22.75,
          totalPrice: 4550,
        },
      ],
      attachments: [
        { name: "Quotation_RFPs-002.pdf", size: "312 KB", url: "/docs/quotation-002.pdf" },
      ],
    },
    {
      id: "RFPs-003",
      supplier: "Prime Construction Supply",
      status: "pending",
      submittedDate: "2025-02-11",
      totalAmount: 11800,
      responseTime: "2 days",
      contactPerson: "Mohammed Al-Rashid",
      contactEmail: "mohammed@primeconstruction.com",
      contactPhone: "+966 50 345 6789",
      items: [
        {
          id: "VND-005",
          description: "Steel Rebar 16mm",
          quantity: 300,
          unit: "kg",
          unitPrice: 25.5,
          totalPrice: 7650,
        },
        {
          id: "VND-006",
          description: "Steel Rebar 12mm",
          quantity: 200,
          unit: "kg",
          unitPrice: 22.0,
          totalPrice: 4400,
        },
      ],
      attachments: [
        { name: "Quotation_RFPs-003.pdf", size: "298 KB", url: "/docs/quotation-003.pdf" },
        { name: "Delivery_Terms.pdf", size: "156 KB", url: "/docs/delivery-003.pdf" },
      ],
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
      type: "comment" as const,
      attachments: [
        { name: "certificate_sample.pdf", size: "245 KB", type: "PDF" },
      ],
    },
    {
      id: 2,
      user: "Mahmoud Ahmed",
      action: "created",
      message: "Material request created and submitted for approval",
      timestamp: "2025-02-10 09:15 AM",
      type: "system" as const,
    },
    {
      id: 3,
      user: "Ahmed Hassan",
      action: "commented",
      message:
        "I've reviewed the specifications. All requirements look good. We can proceed with the RFPs.",
      timestamp: "2025-02-11 02:15 PM",
      type: "comment" as const,
    },
  ];

  const totalAmount = boqItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, keyof typeof STATUS_COLORS> = {
      draft: "draft",
      pending: "pending",
      submitted: "in_progress",
      approved: "completed",
      rejected: "cancelled",
      active: "active",
      inactive: "inactive",
    };
    const statusKey = statusMap[status] || "pending";
    const colors = STATUS_COLORS[statusKey];
    return `${colors.bg} ${colors.text} ${colors.border}`;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "bg-gray-100 text-gray-700 border-gray-300",
      normal: "bg-blue-100 text-blue-700 border-blue-300",
      high: "bg-orange-100 text-orange-700 border-orange-300",
      urgent: "bg-red-100 text-red-700 border-red-300",
    };
    return colors[priority] || colors.normal;
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "rfps", label: "RFPs" },
    { id: "documents", label: "Documents" },
    { id: "Communication", label: "Communication" },
  ];

  const stats = [
    {
      label: "Total Items",
      value: String(boqItems.length),
      icon: Package,
      iconColor: "text-blue-500",
      trend: "neutral" as const,
    },
    {
      label: "Est. Value",
      value: `${totalAmount.toLocaleString()} SAR`,
      icon: DollarSign,
      iconColor: "text-green-500",
      trend: "up" as const,
    },
    {
      label: "RFPs Sent",
      value: String(requestData.rfbsCount),
      icon: ShoppingCart,
      iconColor: "text-purple-500",
      trend: "up" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <PageHeaderWrapper
        title={
          <div className="flex items-center gap-3">
            <Link href="/material-request">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {requestData.id}
                </h1>
                <Badge variant={requestData.status as any} size="md">
                  {requestData.status.charAt(0).toUpperCase() +
                    requestData.status.slice(1)}
                </Badge>
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
        }
        description=""
        sticky={true}
        zIndex={40}
        actions={
          <>
            <Button
              variant="outline"
              size="md"
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export
            </Button>
            <Button
              variant="primary"
              size="md"
              leftIcon={<Send className="w-4 h-4" />}
              style={{ backgroundColor: "#d92335" }}
            >
              Send RFPs
            </Button>
            <div className="relative">
              <button
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              {showStatusMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit Request
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View History
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Request
                  </button>
                </div>
              )}
            </div>
          </>
        }
      >
        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 -mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: "#d92335" }}
                />
              )}
            </button>
          ))}
        </div>
      </PageHeaderWrapper>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "overview" && (
              <>
                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {stats.map((stat, idx) => (
                    <StatCard
                      key={idx}
                      label={stat.label}
                      value={stat.value}
                      icon={stat.icon}
                      iconColor={stat.iconColor}
                      trend={stat.trend}
                    />
                  ))}
                </div>

                {/* Description */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {requestData.description}
                  </p>
                </div>

                {/* BOQ Summary */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quantities
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Master Code
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            MR Code
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {boqItems.map((item) => (
                          <tr
                            key={item.id}
                            className="hover:bg-gray-50 transition-colors duration-150"
                          >
                            <td className="px-4 py-4">
                              <Badge variant="info" size="sm">
                                {item.masterCode}
                              </Badge>
                            </td>
                            <td className="px-4 py-4">
                              <Badge variant="info" size="sm">
                                {item.mrCode}
                              </Badge>
                            </td>
                            <td className="px-4 py-4">
                              <Badge variant="default" size="sm">
                                {item.category}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900 font-medium">
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
              <RFPsTab
                rfps={rfbsData.map((rfb) => ({
                  ...rfb,
                  status: rfb.status as "pending" | "submitted" | "accepted" | "rejected" | "expired",
                  items: rfb.items || [],
                  attachments: rfb.attachments || [],
                  contactPerson: rfb.contactPerson,
                  contactEmail: rfb.contactEmail,
                  contactPhone: rfb.contactPhone,
                }))}
                onViewDetails={(rfpId) => {
                  console.log("Viewing RFP details:", rfpId);
                  // Add navigation logic here
                }}
                onAccept={(rfpId) => {
                  console.log("Accepting RFP:", rfpId);
                  // Add accept logic here
                }}
                onReject={(rfpId) => {
                  console.log("Rejecting RFP:", rfpId);
                  // Add reject logic here
                }}
                onSendNew={() => {
                  console.log("Sending new RFP");
                  // Add send new RFP logic here
                }}
                onCompare={(rfpIds) => {
                  console.log("Comparing RFPs:", rfpIds);
                  // Add compare logic here
                }}
                onExport={(rfpIds) => {
                  console.log("Exporting RFPs:", rfpIds);
                  // Add export logic here
                }}
              />
            )}

            {activeTab === "documents" && (
              <DocumentsTab
                documents={documentsData.map((doc, index) => ({
                  ...doc,
                  uploadedBy: index === 0 ? "Mahmoud Ahmed" : "Sara Ali",
                  uploadedDate: index === 0 ? "2025-02-10" : "2025-02-11",
                  type: doc.name.includes("Specification")
                    ? "specification"
                    : doc.name.includes("Drawing")
                    ? "drawing"
                    : "other",
                }))}
                onUpload={(file, name, type) => {
                  console.log("Uploading:", { file, name, type });
                  // Add upload logic here
                }}
                onDelete={(index) => {
                  console.log("Deleting document at index:", index);
                  // Add delete logic here
                }}
                onDownload={(url, name) => {
                  console.log("Downloading:", { url, name });
                  // Add download logic here
                }}
                onPreview={(url, name) => {
                  console.log("Previewing:", { url, name });
                  // Add preview logic here
                }}
              />
            )}

            {activeTab === "Communication" && (
              <CommunicationTab
                activities={activities}
                onAddComment={(comment, attachments) => {
                  console.log("Adding comment:", { comment, attachments });
                  // Add comment logic here
                }}
                onReply={(activityId, replyText) => {
                  console.log("Replying to activity:", { activityId, replyText });
                  // Add reply logic here
                }}
                currentUser={{
                  name: "Current User",
                  initials: "CU",
                }}
              />
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Request Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">
                Request Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Submitted Date</p>
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
                    <p className="text-xs text-gray-600">Submitted By</p>
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
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs font-mono text-gray-500">
                          {requestData.projectRegion}/
                        </span>
                        <span className="text-xs font-mono text-gray-500">
                          {requestData.projectCompnay}/
                        </span>
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="md"
                  leftIcon={<Edit2 className="w-4 h-4" />}
                  className="w-full justify-start"
                >
                  Edit Request
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  leftIcon={<Download className="w-4 h-4" />}
                  className="w-full justify-start"
                >
                  Download PDF
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                  className="w-full justify-start"
                >
                  Add Comment
                </Button>
              </div>
            </div>

            {/* Status History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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

    </div>
  );
};

export default RFBsDetailPage;
