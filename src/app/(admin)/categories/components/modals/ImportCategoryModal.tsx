"use client";

import React, { useState } from "react";
import { X, Package, FolderOpen, Upload, Link, FileText } from "lucide-react";
import Button from "@/components/ui/Button";

interface ImportCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const ImportCategoryModal: React.FC<ImportCategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [importSource, setImportSource] = useState("");
  const [importMethod, setImportMethod] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [apiUrl, setApiUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      importSource,
      importMethod,
      selectedFile,
      apiUrl,
      username,
      password,
    });
    setImportSource("");
    setImportMethod("");
    setSelectedFile(null);
    setApiUrl("");
    setUsername("");
    setPassword("");
    onClose();
  };

  const handleClose = () => {
    setImportSource("");
    setImportMethod("");
    setSelectedFile(null);
    setApiUrl("");
    setUsername("");
    setPassword("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-900">
            Import Categories
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Import Source Selection */}
          <div className="space-y-3">
            <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
              <input
                type="radio"
                name="importSource"
                value="buildmart"
                checked={importSource === "buildmart"}
                onChange={(e) => {
                  setImportSource(e.target.value);
                  setImportMethod("");
                }}
                className="w-4 h-4 text-blue-600"
              />
              <Package className="ml-3 text-blue-600" size={20} />
              <span className="ml-2 text-base font-medium text-gray-700">
                Import from BuildMart
              </span>
            </label>

            <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all">
              <input
                type="radio"
                name="importSource"
                value="custom"
                checked={importSource === "custom"}
                onChange={(e) => {
                  setImportSource(e.target.value);
                  setImportMethod("");
                }}
                className="w-4 h-4 text-purple-600"
              />
              <FolderOpen className="ml-3 text-purple-600" size={20} />
              <span className="ml-2 text-base font-medium text-gray-700">
                Import Custom Categories
              </span>
            </label>
          </div>

          {/* Custom Import Methods */}
          {importSource === "custom" && (
            <div className="space-y-3 pt-2">
              <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all">
                <input
                  type="radio"
                  name="importMethod"
                  value="upload"
                  checked={importMethod === "upload"}
                  onChange={(e) => setImportMethod(e.target.value)}
                  className="w-4 h-4 text-green-600"
                />
                <Upload className="ml-3 text-green-600" size={20} />
                <span className="ml-2 text-base font-medium text-gray-700">
                  Upload File
                </span>
              </label>

              <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all">
                <input
                  type="radio"
                  name="importMethod"
                  value="api"
                  checked={importMethod === "api"}
                  onChange={(e) => setImportMethod(e.target.value)}
                  className="w-4 h-4 text-indigo-600"
                />
                <Link className="ml-3 text-indigo-600" size={20} />
                <span className="ml-2 text-base font-medium text-gray-700">
                  Integration API
                </span>
              </label>
            </div>
          )}

          {/* Upload File Section */}
          {importSource === "custom" && importMethod === "upload" && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select File
              </label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                    accept=".csv,.xlsx,.xls,.json"
                  />
                  <label
                    htmlFor="fileInput"
                    className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-white transition-all"
                  >
                    <FileText className="text-gray-400 mr-2" size={20} />
                    <span className="text-gray-600 text-sm">
                      {selectedFile ? selectedFile.name : "Choose file..."}
                    </span>
                  </label>
                </div>
                <button
                  disabled={!selectedFile}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                >
                  Upload
                </button>
              </div>
              {selectedFile && (
                <p className="mt-2 text-sm text-green-600">
                  ✓ File selected: {selectedFile.name}
                </p>
              )}
            </div>
          )}

          {/* Integration API Section */}
          {importSource === "custom" && importMethod === "api" && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API URL
                </label>
                <input
                  type="url"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="https://api.example.com/categories"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* BuildMart Import Info */}
          {importSource === "buildmart" && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <Package className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    BuildMart Integration
                  </p>
                  <p className="text-sm text-blue-700">
                    This will import all standard categories from BuildMart catalog.
                    The process may take a few minutes depending on the catalog size.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !importSource ||
              (importSource === "custom" &&
                (!importMethod ||
                  (importMethod === "upload" && !selectedFile) ||
                  (importMethod === "api" &&
                    (!apiUrl || !username || !password))))
            }
            style={{ backgroundColor: "#d92335" }}
          >
            Import Categories
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImportCategoryModal;

