"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  Send,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  MoreVertical,
  FileText,
  User,
  Building2,
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { STATUS_COLORS } from "@/constants";
import RFPComparisonModal from "./RFPComparisonModal";

export interface RFP {
  id: string;
  supplier: string;
  status: "pending" | "submitted" | "accepted" | "rejected" | "expired";
  submittedDate?: string;
  totalAmount: number;
  responseTime?: string;
  validUntil?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
  items?: Array<{
    id: string;
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
  }>;
  attachments?: Array<{
    name: string;
    size: string;
    url: string;
  }>;
}

interface RFPsTabProps {
  rfps: RFP[];
  onViewDetails?: (rfpId: string) => void;
  onAccept?: (rfpId: string) => void;
  onReject?: (rfpId: string) => void;
  onSendNew?: () => void;
  onCompare?: (rfpIds: string[]) => void;
  onExport?: (rfpIds: string[]) => void;
  className?: string;
  title?: string;
  description?: string;
}

const RFPsTab: React.FC<RFPsTabProps> = ({
  rfps,
  onViewDetails,
  onAccept,
  onReject,
  onSendNew,
  onCompare,
  onExport,
  className = "",
  title = "Request for Proposals (RFPs)",
  description = "Manage and compare proposals from suppliers",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "supplier">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [selectedRFPs, setSelectedRFPs] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Filter and sort RFPs
  const filteredAndSortedRFPs = useMemo(() => {
    let filtered = rfps.filter((rfp) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        rfp.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rfp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (rfp.contactPerson &&
          rfp.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()));

      // Status filter
      const matchesStatus = filterStatus === "all" || rfp.status === filterStatus;

      return matchesSearch && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "date":
          const dateA = a.submittedDate ? new Date(a.submittedDate).getTime() : 0;
          const dateB = b.submittedDate ? new Date(b.submittedDate).getTime() : 0;
          comparison = dateA - dateB;
          break;
        case "amount":
          comparison = a.totalAmount - b.totalAmount;
          break;
        case "supplier":
          comparison = a.supplier.localeCompare(b.supplier);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [rfps, searchQuery, filterStatus, sortBy, sortOrder]);

  const toggleSelectRFP = (rfpId: string) => {
    setSelectedRFPs((prev) =>
      prev.includes(rfpId)
        ? prev.filter((id) => id !== rfpId)
        : [...prev, rfpId]
    );
  };

  const selectAll = () => {
    if (selectedRFPs.length === filteredAndSortedRFPs.length) {
      setSelectedRFPs([]);
    } else {
      setSelectedRFPs(filteredAndSortedRFPs.map((rfp) => rfp.id));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "expired":
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, keyof typeof STATUS_COLORS> = {
      pending: "pending",
      submitted: "in_progress",
      accepted: "completed",
      rejected: "cancelled",
      expired: "pending",
    };
    const statusKey = statusMap[status] || "pending";
    return statusKey;
  };

  const totalAmount = filteredAndSortedRFPs.reduce(
    (sum, rfp) => sum + rfp.totalAmount,
    0
  );
  const averageAmount =
    filteredAndSortedRFPs.length > 0
      ? totalAmount / filteredAndSortedRFPs.length
      : 0;
  const minAmount =
    filteredAndSortedRFPs.length > 0
      ? Math.min(...filteredAndSortedRFPs.map((r) => r.totalAmount))
      : 0;
  const maxAmount =
    filteredAndSortedRFPs.length > 0
      ? Math.max(...filteredAndSortedRFPs.map((r) => r.totalAmount))
      : 0;

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              {title}
            </h3>
            <p className="text-sm text-gray-600 mt-1.5">{description}</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {selectedRFPs.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (selectedRFPs.length >= 2) {
                      setShowComparisonModal(true);
                      onCompare?.(selectedRFPs);
                    }
                  }}
                  leftIcon={<TrendingUp className="w-4 h-4" />}
                  disabled={selectedRFPs.length < 2}
                >
                  Compare ({selectedRFPs.length})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onExport?.(selectedRFPs)}
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Export
                </Button>
              </>
            )}
            <Button
              variant="primary"
              size="md"
              leftIcon={<Send className="w-4 h-4" />}
              onClick={onSendNew}
              style={{ backgroundColor: "#d92335" }}
            >
              Send New RFP
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        {filteredAndSortedRFPs.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-5 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm text-blue-700 font-medium">
                  Total RFPs
                </p>
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-blue-900">
                {filteredAndSortedRFPs.length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 sm:p-5 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm text-green-700 font-medium">
                  Average Amount
                </p>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-green-900">
                {averageAmount.toLocaleString()} SAR
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 sm:p-5 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm text-purple-700 font-medium">
                  Lowest
                </p>
                <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-purple-900">
                {minAmount.toLocaleString()} SAR
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 sm:p-5 border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm text-orange-700 font-medium">
                  Highest
                </p>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-orange-900">
                {maxAmount.toLocaleString()} SAR
              </p>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by supplier, RFP ID, or contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 sm:px-5 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base bg-white min-w-[150px]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [by, order] = e.target.value.split("-");
                  setSortBy(by as "date" | "amount" | "supplier");
                  setSortOrder(order as "asc" | "desc");
                }}
                className="px-4 sm:px-5 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base bg-white min-w-[150px]"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
                <option value="supplier-asc">Supplier A-Z</option>
                <option value="supplier-desc">Supplier Z-A</option>
              </select>
            </div>
          </div>

          {/* Selection Actions */}
          {selectedRFPs.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 sm:p-5 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={
                    selectedRFPs.length === filteredAndSortedRFPs.length &&
                    filteredAndSortedRFPs.length > 0
                  }
                  onChange={selectAll}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm sm:text-base font-medium text-blue-900">
                  {selectedRFPs.length} RFP(s) selected
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRFPs([])}
                >
                  Clear Selection
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (selectedRFPs.length >= 2) {
                      setShowComparisonModal(true);
                      onCompare?.(selectedRFPs);
                    }
                  }}
                  leftIcon={<TrendingUp className="w-4 h-4" />}
                  disabled={selectedRFPs.length < 2}
                >
                  Compare
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onExport?.(selectedRFPs)}
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Export Selected
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* RFPs List */}
        {filteredAndSortedRFPs.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-sm sm:text-base font-medium text-gray-900 mb-2">
              No RFPs found
            </p>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              {searchQuery || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "Send your first RFP to get started"}
            </p>
          </div>
        ) : viewMode === "cards" ? (
          <div className="space-y-4 sm:space-y-6">
            {filteredAndSortedRFPs.map((rfp) => (
              <div
                key={rfp.id}
                className={`relative bg-white rounded-lg border-2 transition-all hover:shadow-lg ${
                  selectedRFPs.includes(rfp.id)
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6">
                    {/* Left Section */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <input
                              type="checkbox"
                              checked={selectedRFPs.includes(rfp.id)}
                              onChange={() => toggleSelectRFP(rfp.id)}
                              className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 flex-shrink-0 mt-1"
                            />
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                              {rfp.id}
                            </h4>
                            <Badge variant={getStatusColor(rfp.status) as any} size="md">
                              <div className="flex items-center gap-1.5">
                                {getStatusIcon(rfp.status)}
                                <span className="capitalize">{rfp.status}</span>
                              </div>
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600 mb-3">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">
                              {rfp.supplier}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Total Amount</p>
                            <p className="text-sm sm:text-base font-bold text-gray-900">
                              {rfp.totalAmount.toLocaleString()} SAR
                            </p>
                          </div>
                        </div>
                        {rfp.submittedDate && (
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-50 rounded-lg">
                              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Submitted</p>
                              <p className="text-sm sm:text-base font-medium text-gray-900">
                                {rfp.submittedDate}
                              </p>
                            </div>
                          </div>
                        )}
                        {rfp.responseTime && (
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-50 rounded-lg">
                              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Response Time</p>
                              <p className="text-sm sm:text-base font-medium text-gray-900">
                                {rfp.responseTime}
                              </p>
                            </div>
                          </div>
                        )}
                        {rfp.contactPerson && (
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-orange-50 rounded-lg">
                              <User className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Contact</p>
                              <p className="text-sm sm:text-base font-medium text-gray-900">
                                {rfp.contactPerson}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Attachments */}
                      {rfp.attachments && rfp.attachments.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-gray-600">Attachments:</span>
                          {rfp.attachments.map((att, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200"
                            >
                              {att.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-end lg:items-stretch gap-2 sm:gap-3">
                      <Button
                        variant="outline"
                        size="md"
                        leftIcon={<Eye className="w-4 h-4" />}
                        onClick={() => onViewDetails?.(rfp.id)}
                        className="w-full sm:w-auto lg:w-full"
                      >
                        View Details
                      </Button>
                      {rfp.status === "submitted" && (
                        <>
                          <Button
                            variant="primary"
                            size="md"
                            leftIcon={<Check className="w-4 h-4" />}
                            onClick={() => onAccept?.(rfp.id)}
                            style={{ backgroundColor: "#10b981" }}
                            className="w-full sm:w-auto lg:w-full"
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="md"
                            leftIcon={<X className="w-4 h-4" />}
                            onClick={() => onReject?.(rfp.id)}
                            className="w-full sm:w-auto lg:w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedRFPs.length === filteredAndSortedRFPs.length &&
                        filteredAndSortedRFPs.length > 0
                      }
                      onChange={selectAll}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    RFP ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedRFPs.map((rfp) => (
                  <tr
                    key={rfp.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      selectedRFPs.includes(rfp.id) ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRFPs.includes(rfp.id)}
                        onChange={() => toggleSelectRFP(rfp.id)}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm sm:text-base font-medium text-gray-900">
                        {rfp.id}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm sm:text-base text-gray-900">
                          {rfp.supplier}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={getStatusColor(rfp.status) as any} size="sm">
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(rfp.status)}
                          <span className="capitalize">{rfp.status}</span>
                        </div>
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm sm:text-base font-bold text-gray-900">
                        {rfp.totalAmount.toLocaleString()} SAR
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm sm:text-base text-gray-600">
                        {rfp.submittedDate || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewDetails?.(rfp.id)}
                          leftIcon={<Eye className="w-4 h-4" />}
                        >
                          View
                        </Button>
                        {rfp.status === "submitted" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onAccept?.(rfp.id)}
                              leftIcon={<Check className="w-4 h-4" />}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              Accept
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onReject?.(rfp.id)}
                              leftIcon={<X className="w-4 h-4" />}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Comparison Modal */}
      <RFPComparisonModal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        selectedRFPs={selectedRFPs}
        rfps={rfps}
      />
    </div>
  );
};

export default RFPsTab;

