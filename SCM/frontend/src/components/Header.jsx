import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { HiMenu } from "react-icons/hi";

const Header = () => {
  const [account, setAccount] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Load account from localStorage if it exists
    const savedAccount = localStorage.getItem("connectedAccount");
    if (savedAccount) {
      setAccount(savedAccount);
    }
  }, []);

  const connectToMetamask = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        localStorage.setItem("connectedAccount", accounts[0]); // Save to localStorage
        alert("Connected account: " + accounts[0]);
      } else {
        alert("MetaMask not installed");
      }
    } catch (error) {
      console.error("Connection failed", error);
      alert("Failed to connect to MetaMask");
    }
  };

  const logout = () => {
    setAccount(null);
    localStorage.removeItem("connectedAccount"); // Clear from localStorage
    alert("Disconnected from MetaMask");
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-slate-500 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-white hover:text-blue-300 transition-all duration-300">
          <Link to="/">PharmaTrack</Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">          <Link to="/tracking" className="text-white hover:text-yellow-300 transition duration-300">Tracking</Link>
          {!account ? (
            <button
              onClick={connectToMetamask}
              className="text-white bg-green-500 hover:bg-green-400 px-4 py-2 rounded-lg transition duration-300 shadow-lg"
            >
              Connect To Metamask
            </button>
          ) : (
            <button
              onClick={logout}
              className="text-white bg-red-500 hover:bg-red-400 px-4 py-2 rounded-lg transition duration-300 shadow-lg"
            >
              Disconnect
            </button>
          )}
        </nav>

        {/* Hamburger Menu for Mobile */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <HiMenu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-slate-800 shadow-lg">
          <ul className="space-y-4 py-6 text-center">
            <li>
              <Link to="/tracking" className="block text-white hover:text-yellow-300 transition duration-300">Tracking</Link>
            </li>
            <li>
              {!account ? (
                <button
                  onClick={connectToMetamask}
                  className="text-white bg-green-500 hover:bg-green-400 px-4 py-2 rounded-lg transition duration-300 shadow-lg"
                >
                  Connect To Metamask
                </button>
              ) : (
                <button
                  onClick={logout}
                  className="text-white bg-red-500 hover:bg-red-400 px-4 py-2 rounded-lg transition duration-300 shadow-lg"
                >
                  Disconnect
                </button>
              )}
            </li>
          </ul>
        </nav>
      )}

      {/* Account Information */}
      {account && (
        <div className="text-white text-center py-2 bg-slate-700 mt-2 shadow-md">
          <p className="text-lg font-semibold">Account: {account.slice(0, 6)}...{account.slice(-4)}</p>
        </div>
      )}
    </header>
  );
};

export default Header;