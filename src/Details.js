
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Details({ contract }) {


    const [data, setData] = useState({
        image: "",
        minterInfo: "",
        name:"",
        description:"",
        owner:""
    })
    let { id } = useParams();

    const mainContract = contract.contract;
    const signer = contract.signer;

    async function details() {


        const address = await signer.getAddress()

        const connection = mainContract.connect(signer);
        const addr = connection.address;
        const minterInforeq = mainContract.getMinter(id);
        const minterInfo = await minterInforeq;
        const getOwnerInfo = mainContract['ownerOf(uint256)'](id)
        const owner = await getOwnerInfo;
        const tokenURIreq = mainContract.tokenURI(id);
        const tokenURI = await tokenURIreq

        const imageReq = await (await fetch("https://api.ipfsbrowser.com/ipfs/get.php?hash=" + tokenURI)).json()
        const image = imageReq.table[0].image
        const name = imageReq.table[0].name
        const description = imageReq.table[0].description;
        console.log(image)
        setData({
            image,
            minterInfo,
            name,
            description,
            owner
        })


    }

    useEffect(() => {
        details()
    }, [])

    return (
        <div style={{
            textAlign:'center',

        }}>
            <div style={{
                marginTop: '300px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                

            }}>

                <div style={{
                    margin: '20px'
                }} >
                    <img src={data.image} />
                </div>

                <div>
                    <div style={{
                        paddingTop: '30px',
                        margin: "0 0 50px 0"
                    }}>
                        <span>Minter address: </span>
                        <span>{data.minterInfo}</span>
                    </div>
                    <div>
                        <span>Owner address: </span>
                        <span>{data.owner}</span>
                    </div>
                </div>


            </div>
            <div style={{
             
                marginTop:'30px',
                fontSize:'30px',
                fontWeight:'bold'
                
            }}>
                <div><h3>Specification</h3></div>
            </div>
            <div>
                <span>Name: </span><span>{data.name}</span>
            </div>
            <div>
                <span>description: </span><span>{data.description}</span>
            </div>
        </div>
    )


}

export default Details