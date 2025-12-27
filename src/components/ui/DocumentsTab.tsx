"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Trash2,
  Upload,
  Eye,
  Search,
  Filter,
  Grid,
  List,
  File,
  Image as ImageIcon,
  FileCode,
  FileSpreadsheet,
  MoreVertical,
  Share2,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";

export interface Document {
  name: string;
  size: string;
  url: string;
  type?: string;
  uploadedBy?: string;
  uploadedDate?: string;
  category?: string;
}

interface DocumentsTabProps {
  documents: Document[];
  onUpload?: (file: File, name: string, type: string) => void;
  onDelete?: (index: number) => void;
  onDownload?: (url: string, name: string) => void;
  onPreview?: (url: string, name: string) => void;
  className?: string;
  title?: string;
  description?: string;
  maxFileSize?: number; // in MB
  allowedFileTypes?: string[];
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({
  documents,
  onUpload,
  onDelete,
  onDownload,
  onPreview,
  className = "",
  title = "Documents & Attachments",
  description = "Manage all documents related to this request",
  maxFileSize = 10,
  allowedFileTypes,
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-600" />;
      case "doc":
      case "docx":
        return <FileText className="w-5 h-5 text-blue-600" />;
      case "xls":
      case "xlsx":
        return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <ImageIcon className="w-5 h-5 text-purple-600" />;
      case "dwg":
      case "cad":
        return <FileCode className="w-5 h-5 text-orange-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const getFileTypeColor = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return "bg-red-100 text-red-700 border-red-300";
      case "doc":
      case "docx":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "xls":
      case "xlsx":
        return "bg-green-100 text-green-700 border-green-300";
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "dwg":
      case "cad":
        return "bg-orange-100 text-orange-700 border-orange-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > maxFileSize * 1024 * 1024) {
        alert(`File size exceeds ${maxFileSize}MB limit`);
        return;
      }
      setUploadFile(file);
      setDocumentName(file.name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > maxFileSize * 1024 * 1024) {
        alert(`File size exceeds ${maxFileSize}MB limit`);
        return;
      }
      setUploadFile(file);
      setDocumentName(file.name);
    }
  };

  const handleUpload = () => {
    if (uploadFile && documentName && documentType) {
      onUpload?.(uploadFile, documentName, documentType);
      setShowUploadModal(false);
      setUploadFile(null);
      setDocumentName("");
      setDocumentType("");
    }
  };

  const filteredDocuments = documents.filter((doc, index) => {
    // Search filter - search in name, uploadedBy, and category
    const matchesSearch =
      !searchQuery ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.uploadedBy && doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doc.category && doc.category.toLowerCase().includes(searchQuery.toLowerCase()));

    // Type filter - check doc.type first, then try to infer from filename
    let matchesFilter = true;
    if (filterType !== "all") {
      // First check if doc.type matches
      if (doc.type && doc.type.toLowerCase() === filterType.toLowerCase()) {
        matchesFilter = true;
      } else {
        // Try to infer from filename or document name
        const fileName = doc.name.toLowerCase();
        const docType = doc.type?.toLowerCase() || "";
        
        // Map filter types to possible matches
        const typeMappings: Record<string, string[]> = {
          specification: ["spec", "specification", "specs"],
          drawing: ["drawing", "dwg", "cad", "blueprint"],
          certificate: ["certificate", "cert", "certification"],
          quotation: ["quotation", "quote", "quota"],
          invoice: ["invoice", "inv", "bill"],
        };

        const possibleMatches = typeMappings[filterType] || [filterType];
        const matchesTypeMapping = possibleMatches.some(match => 
          fileName.includes(match) || docType.includes(match)
        );

        matchesFilter = matchesTypeMapping;
      }
    }

    return matchesSearch && matchesFilter;
  });

  const toggleSelectDocument = (index: number) => {
    setSelectedDocuments((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const documentTypes = [
    { value: "all", label: "All Types" },
    { value: "specification", label: "Specification" },
    { value: "drawing", label: "Drawing" },
    { value: "certificate", label: "Certificate" },
    { value: "quotation", label: "Quotation" },
    { value: "invoice", label: "Invoice" },
    { value: "other", label: "Other" },
  ];

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
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Upload className="w-4 h-4" />}
              onClick={() => setShowUploadModal(true)}
              style={{ backgroundColor: "#d92335" }}
            >
              Upload Document
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 sm:px-5 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base bg-white min-w-[150px]"
              >
                {documentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "list"
                    ? "bg-red-50 text-red-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                title="List view"
              >
                <List className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "grid"
                    ? "bg-red-50 text-red-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                title="Grid view"
              >
                <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Selection Actions */}
          {selectedDocuments.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 sm:p-5 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-sm sm:text-base font-medium text-blue-900">
                {selectedDocuments.length} document(s) selected
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Download
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Share2 className="w-4 h-4" />}
                >
                  Share
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Trash2 className="w-4 h-4" />}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Delete
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedDocuments([])}
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Documents List/Grid */}
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-sm sm:text-base font-medium text-gray-900 mb-2">
              No documents found
            </p>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              {searchQuery || filterType !== "all"
                ? "Try adjusting your search or filters"
                : "Upload your first document to get started"}
            </p>
          </div>
        ) : viewMode === "list" ? (
          <div className="space-y-3 sm:space-y-4">
            {filteredDocuments.map((doc) => {
              // Find the original index in the documents array
              const originalIndex = documents.findIndex(d => d === doc);
              const index = originalIndex >= 0 ? originalIndex : documents.length;
              return (
              <div
                key={index}
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border transition-all ${
                  selectedDocuments.includes(index)
                    ? "bg-blue-50 border-blue-300"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(index)}
                    onChange={() => toggleSelectDocument(index)}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 flex-shrink-0"
                  />
                  <div className="p-2.5 sm:p-3 bg-white rounded-lg border border-gray-200 flex-shrink-0">
                    {getFileIcon(doc.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                      {doc.name}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
                      <span className="text-xs sm:text-sm text-gray-500">
                        {doc.size}
                      </span>
                      {doc.uploadedBy && (
                        <>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs sm:text-sm text-gray-500">
                            {doc.uploadedBy}
                          </span>
                        </>
                      )}
                      {doc.uploadedDate && (
                        <>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs sm:text-sm text-gray-500">
                            {doc.uploadedDate}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <span
                    className={`px-2.5 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium border ${getFileTypeColor(
                      doc.name
                    )} flex-shrink-0`}
                  >
                    {doc.name.split(".").pop()?.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
                  <button
                    onClick={() => onDownload?.(doc.url, doc.name)}
                    className="p-2 sm:p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => onPreview?.(doc.url, doc.name)}
                    className="p-2 sm:p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => onDelete?.(index)}
                    className="p-2 sm:p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    className="p-2 sm:p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="More options"
                  >
                    <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredDocuments.map((doc) => {
              // Find the original index in the documents array
              const originalIndex = documents.findIndex(d => d === doc);
              const index = originalIndex >= 0 ? originalIndex : documents.length;
              return (
              <div
                key={index}
                className={`relative p-4 sm:p-5 rounded-lg border transition-all cursor-pointer ${
                  selectedDocuments.includes(index)
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white border-gray-200 hover:shadow-md hover:border-gray-300"
                }`}
                onClick={() => toggleSelectDocument(index)}
              >
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(index)}
                    onChange={() => toggleSelectDocument(index)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                </div>
                <div className="flex flex-col items-center text-center mb-3 sm:mb-4">
                  <div className="p-4 sm:p-5 bg-gray-50 rounded-lg mb-3 sm:mb-4">
                    {getFileIcon(doc.name)}
                  </div>
                  <p className="text-sm sm:text-base font-medium text-gray-900 truncate w-full">
                    {doc.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {doc.size}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownload?.(doc.url, doc.name);
                    }}
                    className="p-2 sm:p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreview?.(doc.url, doc.name);
                    }}
                    className="p-2 sm:p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(index);
                    }}
                    className="p-2 sm:p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 sm:p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="More options"
                  >
                    <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-5 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Upload New Document
              </h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadFile(null);
                  setDocumentName("");
                  setDocumentType("");
                }}
                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-5 sm:space-y-6">
              <div>
                <label
                  htmlFor="document-name"
                  className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                >
                  Document Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="document-name"
                  type="text"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  placeholder="Enter document name"
                  className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Document Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full px-4 sm:px-5 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none pr-10 bg-white text-sm sm:text-base"
                >
                  <option value="" disabled>
                    Select a document type
                  </option>
                  {documentTypes
                    .filter((t) => t.value !== "all")
                    .map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                </select>
              </div>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed p-8 sm:p-12 rounded-lg text-center transition-colors ${
                  isDragging
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                {uploadFile ? (
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <div className="p-3 sm:p-4 bg-white rounded-lg">
                      {getFileIcon(uploadFile.name)}
                    </div>
                    <p className="text-sm sm:text-base font-medium text-gray-900">
                      {uploadFile.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {(uploadFile.size / 1024).toFixed(1)} KB
                    </p>
                    <button
                      onClick={() => setUploadFile(null)}
                      className="mt-2 text-sm sm:text-base text-red-600 hover:text-red-700 font-medium transition-colors"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                    <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">
                      Drag and drop your file here, or
                    </p>
                    <label className="text-red-600 font-medium cursor-pointer hover:text-red-700 inline-block">
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                        accept={allowedFileTypes?.join(",")}
                      />
                      browse
                    </label>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2 sm:mt-3">
                      Max file size: {maxFileSize}MB
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="p-5 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3 bg-gray-50">
              <Button
                variant="outline"
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadFile(null);
                  setDocumentName("");
                  setDocumentType("");
                }}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpload}
                disabled={!uploadFile || !documentName || !documentType}
                style={{ backgroundColor: "#d92335" }}
                className="w-full sm:w-auto"
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsTab;

