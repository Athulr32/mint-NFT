
const express = require("express");
const app = express();
var formidable = require('formidable');
var fs = require('fs');
var cors = require('cors')
const path = require("path")

require('dotenv').config()
const pinataSDK = require('@pinata/sdk');

const pinata = pinataSDK(process.env.PINNATA_API_KEY, process.env.PINNATA_SECRET_KEY);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/image", async (req, res) => {

    //NFT DETAILS

    //NFT IMAGE
    var form = new formidable.IncomingForm();

   form.parse(req, function (err, fields, files) {
    console.log(fields)
        var oldpath = files.nft.filepath;

       var newpath = files.nft.originalFilename
     

        fs.readFile(oldpath, function (err, data) {
            if (err) throw err;
            console.log('File read!');

            // Write the file
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;

                console.log('File written!');

                const readableStreamForFile = fs.createReadStream('./'+newpath);
  
                pinata.pinFileToIPFS(readableStreamForFile).then((result) => {
                    //handle results here
                    console.log(result);
            
                    var obj = {
                        table: []
                     };
                
                     obj.table.push({id: 1, image:"https://gateway.pinata.cloud/ipfs/"+result.IpfsHash});
            
                     var json = JSON.stringify(obj);
            
                     fs.writeFile('myjsonfile.json', json, 'utf8', (err)=>{
                        if(err) throw err;
            
                        const readableStreamForFile = fs.createReadStream('./myjsonfile.json');
            
                        pinata.pinFileToIPFS(readableStreamForFile).then((result) => {
                            //handle results here
                            console.log(result);
            
                            res.json({ data: result.IpfsHash})
                        }).catch((err) => {
                            //handle error here
                            console.log(err);
                        });
            
                     });
            
            
            
            
            
                }).catch((err) => {
                    //handle error here
                    console.log(err);
                });
                 
            
                });


            });

            // Delete the file
            fs.unlink(oldpath, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        });

      
 
    



 

})

app.use("/", (req, res) => {



    res.send("Hello")

})




app.listen(3001);