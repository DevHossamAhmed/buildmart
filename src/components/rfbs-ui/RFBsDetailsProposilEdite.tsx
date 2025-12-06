import React, { useState } from "react";
import { Upload } from "lucide-react";

interface Item {
  id: number;
  description: string;
  offeredQty: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  availability: string;
  deliveryTime: string;
  mrCode: string;
  masterCode: string;
  vendorCode: string;
}

interface Pricing {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

interface RfbsDetailsProposilProps {
  items: Item[];
  pricing: Pricing;
}

const RfbsDetailsProposilEdite: React.FC<RfbsDetailsProposilProps> = ({
  items: initialItems,
  pricing,
}) => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [editingCell, setEditingCell] = useState<{
    id: number;
    field: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"items" | "upload">("items");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");

  const handleCellClick = (id: number, field: string) => {
    setEditingCell({ id, field });
  };

  const handleCellChange = (id: number, field: string, value: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item };
          
          if (field === "offeredQty") {
            updatedItem.offeredQty = parseFloat(value) || 0;
            updatedItem.totalPrice = updatedItem.offeredQty * updatedItem.unitPrice;
          } else if (field === "unitPrice") {
            updatedItem.unitPrice = parseFloat(value) || 0;
            updatedItem.totalPrice = updatedItem.offeredQty * updatedItem.unitPrice;
          } else if (field === "availability") {
            updatedItem.availability = value;
          } else if (field === "deliveryTime") {
            updatedItem.deliveryTime = value;
          } else if (field === "vendorCode") {
            updatedItem.vendorCode = value;
          } else if (field === "description") {
            updatedItem.description = value;
          }
          
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleBlur = () => {
    setEditingCell(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setFileName(file.name);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileName("");
    setFileType("");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("items")}
          className={`px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
            activeTab === "items"
              ? "border-b-2 border-red-600 text-red-600"
              : "text-gray-500 hover:text-red-600"
          }`}
        >
          Items
        </button>
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
            activeTab === "upload"
              ? "border-b-2 border-red-600 text-red-600"
              : "text-gray-500 hover:text-red-600"
          }`}
        >
          Upload Proposal
        </button>
      </div>

      {/* Items Tab Content */}
      {activeTab === "items" && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Master Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    MR Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Vendor Code
                  </th>
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
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-[10px] font-medium text-gray-900">
                      {item.masterCode}
                    </td>
                    <td className="px-4 py-4 text-[10px] font-medium text-gray-900">
                      {item.mrCode}
                    </td>
                    <td
                      className="px-4 py-4 text-[10px] font-medium text-gray-900 cursor-pointer hover:bg-blue-50"
                      onClick={() => handleCellClick(item.id, "vendorCode")}
                    >
                      {editingCell?.id === item.id &&
                      editingCell?.field === "vendorCode" ? (
                        <input
                          type="text"
                          className="w-32 px-2 py-1 border border-blue-500 rounded text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={item.vendorCode}
                          onChange={(e) =>
                            handleCellChange(item.id, "vendorCode", e.target.value)
                          }
                          onBlur={handleBlur}
                          autoFocus
                        />
                      ) : (
                        item.vendorCode
                      )}
                    </td>
                    <td
                      className="px-4 py-4 text-[10px] font-medium text-gray-900 cursor-pointer hover:bg-blue-50"
                      onClick={() => handleCellClick(item.id, "description")}
                    >
                      {editingCell?.id === item.id &&
                      editingCell?.field === "description" ? (
                        <input
                          type="text"
                          className="w-full px-2 py-1 border border-blue-500 rounded text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={item.description}
                          onChange={(e) =>
                            handleCellChange(item.id, "description", e.target.value)
                          }
                          onBlur={handleBlur}
                          autoFocus
                        />
                      ) : (
                        item.description
                      )}
                    </td>
                    <td
                      className="px-4 py-4 text-[10px] text-gray-600 cursor-pointer hover:bg-blue-50"
                      onClick={() => handleCellClick(item.id, "offeredQty")}
                    >
                      {editingCell?.id === item.id &&
                      editingCell?.field === "offeredQty" ? (
                        <input
                          type="number"
                          className="w-20 px-2 py-1 border border-blue-500 rounded text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={item.offeredQty}
                          onChange={(e) =>
                            handleCellChange(item.id, "offeredQty", e.target.value)
                          }
                          onBlur={handleBlur}
                          autoFocus
                        />
                      ) : (
                        <>
                          {item.offeredQty} {item.unit}
                        </>
                      )}
                    </td>
                    <td
                      className="px-4 py-4 text-[10px] text-gray-900 cursor-pointer hover:bg-blue-50"
                      onClick={() => handleCellClick(item.id, "unitPrice")}
                    >
                      {editingCell?.id === item.id &&
                      editingCell?.field === "unitPrice" ? (
                        <input
                          type="number"
                          className="w-24 px-2 py-1 border border-blue-500 rounded text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleCellChange(item.id, "unitPrice", e.target.value)
                          }
                          onBlur={handleBlur}
                          autoFocus
                        />
                      ) : (
                        `${item.unitPrice} SAR`
                      )}
                    </td>
                    <td className="px-4 py-4 text-[10px] font-semibold text-gray-900">
                      {item.totalPrice.toLocaleString()} SAR
                    </td>
                    <td
                      className="px-4 py-4 cursor-pointer hover:bg-blue-50"
                      onClick={() => handleCellClick(item.id, "availability")}
                    >
                      {editingCell?.id === item.id &&
                      editingCell?.field === "availability" ? (
                        <select
                          className="px-2 py-1 border border-blue-500 rounded text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={item.availability}
                          onChange={(e) =>
                            handleCellChange(
                              item.id,
                              "availability",
                              e.target.value
                            )
                          }
                          onBlur={handleBlur}
                          autoFocus
                        >
                          <option value="In Stock">In Stock</option>
                          <option value="Out of Stock">Out of Stock</option>
                        </select>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded text-[10px] font-medium ${
                            item.availability === "In Stock"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.availability}
                        </span>
                      )}
                    </td>
                    <td
                      className="px-4 py-4 text-[11px] text-gray-600 cursor-pointer hover:bg-blue-50"
                      onClick={() => handleCellClick(item.id, "deliveryTime")}
                    >
                      {editingCell?.id === item.id &&
                      editingCell?.field === "deliveryTime" ? (
                        <select
                          className="px-2 py-1 border border-blue-500 rounded text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={item.deliveryTime}
                          onChange={(e) =>
                            handleCellChange(
                              item.id,
                              "deliveryTime",
                              e.target.value
                            )
                          }
                          onBlur={handleBlur}
                          autoFocus
                        >
                          <option value="1-2 days">1-2 days</option>
                          <option value="3-5 days">3-5 days</option>
                          <option value="1 week">1 week</option>
                          <option value="2 weeks">2 weeks</option>
                          <option value="1 month">1 month</option>
                        </select>
                      ) : (
                        item.deliveryTime
                      )}
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
                    {pricing.subtotal.toLocaleString()} SAR
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (15%):</span>
                  <span className="font-medium text-gray-900">
                    {pricing.tax.toLocaleString()} SAR
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium text-gray-900">
                    {pricing.shipping.toLocaleString()} SAR
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-gray-200">
                  <span className="font-semibold text-gray-900">Total Amount:</span>
                  <span className="font-bold text-lg text-green-600">
                    {pricing.total.toLocaleString()} SAR
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Upload Tab Content */}
      {activeTab === "upload" && (
        <div className="py-8">
          <div className="w-full max-w-2xl mx-auto">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-red-400 transition-colors bg-gray-50">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upload Proposal File
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Select a file to upload your proposal (PDF, Excel, or Word)
              </p>
              
              <label className="inline-block">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.xlsx,.xls,.doc,.docx"
                />
                <span className="cursor-pointer inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <Upload className="w-5 h-5 mr-2" />
                  Choose File
                </span>
              </label>
              <p className="text-xs text-gray-400 mt-3">Max file size: 5MB</p>
            </div>

            {uploadedFile && (
              <div className="mt-6 bg-gray-50 rounded-lg p-4 flex items-center justify-between border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-red-100 rounded p-2 mr-3">
                    <Upload className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Upload Button */}
            {uploadedFile && fileName && fileType && (
              <div className="mt-6 flex justify-end">
                <button
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer"
                >
                  Upload Document
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RfbsDetailsProposilEdite;