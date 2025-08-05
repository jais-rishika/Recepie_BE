// @ts-nocheck
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path/posix";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) return null;
    const absolutePath = path.resolve(localfilepath);
    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "auto",
    });
    await fs.promises.unlink(absolutePath);
    return response;
  } catch (error) {
    console.log(error.message);

    await fs.promises.unlink(localfilepath);
    return null;
  }
};

export default uploadOnCloudinary;
