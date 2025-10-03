import "./index.css";

import ReactDOM from "react-dom/client";
import { Web3AuthProvider } from "@web3auth/modal/react";
import web3AuthContextConfig from "./pages/web3authContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Web3AuthProvider config={web3AuthContextConfig}>
    <App />
  </Web3AuthProvider>,
);