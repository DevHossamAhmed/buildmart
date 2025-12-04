"use client";
import React, { useState } from "react";

const ComparisonBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
      >
        Comparison
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center  z-50 p-4 ">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-[95vw] h-[70vh] border border-gray-100 shadow-2xl flex flex-col relative">
            <div className="p-6 border-b border-gray-200 flex-shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                Comparison Table
              </h2>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr className="bg-blue-50">
                      <th
                      //@ts-expect-error:ColSpan
                        colSpan="6"
                        className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-r border-gray-300"
                      >
                        Material Request Items
                      </th>
                      <th
                      //@ts-expect-error:ColSpan
                        colSpan="6"
                        className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-r border-gray-300 bg-orange-100"
                      >
                        Proposal One
                      </th>
                      <th
                      //@ts-expect-error:ColSpan
                        colSpan="6"
                        className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-r border-gray-300 bg-red-100"
                      >
                        Proposal Two
                      </th>
                      <th
                      //@ts-expect-error:ColSpan
                        rowSpan="2"
                        className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-gray-300 bg-yellow-100"
                      >
                        Best Price
                      </th>
                    </tr>
                    <tr className="bg-gray-50">
                      {/* Material Request Items Headers */}
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap">
                        Master Code
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap">
                        Company Code
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
                        Unit
                      </th>

                      {/* Proposal One Headers */}
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-orange-50">
                        Code
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-orange-50">
                        Description
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-orange-50">
                        Qty
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-orange-50">
                        Unit
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-orange-50">
                        Unit Price
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-orange-50">
                        Total Price
                      </th>

                      {/* Proposal Two Headers */}
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-red-50">
                        Code
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-red-50">
                        Description
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-red-50">
                        Qty
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-red-50">
                        Unit
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-red-50">
                        Unit Price
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-red-50">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        MC-001
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        CC-001
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        Steel Rebar
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        Steel Rebar 16mm
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        300
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        kg
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50">
                        VND-001
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50">
                        Steel Rebar 16mm
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50">
                        300
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50">
                        kg
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50">
                        26.5
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50">
                        7,950
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        VND-002
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        Steel Rebar 16mm
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        300
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        kg
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        25.0
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        7,500
                      </td>

                      <td className="px-3 py-3 text-sm font-semibold text-green-700 border-b border-gray-300 bg-yellow-50 text-center">
                        7,500
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        MC-002
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        CC-002
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        Copper Cable
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        Copper Cable 10mm²
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        120
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        m
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50">
                        VND-003
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50">
                        Copper Cable 10mm²
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50">
                        120
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50">
                        m
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50">
                        15.0
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50">
                        1,800
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        VND-004
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        Copper Cable 10mm²
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        120
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        m
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        14.5
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        1,740
                      </td>

                      <td className="px-3 py-3 text-sm font-semibold text-green-700 border-b border-gray-300 bg-yellow-50 text-center">
                        1,740
                      </td>
                    </tr>

                    {/* Total Row */}
                    <tr className="bg-gray-100 font-semibold">
                      <td
                      //@ts-expect-error:ColSpan
                        colSpan="6"
                        className="px-3 py-3 text-sm text-gray-900 border-r border-gray-300"
                      ></td>
                      <td
                      //@ts-expect-error:ColSpan
                        colSpan="5"
                        className="px-3 py-3 text-sm text-right text-gray-900 border-r border-gray-300 bg-orange-100"
                      >
                        Sum Total Price:
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-r border-gray-300 bg-orange-100">
                        9,750
                      </td>
                      <td
                      //@ts-expect-error:ColSpan
                        colSpan="5"
                        className="px-3 py-3 text-sm text-right text-gray-900 border-r border-gray-300 bg-red-100"
                      >
                        Sum Total Price:
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-r border-gray-300 bg-red-100">
                        9,240
                      </td>
                      <td className="px-3 py-3 text-sm font-bold text-green-700 bg-yellow-100 text-center">
                        9,240
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
                    <span className="text-gray-600">Subtotal (Best Price):</span>
                    <span className="font-medium text-gray-900">9,240 SAR</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (15%):</span>
                    <span className="font-medium text-gray-900">1,386 SAR</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium text-gray-900">500 SAR</span>
                  </div>
                  <div className="flex justify-between text-sm pt-3 border-t border-gray-300">
                    <span className="font-semibold text-gray-900">
                      Total Amount:
                    </span>
                    <span className="font-bold text-lg text-green-600">
                      11,126 SAR
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