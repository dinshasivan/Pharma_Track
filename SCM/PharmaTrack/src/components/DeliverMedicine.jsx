import React, { useEffect, useState } from 'react';
import {ethers} from 'ethers'
import ABI from '../assets/TrackMedicine.json'
import address from '../assets/deployed_addresses.json'


const DeliverMedicine = () => {
  const [formData, setFormData] = useState({
    batchId:0,
    Ddate:"",
    retailer:""
  })

  const Cabi = ABI.abi;
  const Caddress = address['TrackModule#TrackMedicine'];
  console.log(Caddress);

  function handleChange (event){
    event.preventDefault();

    const {name, value} = event.target;
    setFormData((preState)=> ({...preState,[name]:value}))
    console.log(formData);
  }

  useEffect(() =>{
    const setupEventListener = async ()=>{
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(Caddress,Cabi,provider);

      contract.on("StatusUpdated",(batchId, status)=>{
        alert(`BatchId: ${batchId} Status Updated : ${status}`);
      });

      return () =>{
        contract.removeAllListeners("StatusUpdated");
      };

    };
    setupEventListener();
    
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      if(!ethers.isAddress(formData.retailer)){
        alert("Invalid retailer address. Please enter a valid Ethereum address.")
        return
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      

      const medicineInstance = new ethers.Contract(Caddress,Cabi,signer);
      console.log(medicineInstance);

      const transReceipt = await medicineInstance.deliverMedicine(
        parseInt(formData.batchId),
        formData.Ddate,
        formData.retailer
      );
      console.log( "Transaction Submitted",transReceipt);
      alert("Medicine Delivered successfully!")
      
    }
    catch(error){
      console.error(error);
      
    } 
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Deliver Medicine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Batch ID */}
        <div>
          <label htmlFor="batchId" className="block text-sm font-medium text-gray-700">
            Batch ID
          </label>
          <input
            type="text"
            id="batchId"
            name='batchId'
            value={formData.batchId}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="Enter Batch ID"
            required
          />
        </div>
        <div>
          <label htmlFor="retailer" className="block text-sm font-medium text-gray-700">
            Retailer Address
          </label>
          <input
            type="text"
            id="retailer"
            name='retailer'
            value={formData.retailer}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="Enter Retailer Address"
            required
          />
        </div>

        {/* Delivery Date */}
        <div>
          <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700">
            Delivery Date
          </label>
          <input
            type="date"
            id="deliveryDate"
            name='Ddate'
            value={formData.Ddate}
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
            Deliver Medicine
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliverMedicine;
