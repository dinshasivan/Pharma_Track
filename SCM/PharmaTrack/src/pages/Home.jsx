import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Manufacture from '../components/Manufacture.jsx';
import PackMedicine from '../components/PackMedicine.jsx';
import ShipMedicine from '../components/ShipMedicine.jsx';
import PickupMedicine from '../components/PickeupMedicine.jsx';
import StoreMedicine from '../components/StoreMedicine.jsx';
import DeliverMedicine from '../components/DeliverMedicine.jsx';

// Modal Component
const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [deployer, setDeployer] = useState(null);
  
  const connectedAddress = localStorage.getItem('connectedAccount');
  const distributedAddress = localStorage.getItem('distributorAddress');

  console.log(distributedAddress.toLowerCase() === connectedAddress);
  
  // Fetch deployer address using ethers.js
  useEffect(() => {
    const fetchDeployer = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = signer.address;
          setDeployer(address);
          console.log(address);
          
        } catch (error) {
          console.error('Error fetching deployer address:', error);
        }
      } else {
        console.error('Ethereum provider not found');
      }
    };
    console.log(deployer);
    

    fetchDeployer();
  }, []);

  // console.log(deployer);
  
  // Modal control
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen font-sans">
        
        <section className="bg-gradient-to-r from-gray-600 to-slate-300 h-screen flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">Welcome to PharmaTrack</h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-white">
            Your trusted platform for managing pharmaceutical processes with ease and efficiency.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-4">
            {/* components  for manufacturer */}
            {connectedAddress && connectedAddress != distributedAddress.toLowerCase() &&  (
              <>
                <button
                  onClick={() => openModal(<Manufacture />)}
                  className="px-8 py-6 bg-cyan-600 text-white rounded-lg hover:bg-blue-400 transition duration-300 text-lg font-semibold"
                >
                  Manufacture
                </button>
                <button
                  onClick={() => openModal(<PackMedicine />)}
                  className="px-8 py-6 bg-cyan-600 text-white rounded-lg hover:bg-blue-400 transition duration-300 text-lg font-semibold"
                >
                  Pack Medicine
                </button>
                <button
                  onClick={() => openModal(<ShipMedicine />)}
                  className="px-8 py-6 bg-cyan-600 text-white rounded-lg hover:bg-blue-400 transition duration-300 text-lg font-semibold"
                >
                  Ship Medicine
                </button>
              </>
            )}

            {/* components for distributor */}
            {connectedAddress && connectedAddress === distributedAddress.toLowerCase() && (
              <>
                <button
                  onClick={() => openModal(<PickupMedicine />)}
                  className="px-8 py-6 bg-cyan-600 text-white rounded-lg hover:bg-blue-400 transition duration-300 text-lg font-semibold"
                >
                  Pick Up Medicine
                </button>
                <button
                  onClick={() => openModal(<StoreMedicine />)}
                  className="px-8 py-6 bg-cyan-600 text-white rounded-lg hover:bg-blue-400 transition duration-300 text-lg font-semibold"
                >
                  Store Medicine
                </button>
                <button
                  onClick={() => openModal(<DeliverMedicine />)}
                  className="px-8 py-6 bg-cyan-600 text-white rounded-lg hover:bg-blue-400 transition duration-300 text-lg font-semibold"
                >
                  Deliver Medicine
                </button>
              </>
            )}
          </div>
        </section>
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          {modalContent}
        </Modal>
        <footer className="bg-gray-800 text-white py-6 text-center">
          <p>&copy; 2025 PharmaTrack. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
