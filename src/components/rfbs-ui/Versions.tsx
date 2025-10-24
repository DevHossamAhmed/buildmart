import React, { useState } from 'react';
import { Clock, User, CheckCircle, FileText, TrendingDown } from 'lucide-react';

const Versions = () => {
  const [activeVersion, setActiveVersion] = useState(1);

  const versions = [
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
          change: null
        },
        {
          id: 2,
          description: "Steel Rebar 12mm",
          requestedQty: 200,
          offeredQty: 200,
          unit: "kg",
          unitPrice: 23.5,
          totalPrice: 4700,
          change: null
        }
      ],
      pricing: {
        subtotal: 12050,
        tax: 1807.5,
        total: 14357.5
      },
      notes: "Initial quote submission"
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
          change: "decreased"
        },
        {
          id: 2,
          description: "Steel Rebar 12mm",
          requestedQty: 200,
          offeredQty: 200,
          unit: "kg",
          unitPrice: 23.5,
          totalPrice: 4700,
          change: "same"
        }
      ],
      pricing: {
        subtotal: 12350,
        tax: 1852.5,
        total: 14702.5
      },
      notes: "Price adjustment on 16mm rebar for competitive pricing"
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
          change: "decreased"
        },
        {
          id: 2,
          description: "Steel Rebar 12mm",
          requestedQty: 200,
          offeredQty: 200,
          unit: "kg",
          unitPrice: 22.5,
          totalPrice: 4500,
          change: "decreased"
        }
      ],
      pricing: {
        subtotal: 11940,
        tax: 1791,
        total: 13731
      },
      notes: "Final revision with best pricing to secure the deal"
    }
  ];

  const currentVersion = versions.find(v => v.id === activeVersion);
//@ts-expect-error:status
  const getStatusBadge = (status) => {
    const badges = {
      current: { color: "bg-blue-100 text-blue-700 border-blue-300", text: "Current" },
      revised: { color: "bg-yellow-100 text-yellow-700 border-yellow-300", text: "Revised" },
      latest: { color: "bg-green-100 text-green-700 border-green-300", text: "Latest" }
    };
    //@ts-expect-error:status
    return badges[status] || badges.current;
  };

//@ts-expect-error:change
  const getChangeColor = (change) => {
    if (change === "increased") return "text-red-600";
    if (change === "decreased") return "text-green-600";
    return "text-gray-600";
  };

  return (
    <div className="flex gap-6">
      {/* Sidebar - Versions List */}
      <div className="w-64 flex-shrink-0">
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 sticky top-6">
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
                      ? 'bg-red-50 border-2 border-red-500 shadow-sm'
                      : 'bg-white border border-gray-200 hover:border-red-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-semibold ${isActive ? 'text-red-600' : 'text-gray-900'}`}>
                      {version.version}
                    </span>
                    {version.status === 'latest' && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{version.date}</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${badge.color}`}>
                    {badge.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content - Version Details */}
      <div className="flex-1">
        <div className="space-y-6">
          {/* Version Header */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {
                  //@ts-expect-error:currentVersion
                  currentVersion.version}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{
                    //@ts-expect-error:currentVersion
                    currentVersion.user}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{
                    //@ts-expect-error:currentVersion
                    currentVersion.date}</span>
                  </div>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusBadge(
                //@ts-expect-error:currentVersion
                currentVersion.status).color}`}>
                {getStatusBadge(
                    //@ts-expect-error:currentVersion
                    currentVersion.status).text}
              </span>
            </div>
            {
            //@ts-expect-error:currentVersion
            currentVersion.notes && (
              <div className="bg-white bg-opacity-50 rounded-lg p-4 border border-red-200">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Notes: </span>
                  {
                  //@ts-expect-error:currentVersion
                  currentVersion.notes}
                </p>
              </div>
            )}
          </div>

          {/* Items Table with Pricing */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
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
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase text-end">
                      Delivery
                    </th>
                    
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 ">
                  {
                  //@ts-expect-error:currentVersion
                  currentVersion.items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {item.description}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {item.offeredQty} {item.unit}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm font-semibold ${getChangeColor(item.change)}`}>
                          {item.unitPrice} SAR
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm font-semibold ${getChangeColor(item.change)}`}>
                          {item.totalPrice.toLocaleString()} SAR
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                          In Stock
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        5 days
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pricing Breakdown */}
            <div className="mt-6 pt-6 border-t border-gray-200 mr-[15px]">
              <div className="flex justify-end">
                <div className="w-80 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">
                      {
                      //@ts-expect-error:currentVersion
                      currentVersion.pricing.subtotal.toLocaleString()} SAR
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (15%):</span>
                    <span className="font-medium text-gray-900">
                      {
                      //@ts-expect-error:currentVersion
                      currentVersion.pricing.tax.toLocaleString()} SAR
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium text-gray-900">
                      500 SAR
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-3 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">
                      Total Amount:
                    </span>
                    <span className="font-bold text-lg text-green-600">
                      {
                      //@ts-expect-error:currentVersion
                      currentVersion.pricing.total.toLocaleString()} SAR
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
                      const prevVersion = versions.find(v => v.id === activeVersion - 1);
                      //@ts-expect-error:diff
                      const diff = currentVersion.pricing.total - prevVersion.pricing.total;
                      //@ts-expect-error:percentage
                      const percentage = ((diff / prevVersion.pricing.total) * 100).toFixed(2);
                      
                      if (diff < 0) {
                        return `Total decreased by ${Math.abs(diff).toLocaleString()} SAR (${Math.abs(parseFloat(percentage))}% reduction)`;
                      } else if (diff > 0) {
                        return `Total increased by ${diff.toLocaleString()} SAR (${percentage}% increase)`;
                      } else {
                        return 'No change in total price';
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

export default Versions;