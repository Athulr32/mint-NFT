
import ConnectWallet from './components/ConnectWallet';
import ABI from './ABI';
import { ethers } from "ethers";
import { useState } from 'react';
import Dashboard from './components/Home/DashBoard';

function App1() {

    const contractAddress = "0xD941c45A2B276e03f097e89A6630888eE92557a6";

    const [balance, setBalance] = useState(0);
    const [connect, setConnect] = useState(false)
    const [address, setAddress] = useState("")

    const [contract, setContract] = useState({
        signer: "",
        contract: ""
    })
    async function connection() {

        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);

        //User
        const signer = provider.getSigner();

        //Smart contract
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        const address = await signer.getAddress()

        if (address) {
            setAddress(address)
            setContract({ contract: contract, signer: signer });
            setConnect(true)
        }

    }

    return (

        <div>

            {connect ? <Dashboard address={address} contract={contract} /> : <ConnectWallet connect={connection} />}



        </div>


    )



}

export default App1;