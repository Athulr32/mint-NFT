
import { useEffect, useState } from 'react';
import QRhome from './QRhome';



function NFT({ imageClick,address, contract }) {

    const mainContract = contract.contract;
    const signer = contract.signer
    const ipfsurl = "https://gateway.pinata.cloud/ipfs/";
    const [tokenURI, setToken] = useState({uri:[],tokenId:[]});


    async function getNFT() {
        const connection = mainContract.connect(signer);
        const addr = connection.address;
        const address = await signer.getAddress()
        console.log("Out address"+address);
        const result = await mainContract.getToken(address)
        console.log(result)
        let arr = []
        let tok=[]
        for (let i = 0; i < result.length; i++) {
            const tokenNum = parseInt(result[i]._hex, 16);
         
            if(tokenNum==0){
                continue;
            }
            console.log("TOk",tokenNum)
            const res = await mainContract.tokenURI(tokenNum);
            const jsonres = await fetch("https://api.ipfsbrowser.com/ipfs/get.php?hash=" + res);
            const response = await jsonres.json();
            arr.push(response.table[0].image)
            tok.push(tokenNum)
        }
        console.log("Arr",arr)
        setToken({uri:[...arr],tokenId:[...tok]})


    }


    function imageClickHandler(e) {
        console.log(e.target.id)
        imageClick(e.target.id)

    }




    useEffect(() => {

        getNFT()


    }, [])




    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center'

            }}>

                <div style={{
                    display: "flex", flexDirection: "row", flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
                }} >

                    {tokenURI.uri.map((uri, i) => {
                        return (

                            <div style={{
                                height: '300px',
                                width: '300px',
                                margin: '20px'
                            }} key={i}>

                                <img style={{
                                    height: 'inherit',
                                    width: 'inherit'
                                }} id={tokenURI.tokenId[i]} onClick={imageClickHandler} src={uri} />

                            </div>
                        )
                    })}

                </div>


            </div>







        </>
    )

}

export default NFT;