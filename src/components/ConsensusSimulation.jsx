import React, { useState, useEffect } from "react";
import { Hash, Cpu, Users, Play, RotateCcw, Zap } from "lucide-react";

export const ConsensusSimulation = () => {
  const [selectedMechanism, setSelectedMechanism] = useState("pow");
  const [simulationResult, setSimulationResult] = useState(null);
  const [validators, setValidators] = useState({
    miners: [],
    stakers: [],
    delegates: [],
  });

  useEffect(() => {
    generateValidators();
  }, []);

  const generateValidators = () => {
    const miners = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `Miner ${i + 1}`,
      power: Math.floor(Math.random() * 1000) + 100,
    }));

    const stakers = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `Staker ${i + 1}`,
      stake: Math.floor(Math.random() * 5000) + 500,
    }));

    const delegates = Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      name: `Delegate ${i + 1}`,
      votes: Math.floor(Math.random() * 10000) + 1000,
    }));

    setValidators({ miners, stakers, delegates });
  };

  const runConsensus = () => {
    let result = {};

    switch (selectedMechanism) {
      case "pow":
        const selectedMiner = validators.miners.reduce((prev, current) =>
          prev.power > current.power ? prev : current
        );
        result = {
          mechanism: "Proof of Work (PoW)",
          selected: selectedMiner,
          reason: `Selected based on highest computational power: ${selectedMiner.power}`,
          explanation:
            "In PoW, the miner with the most computational power (hash rate) has the highest chance of mining the next block.",
        };
        break;

      case "pos":
        const selectedStaker = validators.stakers.reduce((prev, current) =>
          prev.stake > current.stake ? prev : current
        );
        result = {
          mechanism: "Proof of Stake (PoS)",
          selected: selectedStaker,
          reason: `Selected based on highest stake: ${selectedStaker.stake} tokens`,
          explanation:
            "In PoS, validators are chosen based on their stake in the network. Higher stake = higher chance of validation.",
        };
        break;

      case "dpos":
        const selectedDelegate = validators.delegates.reduce((prev, current) =>
          prev.votes > current.votes ? prev : current
        );
        result = {
          mechanism: "Delegated Proof of Stake (DPoS)",
          selected: selectedDelegate,
          reason: `Selected based on most votes: ${selectedDelegate.votes} votes`,
          explanation:
            "In DPoS, token holders vote for delegates who validate transactions on their behalf.",
        };
        break;
    }

    setSimulationResult(result);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Users className="text-purple-400" />
        Consensus Mechanism Simulation
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-3">
              Select Consensus Mechanism
            </label>
            <div className="space-y-2">
              {[
                {
                  id: "pow",
                  name: "Proof of Work (PoW)",
                  desc: "Computational power based",
                },
                {
                  id: "pos",
                  name: "Proof of Stake (PoS)",
                  desc: "Stake amount based",
                },
                {
                  id: "dpos",
                  name: "Delegated PoS (DPoS)",
                  desc: "Voting based",
                },
              ].map((mechanism) => (
                <label
                  key={mechanism.id}
                  className="flex items-center space-x-3 p-3 border border-gray-600 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                >
                  <input
                    type="radio"
                    name="consensus"
                    value={mechanism.id}
                    checked={selectedMechanism === mechanism.id}
                    onChange={(e) => setSelectedMechanism(e.target.value)}
                    className="text-purple-500 bg-gray-700 border-gray-600 focus:ring-purple-500"
                  />
                  <div>
                    <div className="font-medium text-white">{mechanism.name}</div>
                    <div className="text-sm text-gray-400">
                      {mechanism.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={runConsensus}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 font-medium transition-colors"
          >
            Run Consensus Simulation
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-3 text-white">Current Validators</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {selectedMechanism === "pow" &&
                validators.miners.map((miner) => (
                  <div
                    key={miner.id}
                    className="flex justify-between items-center p-2 bg-gray-700 rounded"
                  >
                    <span className="text-gray-200">{miner.name}</span>
                    <span className="font-medium text-yellow-400">
                      Power: {miner.power}
                    </span>
                  </div>
                ))}
              {selectedMechanism === "pos" &&
                validators.stakers.map((staker) => (
                  <div
                    key={staker.id}
                    className="flex justify-between items-center p-2 bg-gray-700 rounded"
                  >
                    <span className="text-gray-200">{staker.name}</span>
                    <span className="font-medium text-green-400">
                      Stake: {staker.stake}
                    </span>
                  </div>
                ))}
              {selectedMechanism === "dpos" &&
                validators.delegates.map((delegate) => (
                  <div
                    key={delegate.id}
                    className="flex justify-between items-center p-2 bg-gray-700 rounded"
                  >
                    <span className="text-gray-200">{delegate.name}</span>
                    <span className="font-medium text-blue-400">
                      Votes: {delegate.votes}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {simulationResult && (
            <div className="border-l-4 border-purple-500 bg-purple-900/20 p-4 rounded">
              <h3 className="font-bold text-purple-300 mb-2">
                Consensus Result
              </h3>
              <div className="space-y-2 text-sm">
                <div className="text-gray-200">
                  <span className="font-medium">Mechanism:</span>{" "}
                  {simulationResult.mechanism}
                </div>
                <div className="text-gray-200">
                  <span className="font-medium">Selected:</span>{" "}
                  {simulationResult.selected.name}
                </div>
                <div className="text-gray-200">
                  <span className="font-medium">Reason:</span>{" "}
                  {simulationResult.reason}
                </div>
                <div className="mt-3 p-2 bg-gray-700 rounded text-xs">
                  <span className="font-medium text-gray-200">Explanation:</span>
                  <br />
                  <span className="text-gray-300">{simulationResult.explanation}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
