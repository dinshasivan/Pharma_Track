import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "../assets/TrackMedicine.json";
import address from "../assets/deployed_addresses.json";

const MedicineTracker = () => {
  const [id, setId] = useState("");
  const [medicineDetails, setMedicineDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch medicine details
  const getMedicineDetails = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);//provider api injected by metamask
      const signer = await provider.getSigner();// get the signer using getSigner function

      const CAbi = ABI.abi; // abi is the skeleton of the smart contract
      const contractAddress = address["TrackModule#TrackMedicine"];
      const medicineInstance = new ethers.Contract(contractAddress, CAbi, signer);

      const exists = await medicineInstance.medicines(id);
      const { name, manufacturer, distributor, retailer, dates } = exists;

      const manufacturingDate = dates?.m_Date || null;
      const packingDate = dates?.p_Date || null;
      const shippingDate = dates?.s_Date || null;
      const pickupDate = dates?.picDate || null;
      const storingDate = dates?.storeDate || null;
      const deliveryDate = dates?.d_Date || null;

      let status = "Not Started";
      if (manufacturingDate) status = "Manufactured";
      if (packingDate) status = "Packed";
      if (shippingDate) status = "Shipped";
      if (pickupDate) status = "Picked";
      if (storingDate) status = "Stored";
      if (deliveryDate) status = "Delivered";

      const existingIndex = medicineDetails.findIndex((medicine) => medicine.id === id);

      const updatedMedicineDetails =
        existingIndex !== -1
          ? medicineDetails.map((medicine, idx) =>
              idx === existingIndex
                ? {
                    id,
                    name,
                    manufacturer,
                    manufacturingDate: manufacturingDate || "N/A",
                    packingDate: packingDate || "N/A",
                    shippingDate: shippingDate || "N/A",
                    distributor,
                    pickupDate: pickupDate || "N/A",
                    storingDate: storingDate || "N/A",
                    retailer,
                    deliveryDate: deliveryDate || "N/A",
                    status,
                  }
                : medicine
            )
          : [
              ...medicineDetails,
              {
                id,
                name,
                manufacturer,
                manufacturingDate: manufacturingDate || "N/A",
                packingDate: packingDate || "N/A",
                shippingDate: shippingDate || "N/A",
                distributor,
                pickupDate: pickupDate || "N/A",
                storingDate: storingDate || "N/A",
                retailer,
                deliveryDate: deliveryDate || "N/A",
                status,
              },
            ];

      localStorage.setItem("medicineDetails", JSON.stringify(updatedMedicineDetails));
      setMedicineDetails(updatedMedicineDetails);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching medicine details:", error);
      alert("Error fetching medicine details. Please try again.");
      setLoading(false);
    }
  };

  // Retrieve from localStorage on component load
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("medicineDetails")) || [];
    setMedicineDetails(savedData);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Track Medicine</h1>

      <form
        onSubmit={getMedicineDetails}
        className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-center"
      >
        <label className="block sm:inline-block mb-2 sm:mb-0 sm:mr-4 font-medium text-gray-700">
          Enter Batch ID:
        </label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded w-full sm:w-1/2 mb-4 sm:mb-0"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Fetching..." : "Track Medicine"}
        </button>
      </form>

      {medicineDetails.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Batch ID",
                  "Manufacturer",
                  "Manufacturing Date",
                  "Medicine Name",
                  "Packing Date",
                  "Shipping Date",
                  "Distributor",
                  "Pickup Date",
                  "Storing Date",
                  "Retailer",
                  "Delivery Date",
                  "Status",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 text-sm md:text-base font-medium text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {medicineDetails.map((medicine, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  {[
                    medicine.id,
                    `${medicine.manufacturer.slice(0, 6)}...${medicine.manufacturer.slice(-4)}`,
                    medicine.manufacturingDate,
                    medicine.name,
                    medicine.packingDate,
                    medicine.shippingDate,
                    `${medicine.distributor.slice(0, 6)}...${medicine.distributor.slice(-4)}`,
                    medicine.pickupDate,
                    medicine.storingDate,
                    `${medicine.retailer.slice(0, 6)}...${medicine.retailer.slice(-4)}`,
                    medicine.deliveryDate,
                    medicine.status,
                  ].map((value, subIndex) => (
                    <td
                      key={subIndex}
                      className="border border-gray-300 px-4 py-2 text-sm md:text-base text-gray-700"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MedicineTracker;
