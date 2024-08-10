import  {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import { ApiError } from './ApiError.js';

          
cloudinary.config({ 
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME , 
  api_key:  process.env.CLOUDINARY_API_KEY , 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const extractPublicId = ( url) => {
    // Example URL: http://res.cloudinary.com/your_cloud_name/image/upload/v1623944876/sample.jpg
    const parts = url.split('/');
 
    const versionAndId = parts.slice(-2).join('.');  // Get 'v1623944876/sample.jpg

    const publicId = versionAndId.split('.').slice(1, -1).join('.'); // Remove file extension1

    return publicId;
  };
 
 
const uploadOnCloudinary = async (fileLocalPath)=>{
    try {
        if(!fileLocalPath) return null;
        //upload on cloudinary
        const res = await cloudinary.uploader.upload(fileLocalPath,{
            resource_type:"auto"
        })
        //file has been uploaded successfully
        console.log("file is uploaded on cloudnary",res.url);

        fs.unlinkSync(fileLocalPath)
        return res;
        
    } catch (error) {
        fs.unlinkSync(fileLocalPath)
        //remove the locally saved temporary file as the upload operation got failed
        return null;
    }

}
const uploadVideoOnCloudinary = async (fileLocalPath)=>{
  try {
    if(!fileLocalPath) return null;

    const res  = await cloudinary.uploader.upload(fileLocalPath,{
      resource_type :'video'
    })
    console.log("file is uploaded on cloudnary",res.url);
    fs.unlinkSync(fileLocalPath)
    return res;
    
  } catch (error) {
    fs.unlinkSync(fileLocalPath)
    //remove the locally saved temporary file as the upload operation got failed
    return null;
  }
}

const deleteFromCloudinary = async (cloudinaryFileUrl) => {
    try {
        const cloudinaryFileId = await extractPublicId(cloudinaryFileUrl)
        
      if (!cloudinaryFileId) throw new ApiError(400, "Cloudinary file ID not provided");
      console.log(cloudinaryFileId);
  
      const result = await cloudinary.uploader.destroy(cloudinaryFileId);
  
      if (result.result === 'not found') {
        throw new Error('not found');
      }
  
      return result;
    } catch (error) {
      if (error.message === 'not found') {
        console.error(`Image not found in Cloudinary: ${cloudinaryFileUrl}`,error);
        return null;  // Return null or handle not found case as needed
      } else {
        throw new ApiError(500, "Error while deleting image from Cloudinary", error);
      }
    }
  };
  


export {uploadOnCloudinary , deleteFromCloudinary,uploadVideoOnCloudinary}