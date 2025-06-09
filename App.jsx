import { useState } from "react";

import "./index.css";
import BlockchainSimulator from "./components/BlockchainSimulator";

function App() {
  const [count, setCount] = useState(0);

  return <BlockchainSimulator />;
}

export default App;
