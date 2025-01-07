import React, { useEffect, useState } from 'react';
import ABI from "../assets/TrackMedicine.json";
import address from "../assets/deployed_addresses.json";
import { ethers } from 'ethers';

const PickMedicine = () => {
  const [formData, setFormData] = useState({
    batchId: 0,
    picDate: "", 
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
      // get connected address
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const Cabi = ABI.abi;
      const Caddress = address["TrackModule#TrackMedicine"];

      // Create contract instance
      const medicineInstance = new ethers.Contract(Caddress, Cabi, signer);

      console.log("Preparing to pick medicine...");
      console.log("Batch ID:", parseInt(formData.batchId));
      console.log("Pick Date:", formData.picDate);

      // call function using created contract instance
      const transaction = await medicineInstance.pickMedicine(
        parseInt(formData.batchId),
        formData.picDate 
      );
      console.log("Transaction submitted:", transaction);

      await transaction.wait();
      alert("Medicine picked successfully!");
    } catch (error) {
      console.error("Error during transaction:", error);

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
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Pick Medicine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Batch ID */}
        <div>
          <label htmlFor="batchId" className="block text-sm font-medium text-gray-700">
            Batch ID
          </label>
          <input
            type="text"
            id="batchId"
            name="batchId" 
            value={formData.batchId}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="Enter Batch ID"
            required
          />
        </div>

        {/* Pick Date */}
        <div>
          <label htmlFor="picDate" className="block text-sm font-medium text-gray-700">
            Pick Date
          </label>
          <input
            type="date"
            id="picDate" 
            name="picDate" 
            value={formData.picDate} 
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            Pick Medicine
          </button>
        </div>
      </form>
    </div>
  );
};

export default PickMedicine;
