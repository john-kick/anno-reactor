import React, { useState } from "react";
import "./App.css";
import {
  calculateDemand,
  calculateNeededProductions,
  calculateNeededWorker,
  ProductAmounts,
  ProductionAmountList,
  Residents
} from "./Calculator";
import AdditionalProductsSection from "./components/AdditionalProductsSection";
import DemandSelectionSection from "./components/DemandSelectionSection";
import ElectricitySection from "./components/ElectricitySection";
import ResidentsSection from "./components/ResidentsSection";
import { Demand, demandData } from "./data/Demand";
import { Productions, products } from "./data/Production";

function App() {
  const [residents, setResidents] = useState<Partial<Residents>>({
    Farmer: 0,
    Worker: 0,
    Artisan: 0,
    Engineer: 0,
    Investor: 0
  });

  const [demandSelection, setDemandSelection] = useState(() => {
    const initialState: { [key: string]: { [product: string]: boolean } } = {};
    Object.keys(demandData).forEach((resident) => {
      initialState[resident] = {};

      ["basic", "luxury"].forEach((category) => {
        demandData[resident][category].forEach((product: Demand) => {
          initialState[resident][product.product] = false;
        });
      });
    });
    return initialState;
  });

  const [electricityUsage, setElectricityUsage] = useState(() => {
    const initialState: { [key: string]: boolean } = {};
    Productions.forEach((production) => {
      initialState[production.name] = false;
    });
    return initialState;
  });

  const [additionalProducts, setAdditionalProducts] = useState<{
    [key: string]: number;
  }>(() => {
    const initialState: { [key: string]: number } = {};
    products.forEach((product) => {
      initialState[product] = 0;
    });
    return initialState;
  });

  const [calculationResult, setCalculationResult] = useState<{
    demand: ProductAmounts;
    productions: ProductionAmountList;
    workers: Partial<Record<string, number>>;
  } | null>(null);

  const handleResidentChange = (type: string, value: number) => {
    setResidents({ ...residents, [type]: value });
  };

  const handleDemandChange = (
    type: string,
    product: string,
    checked: boolean
  ) => {
    setDemandSelection({
      ...demandSelection,
      [type]: { ...demandSelection[type], [product]: checked }
    });
  };

  const handleElectricityChange = (production: string, checked: boolean) => {
    setElectricityUsage({ ...electricityUsage, [production]: checked });
  };

  const handleAdditionalProductChange = (product: string, value: number) => {
    setAdditionalProducts({ ...additionalProducts, [product]: value });
  };

  const handleCalculate = () => {
    // Prepare residents demand
    const residentsDemand = {};
    Object.entries(demandSelection).forEach(([residentType, products]) => {
      Object.entries(products).forEach(([product, selected]) => {
        if (selected) {
          residentsDemand[residentType] = {
            ...residentsDemand[residentType],
            [product]: true
          };
        }
      });
    });

    // Calculate demand
    const demand = calculateDemand(residents, residentsDemand);
    // Add additional products to demand
    Object.entries(additionalProducts).forEach(([product, amount]) => {
      if (amount > 0) {
        demand[product] = (demand[product] || 0) + amount;
      }
    });

    // Calculate needed productions
    const productions = calculateNeededProductions(demand);

    // Calculate needed workers
    const workers = calculateNeededWorker(productions);

    // Set the result
    setCalculationResult({ demand, productions, workers });
  };

  return (
    <div className="bg-[#f4f1e1] text-[#3e3e3e] min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#6b4f4f]">
        Anno 1800 Demand Calculator
      </h1>
      <div className="space-y-8">
        <ResidentsSection
          residents={residents}
          onChange={handleResidentChange}
        />
        <DemandSelectionSection
          demandSelection={demandSelection}
          onChange={handleDemandChange}
        />
        <ElectricitySection
          electricityUsage={electricityUsage}
          onChange={handleElectricityChange}
        />
        <AdditionalProductsSection
          additionalProducts={additionalProducts}
          onChange={handleAdditionalProductChange}
        />
        <button
          onClick={handleCalculate}
          className="bg-[#6b4f4f] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#5a3e3e]"
        >
          Calculate
        </button>
      </div>

      {calculationResult && (
        <div className="mt-8 space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md border border-[#a68b5b]">
            <h2 className="text-2xl font-semibold mb-4 text-[#6b4f4f]">
              Demand
            </h2>
            <table className="w-full border-collapse border border-[#a68b5b]">
              <thead>
                <tr>
                  <th className="border border-[#a68b5b] px-4 py-2">Product</th>
                  <th className="border border-[#a68b5b] px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(calculationResult.demand).map(
                  ([product, amount]) => (
                    <tr key={product}>
                      <td className="border border-[#a68b5b] px-4 py-2">
                        {product.replace(/_/g, " ")}
                      </td>
                      <td className="border border-[#a68b5b] px-4 py-2">
                        {amount}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md border border-[#a68b5b]">
            <h2 className="text-2xl font-semibold mb-4 text-[#6b4f4f]">
              Productions
            </h2>
            <table className="w-full border-collapse border border-[#a68b5b]">
              <thead>
                <tr>
                  <th className="border border-[#a68b5b] px-4 py-2">
                    Production
                  </th>
                  <th className="border border-[#a68b5b] px-4 py-2">Amount</th>
                  <th className="border border-[#a68b5b] px-4 py-2">
                    With Electricity
                  </th>
                </tr>
              </thead>
              <tbody>
                {calculationResult.productions.map((prod) => (
                  <tr key={prod.production.name}>
                    <td className="border border-[#a68b5b] px-4 py-2">
                      {prod.production.name}
                    </td>
                    <td className="border border-[#a68b5b] px-4 py-2">
                      {prod.amount.toFixed(2)}
                    </td>
                    <td className="border border-[#a68b5b] px-4 py-2">
                      {prod.withElectricity ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md border border-[#a68b5b]">
            <h2 className="text-2xl font-semibold mb-4 text-[#6b4f4f]">
              Workers
            </h2>
            <table className="w-full border-collapse border border-[#a68b5b]">
              <thead>
                <tr>
                  <th className="border border-[#a68b5b] px-4 py-2">
                    Worker Type
                  </th>
                  <th className="border border-[#a68b5b] px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(calculationResult.workers).map(
                  ([workerType, amount]) => (
                    <tr key={workerType}>
                      <td className="border border-[#a68b5b] px-4 py-2">
                        {workerType}
                      </td>
                      <td className="border border-[#a68b5b] px-4 py-2">
                        {amount}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
