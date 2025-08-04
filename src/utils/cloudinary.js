// @ts-nocheck
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) return null;

    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });
    fs.unlink(localfilepath);
    return response;
  } catch (error) {
    fs.unlink(localfilepath);
    return null;
  }
};

export default uploadOnCloudinary;
