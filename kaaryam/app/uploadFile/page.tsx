'use client'
import React, {useState} from "react";
import lighthouse from "@lighthouse-web3/sdk";

function UploadFile() {
    const [file, setFile] = useState<File | null>(null);

    const progressCallback = (progressData) => {
        let percentageDone: any = 100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log('Progress:', percentageDone);   

    };
    const getFileInfo = async() => {
        const cid = "bafkreia7ksyz2begn7dobz74j4h7wpv2n4ccnwp7r3f5tnnsgdkinkfyfi"
        const fileInfo = await lighthouse.getFileInfo(cid);
        console.log('File Info:', fileInfo);
    }
    const uploadFile = async() => {
        if(!file) {
            console.log("No file selected");
            return;
        }
        try {
            const output = await lighthouse.upload([file],'d75b7d73.4a1d570cc24749c58280aa276f87c90f', null,  progressCallback);
            console.log('Output:', output);

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };

      return (
        <div className="App">
          <input onChange={handleFileChange} type="file" />
          <button onClick={uploadFile}>Upload to Lighthouse</button>
            <button onClick={getFileInfo}>Get File Info</button>
        </div>
      );
}

export default UploadFile;