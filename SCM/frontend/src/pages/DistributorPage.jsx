import React from 'react';
import PickMedicine from '../components/PickeupMedicine.jsx';
import StoreMedicine from '../components/StoreMedicine.jsx';
import DeliverMedicine from '../components/DeliverMedicine.jsx';

const DistributorPage = ({ openModal }) => {
  return (
    <>
      <button onClick={() => openModal(<PickMedicine />)} className="px-8 py-6 bg-cyan-600 text-white rounded-lg hover:bg-blue-400 transition duration-300 text-lg font-semibold">
        Pick Medicine
      </button>
      <button onClick={() => openModal(<StoreMedicine />)} className="px-8 py-6 bg-cyan-600 text-white rounded-lg hover:bg-blue-400 transition duration-300 text-lg font-semibold">
        Store Medicine
      </button>
      <button onClick={() => openModal(<DeliverMedicine />)} className="px-8 py-6 bg-cyan-600 text-white rounded-lg hover:bg-blue-400 transition duration-300 text-lg font-semibold">
        Deliver Medicine
      </button>
    </>
  );
};

export default DistributorPage;
