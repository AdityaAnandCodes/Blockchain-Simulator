import React, { useState } from "react";
import { BlockSimulation } from "./BlockSimulation";
import { MiningSimulation } from "./MiningSimulation";
import { ConsensusSimulation } from "./ConsensusSimulation";

const BlockchainSimulator = () => {
  const [activeTab, setActiveTab] = useState("blocks");

  const tabs = [
    { id: "blocks", name: "Block Chain", component: BlockSimulation },
    { id: "mining", name: "Mining", component: MiningSimulation },
    { id: "consensus", name: "Consensus", component: ConsensusSimulation },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Blockchain Simulator
          </h1>
          <p className="text-gray-300">
            Interactive demonstrations of blockchain fundamentals
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default BlockchainSimulator;
