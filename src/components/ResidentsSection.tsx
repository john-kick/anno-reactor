import React from "react";

interface ResidentsSectionProps {
  residents: { [key: string]: number };
  onChange: (type: string, value: number) => void;
}

const ResidentsSection: React.FC<ResidentsSectionProps> = ({
  residents,
  onChange
}) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-[#a68b5b]">
      <h2 className="text-2xl font-semibold mb-4 text-[#6b4f4f]">Residents</h2>
      {Object.keys(residents).map((type) => (
        <div key={type} className="mb-4">
          <label className="block text-lg font-medium mb-1 text-[#3e3e3e]">
            {type.charAt(0).toUpperCase() + type.slice(1)}:
          </label>
          <input
            type="number"
            value={residents[type]}
            onChange={(e) => onChange(type, parseInt(e.target.value) || 0)}
            className="w-full border border-[#a68b5b] rounded-lg p-2 bg-[#f4f1e1] text-[#3e3e3e]"
          />
        </div>
      ))}
    </section>
  );
};

export default ResidentsSection;
