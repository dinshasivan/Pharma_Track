import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { HiMenu } from "react-icons/hi"; // Import the hamburger icon from React Icons

const Header = () => {
  const [account, setAccount] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function connectToMetamask() {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const addr = await provider.getSigner();
        console.log(addr);
        
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        alert("Connected account: " + accounts[0]);
      } else {
        console.error("MetaMask not installed");
      }
    } catch (error) {
      console.error("Connection failed", error);
    }
  }

  function logout() {
    setAccount(null);
    alert("Disconnected from MetaMask");
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-slate-500 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-white hover:text-blue-300 transition-all duration-300">
          <Link to="/">PharmaTrack</Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link to={"/"} className="text-white hover:text-yellow-300 transition duration-300">Home</Link>
          <Link to={"/tracking"} className="text-white hover:text-yellow-300 transition duration-300">Tracking</Link>
          <Link to={"/about"} className="text-white hover:text-yellow-300 transition duration-300">About</Link>
          <div className="flex items-center space-x-4">
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
          </div>
        </nav>

        {/* Hamburger Menu for Mobile */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* React Hamburger Icon */}
          <HiMenu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-slate-800 shadow-lg">
          <ul className="space-y-4 py-6 text-center">
            <li>
              <Link to={"/"} className="block text-white hover:text-yellow-300 transition duration-300">Home</Link>
            </li>
            <li>
              <Link to={"/tracking"} className="block text-white hover:text-yellow-300 transition duration-300">Tracking</Link>
            </li>
            <li>
              <Link to={"/about"} className="block text-white hover:text-yellow-300 transition duration-300">About</Link>
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
