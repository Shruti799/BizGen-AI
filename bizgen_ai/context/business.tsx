"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from
"react";
import { BusinessState } from "@/utils/types/business";
import { useClerk, useUser } from "@clerk/nextjs";

// default state
const initialState: BusinessState = {
    _id: "",
    userEmail: "",
    name: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    hours: "",
    logo: "",
    abn: "",
    slug: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
   };

// context value type
interface BusinessContextType {
  business: BusinessState;
  setBusiness: React.Dispatch<React.SetStateAction<BusinessState>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

// create context
const BusinessContext = createContext < BusinessContextType | undefined > (undefined);
// create provider component
export const BusinessProvider: React.FC<{ children: ReactNode }> = ({
 children,
}) => {
 const [business, setBusiness] = useState<BusinessState>(initialState);
 const [loading, setLoading] = useState(false);

 // hooks
 const { openSignIn } = useClerk();
 const { isSignedIn } = useUser();

 useEffect(() => {
    const savedBusiness = localStorage.getItem("business");
    if (savedBusiness) {
      setBusiness(JSON.parse(savedBusiness));
    }
 }, []);

 const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "logo" && files && files[0]) {
        console.log("uploaded");
      //await handleLogo(files, name);
    } else {
      setBusiness((prevBusiness: BusinessState) => {
        const updatedBusiness = { ...prevBusiness, [name]: value };

        // save to local storage
        localStorage.setItem("business", JSON.stringify(updatedBusiness));

        return updatedBusiness;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(business);

    if (!isSignedIn) {
      openSignIn();
      return;
    } else {
      try {
        setLoading(true);
        //const savedBusiness = await saveBusinessToDb(business);
        //setBusiness(savedBusiness);
        // clear local storage
        localStorage.removeItem("business");
        // nofity user
       // toast.success("🎉 Business saved successfully");
        // redirec to edit page
       // router.push(`/dashboard/business/edit/${savedBusiness._id}`);
      } catch (err: any) {
        console.error(err);
       // toast.error("❌ Failed to save business");
      } finally {
        setLoading(false);
      }
    }
  };

  
 return (
 <BusinessContext.Provider
 value={{ business, setBusiness, loading, setLoading, handleChange, handleSubmit, }}
 >
 {children}
 </BusinessContext.Provider>
 );
};


export const useBusiness = (): BusinessContextType => {
    const context = useContext(BusinessContext);
    if (context === undefined) {
    throw new Error("useBusiness must be used within a BusinessProvider");
    }
    return context;
};