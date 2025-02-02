import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ABI from "../assets/TrackMedicine.json";
import address from "../assets/deployed_addresses.json";

const ShipMedicine = () => {
  const [formData, setFormData] = useState({
    batchId: 0,
    shipDate: "",
    distributor: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

   // Event Listener for contract events
  useEffect(() => {
    const setupEventListener = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          address["TrackModule#TrackMedicine"],
          ABI.abi,
          provider
        );

        contract.on("StatusUpdated", (batchId, status) => {
          alert(`Batch ID: ${batchId} - Status Updated: ${status}`);
          console.log(`Event: Batch ID ${batchId}, Status: ${status}`);
        });

        return () => {
          contract.removeAllListeners("StatusUpdated");
        };
      } catch (error) {
        console.error("Error setting up event listener:", error);
      }
    };

    setupEventListener();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // check the input is ethereum address or not
      if (!ethers.isAddress(formData.distributor)) {
        alert("Invalid distributor address. Please enter a valid Ethereum address.");
        return;
      }

      // Store distributor address in localStorage
      localStorage.setItem("distributorAddress", formData.distributor);
      console.log("Distributor address saved to localStorage:", formData.distributor);

      // get the connected account
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const Cabi = ABI.abi;
      const Caddress = address["TrackModule#TrackMedicine"];

      // Create contract instance
      const medicineInstance = new ethers.Contract(Caddress, Cabi, signer);

      console.log("Preparing to ship medicine...");
      console.log("Batch ID:", parseInt(formData.batchId));
      console.log("Ship Date:", formData.shipDate);
      console.log("Distributor:", formData.distributor);

      // Call the contract function using created contract instance
      const transaction = await medicineInstance.shipMedicine(
        parseInt(formData.batchId), 
        formData.shipDate, 
        formData.distributor 
      );

      console.log("Transaction submitted:", transaction);

      
      const receipt = await transaction.wait();
      console.log("Transaction confirmed:", receipt);

      alert("Medicine shipped successfully!");
    } catch (error) {
      console.error("Error shipping medicine:", error);

      
      if (error.reason) {
        alert(`Transaction failed: ${error.reason}`);
      } else if (error.message) {
        alert(`Transaction failed: ${error.message}`);
      } else {
        alert("An unknown error occurred. Check the console for details.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Ship Medicine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="batchId" className="block text-sm font-medium text-gray-700">
            Batch ID
          </label>
          <input
            type="number"
            id="batchId"
            name="batchId"
            value={formData.batchId}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="Enter Batch ID"
            required
          />
        </div>
        <div>
          <label htmlFor="distributor" className="block text-sm font-medium text-gray-700">
            Distributor Address
          </label>
          <input
            type="text"
            id="distributor"
            name="distributor"
            value={formData.distributor}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="Enter Distributor Address"
            required
          />
        </div>
        <div>
          <label htmlFor="shipDate" className="block text-sm font-medium text-gray-700">
            Shipping Date
          </label>
          <input
            type="date"
            id="shipDate"
            name="shipDate"
            value={formData.shipDate}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            Ship Medicine
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShipMedicine;
