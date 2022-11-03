import { useState } from "react"
import GenQR from "./GenQR";
import Transfer from "./Transfer";



function QRhome({contract, imageClickFalse, id }) {
    const [options, setOptions] = useState({
        showQR:false,
        showTransfer:false
    });



    function genQR() {
        setOptions({
            showQR:true,
            showTransfer:false
        });
    }

    function transfer(){
        setOptions({
            showQR:false,
            showTransfer:true
        });
    }
    return (

        <div style={{
            width:'100%'
          }}>

          <div style={{
            display:'flex',
            flexDirection:'column',
            textAlign:'center'
          }} >
                    <div style={{
                        display: "flex",
                        justifyContent:'center',
                        marginTop:'100px'
                    }}>
                        <div style={{
                            margin:'20px'
                        }}>
                            <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={genQR}>Generate QR Code</button>
                        </div>

                        <div style={{
                            margin:'20px'
                        }}>
                            <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={transfer}>Transfer This NFT</button>
                        </div>

                    </div>

                    <div>
                        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                            imageClickFalse()
                        }}>Back to Image</button>
                    </div>
                </div>


            {
                options.showQR && <GenQR id={id}></GenQR>
            }

            {
                options.showTransfer && <Transfer id={id} contract={contract}></Transfer>
            }
        </div>
    )


}

export default QRhome