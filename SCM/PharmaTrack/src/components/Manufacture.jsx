import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "../assets/TrackMedicine.json";
import address from "../assets/deployed_addresses.json";

const ManufactureMedicine = () => {
  const [formData, setFormData] = useState({
    batchId: 0,
    Mname: "",
    Mquantity: "",
    Mdate: "",
    Mtemp: "",
  });
  const [loading, setLoading] = useState(false);

  // Update form data 
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const medicineInstance = new ethers.Contract(
        address["TrackModule#TrackMedicine"],
        ABI.abi,
        signer
      );

      const tx = await medicineInstance.manufactureMedicine(
        parseInt(formData.batchId),
        formData.Mname,
        parseInt(formData.Mquantity),
        formData.Mdate,
        parseInt(formData.Mtemp)
      );

      await tx.wait();
      alert("Medicine successfully manufactured!");
      setFormData({
        batchId: 0,
        Mname: "",
        Mquantity: "",
        Mdate: "",
        Mtemp: "",
      });
    } catch (error) {
      console.error("Error manufacturing medicine:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Manufacture Medicine
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="batchId" className="block text-sm font-medium text-gray-700">
            Batch ID
          </label>
          <input
            type="text"
            name="batchId"
            id="batchId"
            value={formData.batchId}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="Enter Batch ID"
            required
          />
        </div>
        <div>
          <label htmlFor="Mname" className="block text-sm font-medium text-gray-700">
            Medicine Name
          </label>
          <input
            type="text"
            name="Mname"
            id="Mname"
            value={formData.Mname}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="Enter Medicine Name"
            required
          />
        </div>
        <div>
          <label htmlFor="Mquantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="Mquantity"
            id="Mquantity"
            value={formData.Mquantity}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="Enter Quantity"
            required
          />
        </div>
        <div>
          <label htmlFor="Mdate" className="block text-sm font-medium text-gray-700">
            Manufacture Date
          </label>
          <input
            type="date"
            name="Mdate"
            id="Mdate"
            value={formData.Mdate}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="Mtemp" className="block text-sm font-medium text-gray-700">
            Storage Temperature (°C)
          </label>
          <input
            type="number"
            name="Mtemp"
            id="Mtemp"
            value={formData.Mtemp}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="Enter Temperature"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Processing..." : "Manufacture Medicine"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManufactureMedicine;
