import { useEffect, useRef, useState } from "react";
import Upload from "../Upload/Upload";

function MintNFT({ contract,setMintFalse}) {
    const mainContract = contract.contract;
    const signer = contract.singer
    const file = useRef(null);
    const name = useRef(null)
    const description = useRef(null);
    const [metadataURI , setMetadata] = useState(null)
    const [mint,setMint] = useState(false);
    const [err,setError] = useState("");
    

    const mintToken = async (metadataURI) => {
        console.log("Minting")

        console.log(mainContract)

        try{

            const connection = mainContract.connect(signer);
        const addr = connection.address;
        console.log("MEta is",metadataURI)
        const result = await mainContract.payToMint(addr, metadataURI, {
      
          });

          console.log( await result.wait())
          const data = await result.wait();
       
          setMintFalse({
            hash:data.transactionHash,
            meta:metadataURI
          });
        }
        catch(e){

            setMintFalse(false)
        }

    }


  function upload() {

        const nftname = name.current.value;
        const formData = new FormData();
        
        formData.append('image', 'Newimage');
        formData.append('nft', file.current.files[0]);
        formData.append('name', nftname);
        formData.append('description',description.current.value);

        fetch("http://localhost:3001/image", {
            method: 'PUT',
            body: formData
        }).then((res) => {
            return res.json()
        }).then(async data => {
          
          await  mintToken(data.data)
           
        })

    }


    return (
        <>
       <Upload setMintFalse={setMintFalse} description={description} file={file} name={name} upload={upload}></Upload>

        </>
    )



}

export default MintNFT;