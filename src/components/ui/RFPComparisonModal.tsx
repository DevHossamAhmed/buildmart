"use client";

import React from "react";
import { X } from "lucide-react";
import { RFP } from "./RFPsTab";

interface RFPComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRFPs: string[];
  rfps: RFP[];
}

const RFPComparisonModal: React.FC<RFPComparisonModalProps> = ({
  isOpen,
  onClose,
  selectedRFPs,
  rfps,
}) => {
  if (!isOpen || selectedRFPs.length < 2) return null;

  const selectedRfpData = selectedRFPs
    .slice(0, 2)
    .map((id) => rfps.find((r) => r.id === id))
    .filter(Boolean) as RFP[];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[99vw] h-[85vh] border border-gray-100 shadow-2xl flex flex-col relative">
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">RFP Comparison</h2>
          <p className="text-sm text-gray-600 mt-1">
            Comparing {selectedRFPs.length} proposals
          </p>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-blue-50">
                  <th
                    colSpan={6}
                    className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-r border-gray-300"
                  >
                    Material Request Items
                  </th>
                  {selectedRfpData.map((rfp, idx) => {
                    const colors = ["bg-orange-100", "bg-red-100"];
                    return (
                      <th
                        key={rfp.id}
                        colSpan={8}
                        className={`px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-r border-gray-300 ${colors[idx]}`}
                      >
                        {rfp.supplier}
                      </th>
                    );
                  })}
                  <th
                    rowSpan={2}
                    className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-r border-gray-300 bg-green-200"
                  >
                    Best Price
                  </th>
                  <th
                    rowSpan={2}
                    className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-gray-300 bg-blue-200"
                  >
                    Best Delivery Time
                  </th>
                </tr>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap">
                    Master Code
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap">
                    Item
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap">
                    Description
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap">
                    Qty
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap">
                    U
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap">
                    Required
                  </th>

                  {selectedRfpData.map((rfp, idx) => {
                    const colors = ["bg-orange-50", "bg-red-50"];
                    return (
                      <React.Fragment key={rfp.id}>
                        <th
                          className={`px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap ${colors[idx]}`}
                        >
                          Code
                        </th>
                        <th
                          className={`px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap ${colors[idx]}`}
                        >
                          Description
                        </th>
                        <th
                          className={`px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap ${colors[idx]}`}
                        >
                          Qty
                        </th>
                        <th
                          className={`px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap ${colors[idx]}`}
                        >
                          U
                        </th>
                        <th
                          className={`px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap ${colors[idx]}`}
                        >
                          U.P
                        </th>
                        <th
                          className={`px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap ${colors[idx]}`}
                        >
                          T.P
                        </th>
                        <th
                          className={`px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap ${colors[idx]}`}
                        >
                          Delivery Time
                        </th>
                        <th
                          className={`px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap ${colors[idx]}`}
                        >
                          Delivery Terms
                        </th>
                      </React.Fragment>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {selectedRfpData[0]?.items && selectedRfpData[0].items.length > 0 ? (
                  selectedRfpData[0].items.map((item, itemIdx) => (
                    <tr key={itemIdx} className="hover:bg-gray-50">
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        MC-{String(itemIdx + 1).padStart(3, "0")}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        {item.description.split(" ")[0]}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        {item.description}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        {item.quantity}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        {item.unit}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        Required
                      </td>

                      {selectedRfpData.map((rfp, rfpIdx) => {
                        const rfpItem = rfp.items?.[itemIdx];
                        const colors = ["bg-orange-50", "bg-red-50"];
                        const prices = selectedRfpData.map(
                          (r) => r.items?.[itemIdx]?.totalPrice || Infinity
                        );
                        const isBestPrice = rfpItem?.totalPrice === Math.min(...prices);

                        return (
                          <React.Fragment key={rfp.id}>
                            <td
                              className={`px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 ${colors[rfpIdx]}`}
                            >
                              {rfpItem?.id || "N/A"}
                            </td>
                            <td
                              className={`px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 ${colors[rfpIdx]}`}
                            >
                              {rfpItem?.description || "N/A"}
                            </td>
                            <td
                              className={`px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 ${colors[rfpIdx]}`}
                            >
                              {rfpItem?.quantity || "N/A"}
                            </td>
                            <td
                              className={`px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 ${colors[rfpIdx]}`}
                            >
                              {rfpItem?.unit || "N/A"}
                            </td>
                            <td
                              className={`px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 ${colors[rfpIdx]}`}
                            >
                              {rfpItem?.unitPrice?.toLocaleString() || "N/A"}
                            </td>
                            <td
                              className={`px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 ${
                                isBestPrice ? "bg-green-200" : colors[rfpIdx]
                              }`}
                            >
                              {rfpItem?.totalPrice?.toLocaleString() || "N/A"}
                            </td>
                            <td
                              className={`px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 ${colors[rfpIdx]}`}
                            >
                              {rfp.responseTime || "N/A"}
                            </td>
                            <td
                              className={`px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 ${colors[rfpIdx]}`}
                            >
                              FOB
                            </td>
                          </React.Fragment>
                        );
                      })}

                      <td className="px-3 py-3 text-sm font-semibold text-gray-900 border-b border-r border-gray-300 bg-green-200 text-center">
                        {Math.min(
                          ...selectedRfpData.map(
                            (r) => r.items?.[itemIdx]?.totalPrice || Infinity
                          )
                        ).toLocaleString()}
                      </td>
                      <td className="px-3 py-3 text-sm font-semibold text-gray-900 border-b border-gray-300 bg-blue-200 text-center">
                        {selectedRfpData
                          .map((r) => r.responseTime || "N/A")
                          .join(" / ")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={22}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No comparison data available. Please ensure RFPs have items.
                    </td>
                  </tr>
                )}

                {/* Total Row */}
                <tr className="bg-gray-100 font-semibold">
                  <td
                    colSpan={6}
                    className="px-3 py-3 text-sm text-gray-900 border-r border-gray-300"
                  >
                    Sum Total Price
                  </td>
                  {selectedRfpData.map((rfp, idx) => {
                    const colors = ["bg-orange-100", "bg-red-100"];
                    return (
                      <React.Fragment key={rfp.id}>
                        <td
                          colSpan={7}
                          className={`px-3 py-3 text-sm text-right text-gray-900 border-r border-gray-300 ${colors[idx]}`}
                        >
                          Subtotal
                        </td>
                        <td
                          className={`px-3 py-3 text-sm text-gray-900 border-r border-gray-300 ${colors[idx]}`}
                        >
                          {rfp.totalAmount.toLocaleString()} SAR
                        </td>
                      </React.Fragment>
                    );
                  })}
                  <td className="px-3 py-3 text-sm font-bold text-gray-900 bg-green-200 text-center">
                    {Math.min(...selectedRfpData.map((r) => r.totalAmount)).toLocaleString()}{" "}
                    SAR
                  </td>
                  <td className="px-3 py-3 text-sm font-bold text-gray-900 bg-blue-200 text-center">
                    -
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex justify-end">
            <div className="w-full md:w-96 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal (Price):</span>
                <span className="font-medium text-gray-900">
                  {Math.min(...selectedRfpData.map((r) => r.totalAmount)).toLocaleString()}{" "}
                  SAR
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (15%):</span>
                <span className="font-medium text-gray-900">
                  {(
                    Math.min(...selectedRfpData.map((r) => r.totalAmount)) * 0.15
                  ).toLocaleString()}{" "}
                  SAR
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium text-gray-900">500 SAR</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-gray-300">
                <span className="font-semibold text-gray-900">Total Amount:</span>
                <span className="font-bold text-lg text-green-600">
                  {(
                    Math.min(...selectedRfpData.map((r) => r.totalAmount)) * 1.15 + 500
                  ).toLocaleString()}{" "}
                  SAR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFPComparisonModal;

