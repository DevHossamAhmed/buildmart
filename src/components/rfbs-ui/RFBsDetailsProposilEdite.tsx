import React, { useState } from "react";

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

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Table */}
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
                <td className="px-4 py-4 text-[10px] font-medium text-gray-900">
                  {item.vendorCode}
                </td>
                <td className="px-4 py-4 text-[10px] font-medium text-gray-900">
                  {item.description}
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
    </div>
  );
};

export default RfbsDetailsProposilEdite;