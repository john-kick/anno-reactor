import React from "react";
import { Productions } from "../data/Production"; // Import all productions

interface ElectricitySectionProps {
  electricityUsage: { [key: string]: boolean };
  onChange: (production: string, checked: boolean) => void;
}

const ElectricitySection: React.FC<ElectricitySectionProps> = ({
  electricityUsage,
  onChange
}) => {
  // Filter productions to include only those improved by electricity
  const electricityEnabledProductions = Productions.filter(
    (production) => production.improvedByElectricity
  ).sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-[#a68b5b]">
      <h2 className="text-2xl font-semibold mb-4 text-[#6b4f4f]">
        Electricity
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {electricityEnabledProductions.map((production) => (
          <label
            key={production.name}
            className="flex items-center bg-[#f4f1e1] p-4 rounded-lg shadow-sm border border-[#a68b5b]"
          >
            <input
              type="checkbox"
              checked={electricityUsage[production.name] || false}
              onChange={(e) => onChange(production.name, e.target.checked)}
              className="mr-2 accent-[#6b4f4f]"
            />
            <span className="text-[#3e3e3e]">
              {production.name.replace(/_/g, " ")}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default ElectricitySection;
