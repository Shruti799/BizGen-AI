"use server";
import { v2 as cloudinary } from "cloudinary";


// Configure Cloudinary with environment variables
cloudinary.config({
 cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Handle image upload action
export const handleLogoAction = async (base64Image: string) => {
    try {
       // Upload base64 image to Cloudinary
       const result = await cloudinary.uploader.upload(base64Image, {
       folder: "ai_biz_logos",
       transformation: [
          { width: 300, height: 300, crop: "limit" }, // Image resize
          ],
      });
    return result.secure_url;
    } catch (error) {
       console.error("Error uploading image to Cloudinary:", error);
       return null;
    }
};
   
