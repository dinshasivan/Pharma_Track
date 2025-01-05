require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    localhost:{
      url:" http://127.0.0.1:8545/"
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/WTEVAwx5PlbZfI7dyWhG73BhCsvAYWgt",
      accounts: ["568d8b1cbaa6c6b7cdc1c66fbcb97d2c1f40ae692203fca64b26d057cbd8da38"]
    },
    holskey:{
      url:"https://eth-holesky.g.alchemy.com/v2/WTEVAwx5PlbZfI7dyWhG73BhCsvAYWgt",
      accounts:["568d8b1cbaa6c6b7cdc1c66fbcb97d2c1f40ae692203fca64b26d057cbd8da38"]
    }
  }
};
