"use client";

import React, { useState } from "react";
import { Upload, Link, FileText, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Logo from "../../../../public/assets/images/logo.jpg";
import { useRouter } from "next/navigation";

const AddCategoriesPage = () => {
  const router = useRouter();
  const [importSource, setImportSource] = useState("");
  const [importMethod, setImportMethod] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [apiUrl, setApiUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFileChange = (e: {
    target: { files: React.SetStateAction<null>[] };
  }) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileSubmit = () => {
    if (selectedFile) {
      //@ts-expect-error:name
      console.log("File uploaded:", selectedFile.name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl border border-gray-100">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className=" rounded-2xl flex items-center justify-center shadow-lg">
            <Image
              src={Logo}
              alt="Logo"
              width={100}
              height={30}
              className="w-auto h-auto"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add Categories
        </h1>

        {/* Import Source Selection */}
        <div className="space-y-4 mb-6">
          <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
            <input
              type="radio"
              name="importSource"
              value="buildmart"
              checked={importSource === "buildmart"}
              onChange={(e) => {
                setImportSource(e.target.value);
                setImportMethod("");
              }}
              className="w-5 h-5 text-blue-600"
            />
            <span className="ml-3 text-lg font-medium text-gray-700">
              Import from BuildMart
            </span>
          </label>

          <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all">
            <input
              type="radio"
              name="importSource"
              value="category"
              checked={importSource === "category"}
              onChange={(e) => {
                setImportSource(e.target.value);
                setImportMethod("");
              }}
              className="w-5 h-5 text-purple-600"
            />
            <span className="ml-3 text-lg font-medium text-gray-700">
              Import from Category
            </span>
          </label>
        </div>

        {/* Category Import Methods */}
        {importSource === "category" && (
          <div className="space-y-4 mb-6 animate-in">
            <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all">
              <input
                type="radio"
                name="importMethod"
                value="upload"
                checked={importMethod === "upload"}
                onChange={(e) => setImportMethod(e.target.value)}
                className="w-5 h-5 text-green-600"
              />
              <Upload className="ml-3 text-green-600" size={20} />
              <span className="ml-2 text-lg font-medium text-gray-700">
                Upload File
              </span>
            </label>

            <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all">
              <input
                type="radio"
                name="importMethod"
                value="api"
                checked={importMethod === "api"}
                onChange={(e) => setImportMethod(e.target.value)}
                className="w-5 h-5 text-indigo-600"
              />
              <Link className="ml-3 text-indigo-600" size={20} />
              <span className="ml-2 text-lg font-medium text-gray-700">
                Integration API
              </span>
            </label>
          </div>
        )}

        {/* Upload File Section */}
        {importSource === "category" && importMethod === "upload" && (
          <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200 animate-in">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select File
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="file"
                  //@ts-expect-error:onChange
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                  accept=".csv,.xlsx,.xls,.json"
                />
                <label
                  htmlFor="fileInput"
                  className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all"
                >
                  <FileText className="text-gray-400 mr-2" size={20} />
                  <span className="text-gray-600">
                    {selectedFile
                      ? //@ts-expect-error:name
                        selectedFile.name
                      : "Choose file..."}
                  </span>
                </label>
              </div>
              <button
                onClick={handleFileSubmit}
                disabled={!selectedFile}
                className="bg-[#d92335] text-white px-6 py-3 cursor-pointer rounded-xl font-semibold  disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Submit
              </button>
            </div>
            {selectedFile && (
              <p className="mt-3 text-sm text-green-600 flex items-center">
                <FileText size={16} className="mr-1" />
                File selected:{" "}
                {
                  //@ts-expect-error:name
                  selectedFile.name
                }
              </p>
            )}
          </div>
        )}

        {/* Integration API Section */}
        {importSource === "category" && importMethod === "api" && (
          <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200 space-y-4 animate-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API URL
              </label>
              <input
                type="url"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="https://api.example.com/categories"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2  focus:border-transparent transition-all"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2  focus:border-transparent transition-all"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2  focus:border-transparent transition-all"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => router.push("/setup-account")}
            className="flex items-center gap-2 bg-gray-100 cursor-pointer text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <button className="flex items-center gap-2 bg-[#d92335] text-white py-3 px-6 rounded-xl font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl">
            Next
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoriesPage;
