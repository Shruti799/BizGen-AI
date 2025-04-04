"use server";
import db from "@/utils/db";
import Business from "@/models/business";
import { currentUser } from "@clerk/nextjs/server";
import { BusinessState } from "@/utils/types/business";
import { nanoid } from "nanoid";
import slugify from "slugify";


const checkOwernship = async (businessId: string) => {
   try {
     await db();
 
     // get the current user
     const user = await currentUser();
     const userEmail = user?.emailAddresses[0]?.emailAddress;
 
     // admin check
     const isAdmin = user?.privateMetadata?.role === "admin";
 
     if (!userEmail) {
       throw new Error("User not found");
     }
 
     // find business by id
     const business = await Business.findById(businessId);
 
     if (!business) {
       throw new Error("Business not found");
     }
 
     // check if the business belongs to the user
     if (business.userEmail !== userEmail) {
       throw new Error("You are not authorized to perform this action");
     }
     return true;
 
     // allow access if the user is an admin or the owner of the business
     if (isAdmin || business.userEmail === userEmail) {
       return true;
     }
   } catch (err: any) {
     throw new Error(err);
   }
};

export const saveBusinessToDb = async (data: BusinessState) => {
    try {
       db();
       const user = await currentUser();
       const userEmail = user?.emailAddresses[0]?.emailAddress;
       const { _id, ...rest } = data;
       const slug = slugify(
       `${rest.category}-${rest.name}-${rest.address}-${nanoid(6)}`
       );

       const business = await Business.create({ ...rest, slug, userEmail });
       
       return JSON.parse(JSON.stringify(business));
    } catch (err: any) {
       throw new Error(err);
    }
};

// server actions
export const getUserBusinessesFromDb = async () => {
   try {
      db();
      const user = await currentUser();
      const userEmail = user?.emailAddresses[0]?.emailAddress;
      const business = await Business.find({ userEmail }).sort({ createdAt:
      -1 });
      return JSON.parse(JSON.stringify(business));
   } catch (err: any) {
      throw new Error(err);
   }
};


export const getBusinessFromDb = async (_id: string) => {
   try{
     await db();
     const business = await Business.findById(_id);
     return JSON.parse(JSON.stringify(business));
   }catch (err: any){
       throw new Error(err);
   }
};


export const updateBusinessInDb = async (data: BusinessState) => {
   try {
     await db();
     const { _id, ...rest } = data;
     // check if the user owns the business
     await checkOwernship(_id);
 
     const business = await Business.findByIdAndUpdate(_id, rest, {
       new: true,
     });
     return JSON.parse(JSON.stringify(business));
   } catch (err: any) {
     throw new Error(err);
   }
};

export const togglePublishdInDb = async (_id: string) => {
  try {
    await db();

    try {
      await checkOwernship(_id);

      const business = await Business.findById(_id);
      if (!business) {
        throw new Error("Business not found");
      }

      business.published = !business.published;
      await business.save();
      return JSON.parse(JSON.stringify(business));
    } catch (err: any) {
      throw new Error(err);
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

export const deleteBusinessFromDb = async (_id: string) => {
  try {
    await db();
    // check if the user owns the business
    await checkOwernship(_id);

    const business = await Business.findByIdAndDelete(_id);
    return JSON.parse(JSON.stringify(business));
  } catch (err: any) {
    throw new Error(err);
  }
};


 
  


