import React, { useState } from 'react';
import ABI from "../assets/TrackMedicine.json";
import address from "../assets/deployed_addresses.json";
import { ethers } from 'ethers';

const PickMedicine = () => {
  const [formData, setFormData] = useState({
    batchId: 0,
    picDate: "", // Changed to picDate to match the smart contract
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Initialize ethers.js provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Contract ABI and address
      const Cabi = ABI.abi;
      const Caddress = address["TrackModule#TrackMedicine"];

      // Create contract instance
      const medicineInstance = new ethers.Contract(Caddress, Cabi, signer);

      console.log("Preparing to pick medicine...");
      console.log("Batch ID:", parseInt(formData.batchId));
      console.log("Pick Date:", formData.picDate);

      // Execute transaction
      const transaction = await medicineInstance.pickMedicine(
        parseInt(formData.batchId),
        formData.picDate // Pass the correct parameter (picDate)
      );
      console.log("Transaction submitted:", transaction);

      // Wait for transaction confirmation
      await transaction.wait();
      alert("Medicine picked successfully!");
    } catch (error) {
      console.error("Error during transaction:", error);

      // Provide a user-friendly error message
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
            name="batchId" // Add name for proper handling
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
            id="picDate" // Changed to picDate
            name="picDate" // Added name for proper handling
            value={formData.picDate} // Use picDate to match the contract parameter
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
