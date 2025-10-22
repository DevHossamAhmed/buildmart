import React from "react";

interface Item {
  id: number;
  description: string;
  offeredQty: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  availability: string;
  deliveryTime: string;
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

const RfbsDetailsProposil: React.FC<RfbsDetailsProposilProps> = ({
  items,
  pricing,
}) => {
  return (
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Delivery
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">
                  {item.description}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {item.offeredQty} {item.unit}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  ${item.unitPrice}
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                  ${item.totalPrice.toLocaleString()}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.availability === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.availability}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {item.deliveryTime}
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
                ${pricing.subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (15%):</span>
              <span className="font-medium text-gray-900">
                ${pricing.tax.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-medium text-gray-900">
                ${pricing.shipping.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm pt-3 border-t border-gray-200">
              <span className="font-semibold text-gray-900">
                Total Amount:
              </span>
              <span className="font-bold text-lg text-green-600">
                ${pricing.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RfbsDetailsProposil;
