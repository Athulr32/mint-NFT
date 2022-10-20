import { useState } from "react"
import MintNFT from "../Mint/MintNFT"
import NFT from "./NFT";


function Dashboard(props) {

    const [mint, clickMint] = useState(false)
    const [msg, setMessage] = useState("");
    const [txs, setTxs] = useState(false);
    
    function setMintFalse(text) {

        clickMint(false);
        if(text){
            setTxs(true);
            setMessage(text)
        }
     
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'

        }}>

            <div style={{
                margin: "20px"
            }}>
                <h1 style={{
                    fontSize: "40px"
                }}>Welcome {props.address}</h1>
            </div>

            <div style={{
                margin: "20px"
            }}>
                <button style={{
                    width: '200px',
                    height: '50px',
                    backgroundColor: 'red',
                    border: 'none',
                    color: "white",
                    fontSize: '23px'
                }} onClick={() => {
                    clickMint(true)
                }}>
                    Mint NFT
                </button>
            </div>

            {mint ? <MintNFT setMintFalse={setMintFalse} contract={props.contract} /> : ""}
            {txs ? <div>

                <div style={{
                    margin: "30px",
                    fontSize: "20px"
                }}>TxHash : <a href={"https://goerli.etherscan.io/tx/" + msg.hash}>{msg.hash}</a>
                </div>
                <div>

                    <div style={{
                        textAlign: 'center',
                        fontSize: "30px",
                        margin: "30px"
                    }}> <a href={"https://gateway.pinata.cloud/ipfs/" + msg.meta}>MetadataURI</a>
                    </div>
                </div>
            </div> : ""}
            <div style={{
                borderBottom: '2px solid black',
                fontSize: '30px'
            }}>
                <h3>Your Minted NFT's</h3>
            </div>

            {/* <div>
        
            <NFT></NFT>

            </div> */}

        </div>
    )


}

export default Dashboard