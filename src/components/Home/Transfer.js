import { useRef } from "react";


function Transfer({id,contract}) {
    const to = useRef(null);

    const mainContract = contract.contract;
    const signer = contract.signer


   async function transferNFT(){
    const address = await signer.getAddress()
    console.log("address"+address)
    const connection = mainContract.connect(signer);
    const addr = connection.address;

    const approveToken = await mainContract.approve(addr,id)

    console.log(approveToken)
    const sendNFT = await mainContract['safeTransferFrom(address,address,uint256)'](address, to.current.value,id)
    console.log(sendNFT)

    }


    return (
        <div>

            <div className="flex justify-center" style={{
                margin:'100px 0 50px 0'
            }}>
                <div style={{
                    width:"60%"
                }}>
                    <label style={{
                    fontWeight:'bold'
                    }} htmlFor="address" className="form-label  inline-block mb-2 text-gray-700"
                    >Enter the recipient address</label
                    >
                    <input
                        ref={to}
                        type="text"
                        className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                        id="address"
                        placeholder="address"
                    />
                </div>
               
            </div>
            <div style={{
                textAlign:'center'
            }}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={transferNFT}>Transfer</button>
                </div>

        </div>
    )
}

export default Transfer;


