
import "./upload.css"

function Upload({description, file, name, upload, setMintFalse }) {

    return (
        <div style={{
            position: "absolute",
            top: "100px",
            left: "600px",
            backgroundColor: "rgb(0, 0, 0,0.9)",
            width: "700px",
            height: "800px"
        }}>
            <div style={{

            }}>
                <button onClick={() => {
                    setMintFalse()
                }}>

                    <svg style={{
                        position: "relative",
                        left: "650px",
                        top: "20px",
                        color: "white"
                    }} className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                </button>
            </div>
            <form className="w-full max-w-lg" style={{
                position: "relative",
                left: "100px",
                top: "50px"
            }}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label style={{
                            color: "white"
                        }} className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            First Name
                        </label>
                        <input style={{
                            width: "536px"
                        }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" placeholder="APE" ref={name} />

                    </div>

                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label style={{
                            color: "white"
                        }} className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            IMAGE
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="file" type="file" ref={file} />

                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label style={{

                            color: "white"
                        }} className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Description
                        </label>
                        <textarea ref={description} className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message"></textarea>

                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3">
                        <button className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={upload}>
                            Send
                        </button>
                    </div>
                    <div className="md:w-2/3"></div>
                </div>
            </form>
        </div>
    )


}

export default Upload