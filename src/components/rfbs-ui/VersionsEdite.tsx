import React, { useState } from "react";
import { Clock, User, CheckCircle, FileText, TrendingDown } from "lucide-react";

const VersionsEdite = () => {
  const [activeVersion, setActiveVersion] = useState(1);
  const [editingCell, setEditingCell] = useState<{
    versionId: number;
    itemId: number;
    field: string;
  } | null>(null);

  const [versions, setVersions] = useState([
    {
      id: 1,
      version: "Version 1",
      date: "2025-02-13 02:30 PM",
      user: "Ahmed Hassan",
      status: "current",
      items: [
        {
          id: 1,
          description: "Steel Rebar 16mm",
          requestedQty: 300,
          offeredQty: 300,
          unit: "kg",
          unitPrice: 26.5,
          totalPrice: 7950,
          change: null,
          mrCode: "MR-2024-001",
          masterCode: "CONST-STL-16MM-001",
          vendorCode: "VND-STL-16-A001",
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
          change: null,
          mrCode: "MR-2024-002",
          masterCode: "CONST-STL-12MM-002",
          vendorCode: "VND-STL-12-A002",
          availability: "In Stock",
          deliveryTime: "5 days",
        },
      ],
      pricing: {
        subtotal: 12050,
        tax: 1807.5,
        total: 14357.5,
      },
      notes: "Initial quote submission",
    },
    {
      id: 2,
      version: "Version 2",
      date: "2025-02-14 10:15 AM",
      user: "Ahmed Hassan",
      status: "revised",
      items: [
        {
          id: 1,
          description: "Steel Rebar 16mm",
          requestedQty: 300,
          offeredQty: 300,
          unit: "kg",
          unitPrice: 25.5,
          totalPrice: 7650,
          change: "decreased",
          mrCode: "MR-2024-001",
          masterCode: "CONST-STL-16MM-001",
          vendorCode: "VND-STL-16-A001",
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
          change: "same",
          mrCode: "MR-2024-002",
          masterCode: "CONST-STL-12MM-002",
          vendorCode: "VND-STL-12-A002",
          availability: "In Stock",
          deliveryTime: "5 days",
        },
      ],
      pricing: {
        subtotal: 12350,
        tax: 1852.5,
        total: 14702.5,
      },
      notes: "Price adjustment on 16mm rebar for competitive pricing",
    },
    {
      id: 3,
      version: "Version 3",
      date: "2025-02-15 03:45 PM",
      user: "Ahmed Hassan",
      status: "latest",
      items: [
        {
          id: 1,
          description: "Steel Rebar 16mm",
          requestedQty: 300,
          offeredQty: 300,
          unit: "kg",
          unitPrice: 24.8,
          totalPrice: 7440,
          change: "decreased",
          mrCode: "MR-2024-001",
          masterCode: "CONST-STL-16MM-001",
          vendorCode: "VND-STL-16-A001",
          availability: "In Stock",
          deliveryTime: "5 days",
        },
        {
          id: 2,
          description: "Steel Rebar 12mm",
          requestedQty: 200,
          offeredQty: 200,
          unit: "kg",
          unitPrice: 22.5,
          totalPrice: 4500,
          change: "decreased",
          mrCode: "MR-2024-002",
          masterCode: "CONST-STL-12MM-002",
          vendorCode: "VND-STL-12-A002",
          availability: "In Stock",
          deliveryTime: "5 days",
        },
      ],
      pricing: {
        subtotal: 11940,
        tax: 1791,
        total: 13731,
      },
      notes: "Final revision with best pricing to secure the deal",
    },
  ]);

  const handleCellClick = (
    versionId: number,
    itemId: number,
    field: string
  ) => {
    setEditingCell({ versionId, itemId, field });
  };

  const handleCellChange = (
    versionId: number,
    itemId: number,
    field: string,
    value: string
  ) => {
    //@ts-expect-error:prevVersions
    setVersions((prevVersions) =>
      prevVersions.map((version) => {
        if (version.id === versionId) {
          const updatedItems = version.items.map((item) => {
            if (item.id === itemId) {
              const updatedItem = { ...item };

              if (field === "offeredQty") {
                updatedItem.offeredQty = parseFloat(value) || 0;
                updatedItem.totalPrice =
                  updatedItem.offeredQty * updatedItem.unitPrice;
              } else if (field === "unitPrice") {
                updatedItem.unitPrice = parseFloat(value) || 0;
                updatedItem.totalPrice =
                  updatedItem.offeredQty * updatedItem.unitPrice;
              } else if (field === "availability") {
                updatedItem.availability = value;
              } else if (field === "deliveryTime") {
                updatedItem.deliveryTime = value;
              }

              return updatedItem;
            }
            return item;
          });

          return { ...version, items: updatedItems };
        }
        return version;
      })
    );
  };

  const handleBlur = () => {
    setEditingCell(null);
  };

  const currentVersion = versions.find((v) => v.id === activeVersion);

  const getStatusBadge = (status: string) => {
    const badges = {
      current: {
        color: "bg-blue-100 text-blue-700 border-blue-300",
        text: "Current",
      },
      revised: {
        color: "bg-yellow-100 text-yellow-700 border-yellow-300",
        text: "Revised",
      },
      latest: {
        color: "bg-green-100 text-green-700 border-green-300",
        text: "Latest",
      },
    };
    return badges[status as keyof typeof badges] || badges.current;
  };

  const getChangeColor = (change: string | null) => {
    if (change === "increased") return "text-red-600";
    if (change === "decreased") return "text-green-600";
    return "text-gray-600";
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar - Versions List */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 lg:sticky lg:top-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Version History
          </h4>
          <div className="space-y-2">
            {versions.map((version) => {
              const badge = getStatusBadge(version.status);
              const isActive = activeVersion === version.id;

              return (
                <button
                  key={version.id}
                  onClick={() => setActiveVersion(version.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-red-50 border-2 border-red-500 shadow-sm"
                      : "bg-white border border-gray-200 hover:border-red-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-semibold ${
                        isActive ? "text-red-600" : "text-gray-900"
                      }`}
                    >
                      {version.version}
                    </span>
                    {version.status === "latest" && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{version.date}</span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${badge.color}`}
                  >
                    {badge.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content - Version Details */}
      <div className="flex-1 min-w-0">
        <div className="space-y-6">
          {/* Version Header */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentVersion?.version}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{currentVersion?.user}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{currentVersion?.date}</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  getStatusBadge(currentVersion?.status || "current").color
                }`}
              >
                {getStatusBadge(currentVersion?.status || "current").text}
              </span>
            </div>
            {currentVersion?.notes && (
              <div className="bg-white bg-opacity-50 rounded-lg p-4 border border-red-200">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Notes: </span>
                  {currentVersion.notes}
                </p>
              </div>
            )}
          </div>

          {/* Items Table with Pricing */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">
                      Master Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">
                      MR Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">
                      Vendor Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">
                      Unit Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">
                      Availability
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">
                      Delivery
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {currentVersion?.items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {item.masterCode}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {item.mrCode}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {item.vendorCode}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {item.description}
                      </td>
                      <td
                        className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleCellClick(activeVersion, item.id, "offeredQty")
                        }
                      >
                        {editingCell?.versionId === activeVersion &&
                        editingCell?.itemId === item.id &&
                        editingCell?.field === "offeredQty" ? (
                          <input
                            type="number"
                            className="w-20 px-2 py-1 border border-blue-500 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={item.offeredQty}
                            onChange={(e) =>
                              handleCellChange(
                                activeVersion,
                                item.id,
                                "offeredQty",
                                e.target.value
                              )
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
                        className="px-4 py-4 whitespace-nowrap cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleCellClick(activeVersion, item.id, "unitPrice")
                        }
                      >
                        {editingCell?.versionId === activeVersion &&
                        editingCell?.itemId === item.id &&
                        editingCell?.field === "unitPrice" ? (
                          <input
                            type="number"
                            className="w-24 px-2 py-1 border border-blue-500 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={item.unitPrice}
                            onChange={(e) =>
                              handleCellChange(
                                activeVersion,
                                item.id,
                                "unitPrice",
                                e.target.value
                              )
                            }
                            onBlur={handleBlur}
                            autoFocus
                          />
                        ) : (
                          <span
                            className={`text-sm font-semibold ${getChangeColor(
                              item.change
                            )}`}
                          >
                            {item.unitPrice} SAR
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-semibold ${getChangeColor(
                            item.change
                          )}`}
                        >
                          {item.totalPrice.toLocaleString()} SAR
                        </span>
                      </td>
                      <td
                        className="px-4 py-4 whitespace-nowrap cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleCellClick(
                            activeVersion,
                            item.id,
                            "availability"
                          )
                        }
                      >
                        {editingCell?.versionId === activeVersion &&
                        editingCell?.itemId === item.id &&
                        editingCell?.field === "availability" ? (
                          <select
                            className="px-2 py-1 border border-blue-500 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={item.availability}
                            onChange={(e) =>
                              handleCellChange(
                                activeVersion,
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
                            className={`px-2 py-1 rounded text-xs font-medium ${
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
                        className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap cursor-pointer hover:bg-blue-50"
                        onClick={() =>
                          handleCellClick(
                            activeVersion,
                            item.id,
                            "deliveryTime"
                          )
                        }
                      >
                        {editingCell?.versionId === activeVersion &&
                        editingCell?.itemId === item.id &&
                        editingCell?.field === "deliveryTime" ? (
                          <select
                            className="px-2 py-1 border border-blue-500 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={item.deliveryTime}
                            onChange={(e) =>
                              handleCellChange(
                                activeVersion,
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
                            <option value="5 days">5 days</option>
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

            {/* Mobile/Tablet Cards */}
            <div className="lg:hidden p-4 space-y-4">
              {currentVersion?.items.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {item.description}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ml-2 whitespace-nowrap ${
                          item.availability === "In Stock"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.availability}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500 text-xs">
                          Master Code:
                        </span>
                        <p className="font-medium text-gray-900">
                          {item.masterCode}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">MR Code:</span>
                        <p className="font-medium text-gray-900">
                          {item.mrCode}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">
                          Vendor Code:
                        </span>
                        <p className="font-medium text-gray-900">
                          {item.vendorCode}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Quantity:</span>
                        <p className="font-medium text-gray-900">
                          {item.offeredQty} {item.unit}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">
                          Unit Price:
                        </span>
                        <p
                          className={`font-semibold ${getChangeColor(
                            item.change
                          )}`}
                        >
                          {item.unitPrice} SAR
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Total:</span>
                        <p
                          className={`font-semibold ${getChangeColor(
                            item.change
                          )}`}
                        >
                          {item.totalPrice.toLocaleString()} SAR
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-xs">Delivery:</span>
                        <p className="font-medium text-gray-900">
                          {item.deliveryTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end">
                <div className="w-full md:w-80 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">
                      {currentVersion?.pricing.subtotal.toLocaleString()} SAR
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (15%):</span>
                    <span className="font-medium text-gray-900">
                      {currentVersion?.pricing.tax.toLocaleString()} SAR
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium text-gray-900">500 SAR</span>
                  </div>
                  <div className="flex justify-between text-sm pt-3 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">
                      Total Amount:
                    </span>
                    <span className="font-bold text-lg text-green-600">
                      {currentVersion?.pricing.total.toLocaleString()} SAR
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Version Comparison Info */}
          {activeVersion > 1 && (
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    Price Changes from Version {activeVersion - 1}
                  </h4>
                  <p className="text-sm text-blue-700">
                    {(() => {
                      const prevVersion = versions.find(
                        (v) => v.id === activeVersion - 1
                      );
                      if (!prevVersion || !currentVersion) return "";

                      const diff =
                        currentVersion.pricing.total -
                        prevVersion.pricing.total;
                      const percentage = (
                        (diff / prevVersion.pricing.total) *
                        100
                      ).toFixed(2);

                      if (diff < 0) {
                        return `Total decreased by ${Math.abs(
                          diff
                        ).toLocaleString()} SAR (${Math.abs(
                          parseFloat(percentage)
                        )}% reduction)`;
                      } else if (diff > 0) {
                        return `Total increased by ${diff.toLocaleString()} SAR (${percentage}% increase)`;
                      } else {
                        return "No change in total price";
                      }
                    })()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VersionsEdite;
