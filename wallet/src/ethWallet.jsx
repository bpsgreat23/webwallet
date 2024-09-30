import React, { useState } from 'react';
import { ethers } from 'ethers';

const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);

  const addWallet = async () => {
    try {
      const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
      const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
      const wallet = hdNode.derivePath(derivationPath);

      setCurrentIndex(prevIndex => prevIndex + 1);
      setAddresses(prevAddresses => [...prevAddresses, wallet.address]);
    } catch (error) {
      console.error('Error adding wallet:', error);
    }
  };

  return (
    <div className="p-4">
      <button onClick={addWallet} className="mb-4">
        Add Ethereum Wallet
      </button>
      {addresses.map((address, index) => (
        <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
          {address}
        </div>
      ))}
    </div>
  );
};

export default EthWallet;