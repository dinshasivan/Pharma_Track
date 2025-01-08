import React, { useState } from "react";
import ABI from "../assets/TrackMedicine.json";
import address from "../assets/deployed_addresses.json";
import { ethers } from "ethers";

const StoreMedicine = () => {
  const [formData, setFormData] = useState({
    batchId: 0,
    storeDate: "",
    storageLocation: "",
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

      console.log("Preparing to store medicine...");
      console.log("Batch ID:", parseInt(formData.batchId));
      console.log("Store Date:", formData.storeDate);
      console.log("Storage Location:", formData.storageLocation);

      // Execute transaction
      const transaction = await medicineInstance.storeMedicine(
        parseInt(formData.batchId),
        formData.storageLocation,
        formData.storeDate
      );
      console.log("Transaction submitted:", transaction);

      alert("Medicine stored successfully!");
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
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Store Medicine
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Batch ID */}
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

        {/* Storage Location */}
        <div>
          <label htmlFor="storageLocation" className="block text-sm font-medium text-gray-700">
            Storage Location
          </label>
          <input
            type="text"
            id="storageLocation"
            name="storageLocation"
            value={formData.storageLocation}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="Enter Storage Location"
            required
          />
        </div>

        {/* Store Date */}
        <div>
          <label htmlFor="storeDate" className="block text-sm font-medium text-gray-700">
            Store Date
          </label>
          <input
            type="date"
            id="storeDate"
            name="storeDate"
            value={formData.storeDate}
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
            Store Medicine
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreMedicine;
