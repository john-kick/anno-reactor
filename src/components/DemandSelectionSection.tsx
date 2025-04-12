import React from "react";
import { demandData } from "../data/Demand"; // Import demand data

interface DemandSelectionSectionProps {
  demandSelection: { [key: string]: { [product: string]: boolean } };
  onChange: (type: string, product: string, checked: boolean) => void;
}

const DemandSelectionSection: React.FC<DemandSelectionSectionProps> = ({
  demandSelection,
  onChange
}) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-[#a68b5b]">
      <h2 className="text-2xl font-semibold mb-4 text-[#6b4f4f]">
        Demand Selection
      </h2>
      {Object.keys(demandData).map((type) => (
        <div key={type} className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-[#3e3e3e]">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </h3>
          <div className="flex flex-wrap gap-8">
            {/* Basic Needs */}
            <div className="flex-1">
              <h4 className="text-md font-medium mb-2 text-[#6b4f4f] capitalize">
                Basic Needs
              </h4>
              {demandData[type].basic.map((demand) => (
                <label key={demand.product} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={demandSelection[type]?.[demand.product] || false}
                    onChange={(e) =>
                      onChange(type, demand.product, e.target.checked)
                    }
                    className="mr-2 accent-[#6b4f4f]"
                  />
                  <span className="text-[#3e3e3e]">
                    {demand.product.replace(/_/g, " ")}
                  </span>
                </label>
              ))}
            </div>

            {/* Luxury Needs */}
            <div className="flex-1">
              <h4 className="text-md font-medium mb-2 text-[#6b4f4f] capitalize">
                Luxury Needs
              </h4>
              {demandData[type].luxury.map((demand) => (
                <label key={demand.product} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={demandSelection[type]?.[demand.product] || false}
                    onChange={(e) =>
                      onChange(type, demand.product, e.target.checked)
                    }
                    className="mr-2 accent-[#6b4f4f]"
                  />
                  <span className="text-[#3e3e3e]">
                    {demand.product.replace(/_/g, " ")}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default DemandSelectionSection;
