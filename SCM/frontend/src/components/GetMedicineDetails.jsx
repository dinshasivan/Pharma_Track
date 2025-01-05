import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';
import ABI from '../assets/TrackMedicine.json';
import address from '../assets/deployed_addresses.json';

const GetMedicineDetails = () => {
  const [medicineDetails, setMedicineDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load data from localStorage when component mounts
  useEffect(() => {
    const storedDetails = JSON.parse(localStorage.getItem('medicineDetails'));
    if (storedDetails) {
      setMedicineDetails(storedDetails);
    }
  }, []);

  async function getMedicineDetails(event) {
    event.preventDefault();
    const id = document.getElementById('id').value;

    try {
      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const CAbi = ABI.abi;
      const contractAddress = address['TrackModule#TrackMedicine'];

      const medicineInstance = new ethers.Contract(contractAddress, CAbi, signer);

      const exists = await medicineInstance.medicines(id);

      // Extracting the medicine details
      const {
        name,
        manufacturer,
        distributor,
        retailer,
        dates
      } = exists;

      // Check if dates are defined
      const manufacturingDate = dates?.m_Date || 'N/A';
      const packingDate = dates?.p_Date || 'N/A';
      const shippingDate = dates?.s_Date || 'N/A';
      const pickupDate = dates?.picDate || 'N/A';
      const storingDate = dates?.storeDate || 'N/A';
      const deliveryDate = dates?.d_Date || 'N/A';

      // Append the new data to the existing state
      const newMedicineDetails = [
        ...medicineDetails,
        {
          id,
          name,
          manufacturer,
          manufacturingDate,
          packingDate,
          shippingDate,
          distributor,
          pickupDate,
          storingDate,
          retailer,
          deliveryDate
        }
      ];

      // Save the updated details to localStorage
      localStorage.setItem('medicineDetails', JSON.stringify(newMedicineDetails));

      // Update state with the new details
      setMedicineDetails(newMedicineDetails);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching medicine details:", error);
      alert("Error fetching medicine details. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-4">
        {/* Form Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Track Medicine Details</h2>
          <form className="space-y-4" onSubmit={getMedicineDetails}>
            {/* Batch ID */}
            <div>
              <label htmlFor="batchId" className="block text-sm font-medium text-gray-700">
                Batch ID
              </label>
              <input
                type="text"
                id="id"
                name="batchId"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="Enter Batch ID"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Track Medicine'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-6">
        {/* Medicine Details Table Section */}
        <div className="mt-6 overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Batch ID</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Manufacturer</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Manufacturing Date</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Medicine Name</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Packing Date</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Shipping Date</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Distributor</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Pickup Date</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Storing Date</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Retailer</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Delivery Date</th>
              </tr>
            </thead>
            <tbody>
              {medicineDetails.map((medicine, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                >
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {medicine.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {medicine.manufacturer}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {medicine.manufacturingDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {medicine.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {medicine.packingDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {medicine.shippingDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {medicine.distributor}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {medicine.pickupDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {medicine.storingDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {medicine.retailer}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                    {medicine.deliveryDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default GetMedicineDetails;
