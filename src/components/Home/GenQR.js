import QRCode from "react-qr-code";

function GenQR({ id }) {
    const value="localhost:3000/"+id;
    return (
        <div>

            <div style={{ height:"250px",margin:'50px'}}>
                <QRCode
                    size={256}
                    style={{ height: "250px", maxWidth: "100%", width: "100%" }}
                    value={value}
                    viewBox={`0 0 256 256`}
                />
            </div>
            <div style={{
                textAlign:'center'
            }}>
                {value}
            </div>

        </div>
    )


}

export default GenQR;