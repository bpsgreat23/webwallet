import { useState } from 'react'
import { generateMnemonic } from 'bip39';
import './App.css'
import  EthWallet  from './ethWallet';
import SolWallet from './solWallet';

function App() {
  // const [count, setCount] = useState(0);
  const [mnemonic,setMenomic] = useState("");

  return (
    <>
    <input type="text" value={mnemonic}/> 
     <button onClick={ async function() { //  The await keyword is used to pause the execution of the function until the generateMnemonic function resolves and returns a mnemonic phrase.The result is stored in the variable mn.
      const mn =  generateMnemonic();
      setMenomic(mn); // After the mnemonic phrase is generated, this line calls the setMnemonic function to update the state variable mnemonic with the new value (mn).
      // This causes the component to re-render, allowing you to display the generated mnemonic phrase elsewhere in the component.
     }}>
      Create Seed Phrase
     </button>
     {mnemonic && <SolWallet mnemonic = {mnemonic}/>}
     {mnemonic && <EthWallet mnemonic = {mnemonic}/>}
    </>
  )
}

export default App
