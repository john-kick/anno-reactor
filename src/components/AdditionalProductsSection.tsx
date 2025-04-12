import React from "react";
import { products } from "../data/Production"; // Import the list of all products

interface AdditionalProductsSectionProps {
  additionalProducts: { [key: string]: number };
  onChange: (product: string, value: number) => void;
}

const AdditionalProductsSection: React.FC<AdditionalProductsSectionProps> = ({
  additionalProducts,
  onChange
}) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-[#a68b5b]">
      <h2 className="text-2xl font-semibold mb-4 text-[#6b4f4f]">
        Additional Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product} className="mb-4">
            <label className="block text-lg font-medium mb-1 text-[#3e3e3e]">
              {product.replace(/_/g, " ")}
            </label>
            <input
              type="number"
              value={additionalProducts[product] || 0}
              onChange={(e) => onChange(product, parseInt(e.target.value) || 0)}
              className="w-full border border-[#a68b5b] rounded-lg p-2 bg-[#f4f1e1] text-[#3e3e3e]"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdditionalProductsSection;
