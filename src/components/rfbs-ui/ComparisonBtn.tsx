
"use client";
import React, { useState } from "react";

const ComparisonBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [activeTab, setActiveTab] = useState("price");


  const deliveryTermsInfo = {
    FOB: "Free On Board - Seller delivers goods on board the ship. Buyer pays shipping, insurance, and customs.",
    CIF: "Cost, Insurance and Freight - Seller pays shipping and insurance to destination port. Buyer pays customs only.",
    EXW: "Ex Works - Buyer is responsible for all transportation costs from seller's premises.",
    DDP: "Delivered Duty Paid - Seller delivers goods to buyer's location with all costs paid including customs and duties."
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
      >
        Comparison
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-[95vw] h-[85vh] border border-gray-100 shadow-2xl flex flex-col relative">
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
                        colSpan={6}
                        className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-r border-gray-300"
                      >
                        Material Request Items
                      </th>
                      <th
                        colSpan={8}
                        className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-r border-gray-300 bg-orange-100"
                      >
                        Proposal One
                      </th>
                      <th
                        colSpan={8}
                        className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-r border-gray-300 bg-red-100"
                      >
                        Proposal Two
                      </th>
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
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-orange-50">
                        Delivery Time
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-orange-50">
                        Delivery Terms
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
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-red-50">
                        Delivery Time
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-red-50">
                        Delivery Terms
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
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50">
                        7 days
                      </td>
                      <td 
                        className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50 relative cursor-help"
                        onMouseEnter={
                          //@ts-expect-error:fob
                          () => setHoveredTerm('FOB')}
                        onMouseLeave={() => setHoveredTerm(null)}
                      >
                        FOB
                        {hoveredTerm === 'FOB' && (
                          <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                            {deliveryTermsInfo.FOB}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}
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
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-green-200">
                        7,500
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-blue-200">
                        5 days
                      </td>
                      <td 
                        className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50 relative cursor-help"
                        onMouseEnter={
                          //@ts-expect-error:cif
                          () => setHoveredTerm('CIF-1')}
                        onMouseLeave={() => setHoveredTerm(null)}
                      >
                        CIF
                        {hoveredTerm === 'CIF-1' && (
                          <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                            {deliveryTermsInfo.CIF}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </td>

                      <td className="px-3 py-3 text-sm font-semibold text-gray-900 border-b border-r border-gray-300 bg-green-200 text-center">
                        7,500
                      </td>
                      <td className="px-3 py-3 text-sm font-semibold text-gray-900 border-b border-gray-300 bg-blue-200 text-center">
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
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-green-200">
                        1,500
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-blue-200">
                        10 days
                      </td>
                      <td 
                        className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-orange-50 relative cursor-help"
                        onMouseEnter={
                          //@ts-expect-error:exw
                          () => setHoveredTerm('EXW')}
                        onMouseLeave={() => setHoveredTerm(null)}
                      >
                        EXW
                        {hoveredTerm === 'EXW' && (
                          <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                            {deliveryTermsInfo.EXW}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}
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
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        14 days
                      </td>
                      <td 
                        className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50 relative cursor-help"
                        onMouseEnter={
                          //@ts-expect-error:fob
                          () => setHoveredTerm('FOB-2')}
                        onMouseLeave={() => setHoveredTerm(null)}
                      >
                        FOB
                        {hoveredTerm === 'FOB-2' && (
                          <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                            {deliveryTermsInfo.FOB}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </td>

                      <td className="px-3 py-3 text-sm font-semibold text-gray-900 border-b border-r border-gray-300 bg-green-200 text-center">
                        1,500
                      </td>
                      <td className="px-3 py-3 text-sm font-semibold text-gray-900 border-b border-gray-300 bg-blue-200 text-center">
                        1500
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        MC-003
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        CC-003
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        PVC Pipe
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        PVC Pipe 50mm
                      </td>
                      <td className="px-3 py-3 text-sm font-semibold text-gray-900 border-b border-r border-gray-300">
                        150
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300">
                        m
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-200">
                        VND-005
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-200">
                        PVC Pipe 50mm
                      </td>
                      <td className="px-3 py-3 text-sm font-semibold text-red-700 border-b border-r border-gray-300 bg-red-200">
                        120 ⚠️
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-200">
                        m
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-200">
                        12.0
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-green-200">
                        1,440
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-blue-200">
                        3 days
                      </td>
                      <td 
                        className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-200 relative cursor-help"
                        onMouseEnter={
                          //@ts-expect-error:ddp
                          () => setHoveredTerm('DDP')}
                        onMouseLeave={() => setHoveredTerm(null)}
                      >
                        DDP
                        {hoveredTerm === 'DDP' && (
                          <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                            {deliveryTermsInfo.DDP}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        VND-006
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        PVC Pipe 50mm
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        150
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        m
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        11.5
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        1,725
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50">
                        7 days
                      </td>
                      <td 
                        className="px-3 py-3 text-sm text-gray-900 border-b border-r border-gray-300 bg-red-50 relative cursor-help"
                        onMouseEnter={
                          //@ts-expect-error:cif
                          () => setHoveredTerm('CIF-2')}
                        onMouseLeave={() => setHoveredTerm(null)}
                      >
                        CIF
                        {hoveredTerm === 'CIF-2' && (
                          <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                            {deliveryTermsInfo.CIF}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}
                      </td>

                      <td className="px-3 py-3 text-sm font-semibold text-gray-900 border-b border-r border-gray-300 bg-green-200 text-center">
                        1,440
                      </td>
                      <td className="px-3 py-3 text-sm font-semibold text-gray-900 border-b border-gray-300 bg-blue-200 text-center">
                        1,440
                      </td>
                    </tr>

                    {/* Total Row */}
                    <tr className="bg-gray-100 font-semibold">
                      <td
                        colSpan={6}
                        className="px-3 py-3 text-sm text-gray-900 border-r border-gray-300"
                      ></td>
                      <td
                        colSpan={5}
                        className="px-3 py-3 text-sm text-right text-gray-900 border-r border-gray-300 bg-orange-100"
                      >
                        Sum Total Price
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-r border-gray-300 bg-orange-100">
                        10,890
                      </td>
                      <td
                        colSpan={2}
                        className="px-3 py-3 text-sm text-gray-900 border-r border-gray-300 bg-orange-100"
                      ></td>
                      <td
                        colSpan={5}
                        className="px-3 py-3 text-sm text-right text-gray-900 border-r border-gray-300 bg-red-100"
                      >
                        Sum Total Price
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border-r border-gray-300 bg-red-100">
                        10,965
                      </td>
                      <td
                        colSpan={2}
                        className="px-3 py-3 text-sm text-gray-900 border-r border-gray-300 bg-red-100"
                      ></td>
                      <td className="px-3 py-3 text-sm font-bold text-gray-900 bg-green-200 text-center">
                        10,440
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">

  {/* Tabs */}
  <div className="flex justify-end mb-4 border-b border-gray-300">
    <button
      onClick={() => setActiveTab("price")}
      className={`px-4 py-2 text-sm font-medium ${
        activeTab === "price"
          ? "text-green-600 border-b-2 border-green-600"
          : "text-gray-600 hover:text-gray-800"
      }`}
    >
      Our Recommendation Based on Price
    </button>

    <button
      onClick={() => setActiveTab("delivery")}
      className={`px-4 py-2 text-sm font-medium ml-4 ${
        activeTab === "delivery"
          ? "text-green-600 border-b-2 border-green-600"
          : "text-gray-600 hover:text-gray-800"
      }`}
    >
      Our Recommendation Based on Delivery Time
    </button>
  </div>

  {/* Content (same for both tabs) */}
  <div className="flex flex-col justify-end mb-4 pb-4">

    <div className="flex items-center gap-2 justify-end mb-2">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <h3 className="text-base font-semibold text-gray-900">
        Our Recommendation
      </h3>
    </div>

    <p className="text-sm text-gray-600 mt-1 ml-4 text-end">
      {activeTab === "price"
        ? "Based on Price"
        : "Based on Delivery Time"}
    </p>
  </div>

  <div className="flex justify-end">
    <div className="w-full md:w-96 space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">
          Subtotal (Best Price):
        </span>
        <span className="font-medium text-gray-900">10,440 SAR</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Tax (15%):</span>
        <span className="font-medium text-gray-900">1,609 SAR</span>
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
          12,834 SAR
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