import React from 'react';
import Manufacture from '../components/Manufacture.jsx';
import PackMedicine from '../components/PackMedicine.jsx';
import ShipMedicine from '../components/ShipMedicine.jsx';

const ManufacturerPage = ({ openModal }) => {
  return (
    <>
      <button onClick={() => openModal(<Manufacture />)} className="px-8 py-6 bg-cyan-600 text-white rounded-lg hover:bg-blue-400 transition duration-300 text-lg font-semibold">
        Manufacture
      </button>
      <button onClick={() => openModal(<PackMedicine />)} className="px-8 py-6 bg-cyan-600 text-white rounded-lg hover:bg-blue-400 transition duration-300 text-lg font-semibold">
        Pack Medicine
      </button>
      <button onClick={() => openModal(<ShipMedicine />)} className="px-8 py-6 bg-cyan-600 text-white rounded-lg hover:bg-blue-400 transition duration-300 text-lg font-semibold">
        Ship Medicine
      </button>
    </>
  );
};

export default ManufacturerPage;
