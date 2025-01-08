# Pharma_Track

### Overview
**PharmaTrack** is a Medicine Supply Chain Traceability System that uses blockchain 
technology to make the medicine supply chain safer, more transparent, and easier to track. 
It helps prevent counterfeit drugs, tracks medicines from production to delivery, 
and allows everyone involved to securely access important information.

---

## Built With
![](https://img.shields.io/badge/HTML5-informational?style=flat&logo=HTML5&color=FF4500)
![](https://img.shields.io/badge/TailwindCSS-informational?style=flat&logo=TailwindCSS&color=00BFFF)
![](https://img.shields.io/badge/React-informational?style=flat&logo=React&color=4CAF50)

![](https://img.shields.io/badge/Solidity-informational?style=flat&logo=Solidity&color=4E44CE)
![](https://img.shields.io/badge/Ethereum-informational?style=flat&logo=Ethereum&color=6CACE4)
![](https://img.shields.io/badge/Hardhat-informational?style=flat&logo=Hardhat&color=FF69B4)

---

## Getting Started

To run the project locally, follow these steps:

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone git@github.com:dinshasivan/Pharma_Track.git
    ```
2. Navigate to the project directory:
    ```bash
    cd PharmaTrack
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the project:
    ```bash
    npm run dev
    ```
    
---

## Smart Contract Setup with Hardhat

To interact with the blockchain and deploy the smart contract, follow these steps:

1. Install Hardhat and the required dependencies:
    ```bash
    cd CertifyChain
    npm install -D hardhat @nomicfoundation/hardhat-toolbox
    ```

2. Set up your environment variables by creating a `.env` file in the root of the project with the following content:
    ```bash
    SEPOLIA_URL=your_sepolia_rpc_url
    PRIVATE_KEY=your_private_key
    ```
    
    Replace `your_sepolia_rpc_url` with your own Sepolia network URL (e.g., from Infura or Alchemy), and `your_private_key` with the private key of your Sepolia account.

3. Here's the `hardhat.config.js` file you'll be using:

    ```javascript
    require("@nomicfoundation/hardhat-toolbox");

    /** @type import('hardhat/config').HardhatUserConfig */
    module.exports = {
      solidity: "0.8.28",
      networks: {
        localhost: {
          url: "http://127.0.0.1:8545/",
        },
        sepolia: {
          url: process.env.SEPOLIA_URL,
          accounts: [process.env.PRIVATE_KEY],
        },
        holesky: {
          url: process.env.HOLSKEY_URL,
          accounts: [process.env.PRIVATE_KEY],
        },
      },
    };
    ```

---

### Notes
- Replace `YOUR_ALCHEMY_API_KEY` with your actual Alchemy API key for the Holesky network.
- Ensure the `.env` file is added to your `.gitignore` to avoid exposing sensitive information like private keys.

---

