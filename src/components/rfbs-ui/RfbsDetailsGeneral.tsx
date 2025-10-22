"use client";


const RfbsDetailsGeneral = () => {


  // BOQ Items data
const boqItems = [
  { id: 1, category: "Construction", description: "Steel Rebar 16mm", quantity: 300, unit: "kg", unitPrice: 25.5, totalPrice: 7650 },
  { id: 2, category: "Electrical", description: "Copper Cable 10mm²", quantity: 120, unit: "m", unitPrice: 15.0, totalPrice: 1800 },
  { id: 3, category: "Plumbing", description: "PVC Pipe 2-inch", quantity: 90, unit: "pcs", unitPrice: 12.5, totalPrice: 1125 },
  { id: 4, category: "Finishing", description: "Ceramic Floor Tiles 60x60cm", quantity: 250, unit: "m²", unitPrice: 35.0, totalPrice: 8750 },
  { id: 5, category: "HVAC", description: "Split AC Unit 2 Ton", quantity: 5, unit: "unit", unitPrice: 2800, totalPrice: 14000 },
  { id: 6, category: "Safety", description: "Fire Extinguisher 6kg CO₂", quantity: 20, unit: "pcs", unitPrice: 350, totalPrice: 7000 },
];


  const highlightedRows = [1, 3, 6];

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Quantity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {boqItems.map((item) => {
                const isHighlighted = highlightedRows.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    className={`${
                      isHighlighted ? "bg-yellow-100 hover:bg-yellow-200" : "hover:bg-gray-50"
                    } transition-colors`}
                  >
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.description}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {item.quantity} {item.unit}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RfbsDetailsGeneral;
