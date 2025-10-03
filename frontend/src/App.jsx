import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser } from "@web3auth/modal/react";
import { useAccount } from "wagmi";


function Login() {
  const { connect, isConnected, loading: connectLoading } = useWeb3AuthConnect();
  const { userInfo } = useWeb3AuthUser();
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (isConnected && userInfo) {
      navigate("/home");
    }
  }, [isConnected, userInfo, navigate]);

  const handleLogin = async () => {
    try {
      await connect({
        loginProvider: "google", // or any login method
        redirectUrl: window.location.origin,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid">
      <h1>Login Page</h1>
      <button onClick={handleLogin} disabled={connectLoading}>
        {connectLoading ? "Connecting..." : "Login with Google"}
      </button>
    </div>
  );
}

function Home() {
  const { userInfo } = useWeb3AuthUser();
  const { disconnect, loading: disconnectLoading } = useWeb3AuthDisconnect();
  const { address } = useAccount();

  return (
    <div className="grid">
      <h1>Home Page</h1>
      <p>Welcome, {userInfo?.name || userInfo?.email}</p>
      <p>Wallet: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}</p>
      <button onClick={() => disconnect()} disabled={disconnectLoading}>
        {disconnectLoading ? "Disconnecting..." : "Logout"}
      </button>
   
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* Optional: Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
