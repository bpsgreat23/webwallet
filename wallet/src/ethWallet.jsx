import React, { useState } from 'react';
import { HDNodeWallet,ethers, Wallet } from 'ethers';
import { mnemonicToSeed } from "bip39";
// import{HDNode} from '@scure/bip32';

const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);

  const addWallet = async () => {
    try {
      // const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
      // const derivationPath = `m/44'/60'/${currentIndex}'/0'`;

      const seed = await mnemonicToSeed(mnemonic);
      const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(derivationPath);
      const privateKey = child.privateKey;
      const wallet = new Wallet(privateKey);


      // const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
      

      // const derivationPath = `m/44'/60'/0'/0/${currentIndex}`;
      // const wallet = hdNode.derivePath(derivationPath);

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