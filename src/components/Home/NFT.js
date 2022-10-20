import axios from 'axios';
import { useEffect, useState } from 'react';



function NFT() {
    const ipfsurl = "https://gateway.pinata.cloud/ipfs/";

    const [image, setImage] = useState([])

    useEffect( () => {
        
      const img = getNFT();
      setImage(()=>{
        return [...img]
      })

    }, [])

  function getNFT() {

      const img=[]

        const options = {
            method: 'GET',
            url: 'https://deep-index.moralis.io/api/v2/0x5B7565D77377003e013d7D63b6b9C2E0166a2b0F/nft',
            params: { chain: 'goerli', format: 'decimal' },
            headers: { accept: 'application/json', 'X-API-Key': 'test' }
        };

        axios
            .request(options)
            .then(async function (response) {
                for (let i = 0; i < response.data.result.length; i++) {

                    const token_uri = response.data.result[i].token_uri;
                    const ipfshash = token_uri.split("/")[4];

                    const res = await fetch(ipfsurl + ipfshash)
                    const data = await res.json()
                    img.push(data.table[0].image);


                }
              

            })
            .catch(function (error) {
                console.error(error);
            });


            return img;

    }

    return (
        <>
            <div>

            {console.log("Helllllo")}
                {image.map(function (data, i) {
                    console.log(data)
                    return (
                        <div key={i} style={{ margin: "100px" }}><img src={data} width="200px" height="200px" /></div>
                    )
                })}

            </div>

        </>
    )

}

export default NFT;