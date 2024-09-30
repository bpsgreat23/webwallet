import React, { useState } from 'react';
import { Keypair } from '@solana/web3.js';
import * as bip39 from '@scure/bip39';
import { HDKey } from '@scure/bip32';
// import { Button } from '@/components/ui/button';

const SolWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  const addWallet = () => {
    try {
      const seed = bip39.mnemonicToSeedSync(mnemonic);
      const hdKey = HDKey.fromMasterSeed(seed);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedPrivateKey = hdKey.derive(path).privateKey;
      
      if (!derivedPrivateKey) {
        throw new Error('Failed to derive private key');
      }

      const keypair = Keypair.fromSeed(derivedPrivateKey);
      setCurrentIndex(currentIndex + 1);
      setPublicKeys([...publicKeys, keypair.publicKey]);
    } catch (error) {
      console.error('Error adding wallet:', error);
    }
  };

  return (
    <div className="p-4">
      <button onClick={addWallet} className="mb-4">
        Add Solana Wallet
      </button>
      {publicKeys.map((publicKey, index) => (
        <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
          {publicKey.toBase58()}
        </div>
      ))}
    </div>
  );
};

export default SolWallet;