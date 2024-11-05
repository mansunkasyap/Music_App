import { v2 as cloudinary } from 'cloudinary'
import fs from 'node:fs';
const uploadOnCloudinary = async (localImagePath) => {
    try {

        cloudinary.config({
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        });
        if(!localImagePath) 
            return null

        const resp = await cloudinary.uploader.upload(localImagePath, {
            resource_type: 'auto'
        })

        if(resp){
            fs.unlinkSync(localImagePath)
            return resp
        }
    }
    catch (err) {
        console.log("From Cloudinary.js : ", err.message);
        fs.unlinkSync(localImagePath)
        return null
    }
}

export { uploadOnCloudinary }