"use client";
import React, { useState } from "react";

const ComparisonBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-white cursor-pointer rounded-lg hover:opacity-90 text-sm font-medium"
        style={{ backgroundColor: "#d92335" }}
      >
        Comparison
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/5 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Comparison Table
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      RFPs-001
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      RFPs-002
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      RFPs-003
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Lowest price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-600">
                      item01
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">$11,500</td>
                    <td className="px-4 py-4 text-sm text-gray-600">$12,500</td>
                    <td className="px-4 py-4 text-sm text-gray-600">$11,800</td>
                    <td className="px-4 py-4 text-sm text-gray-600">$11,500</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-600">
                      item02
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">$1,200</td>
                    <td className="px-4 py-4 text-sm text-gray-600">$1,300</td>
                    <td className="px-4 py-4 text-sm text-gray-600">$1,150</td>
                    <td className="px-4 py-4 text-sm text-gray-600">$1,150</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-end">
                <div className="w-80 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">$12,050</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (15%):</span>
                    <span className="font-medium text-gray-900">$1,807.5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium text-gray-900">$500</span>
                  </div>
                  <div className="flex justify-between text-sm pt-3 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">
                      Total Amount:
                    </span>
                    <span className="font-bold text-lg text-green-600">
                      $14,357.5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComparisonBtn;
