"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from
"react";
import { BusinessState } from "@/utils/types/business";
import { useClerk, useUser } from "@clerk/nextjs";
import {
    saveBusinessToDb,
    getUserBusinessesFromDb,
    getBusinessFromDb,
    // updateBusinessInDb,
    // togglePublishdInDb,
    // deleteBusinessFromDb,
  } from "@/actions/business";
import toast from "react-hot-toast";
import { useRouter, usePathname, useParams } from "next/navigation";

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
  businesses: BusinessState[];
  setBusinesses: React.Dispatch<React.SetStateAction<BusinessState[]>>;
}

// create context
const BusinessContext = createContext < BusinessContextType | undefined > (undefined);
// create provider component
export const BusinessProvider: React.FC<{ children: ReactNode }> = ({
 children,
}) => {
// state
 const [business, setBusiness] = useState<BusinessState>(initialState);
 const [loading, setLoading] = useState(false);
 const [businesses, setBusinesses] = useState<BusinessState[]>([]);

 // hooks
 const { openSignIn } = useClerk();
 const { isSignedIn } = useUser();
 const router = useRouter();
 const pathname = usePathname();

 const isDashboardPage = pathname === "/dashboard";
 const isEditPage = pathname.includes("/edit");
 const _id  = useParams();

 useEffect(() => {
    const savedBusiness = localStorage.getItem("business");
    if (savedBusiness) {
      setBusiness(JSON.parse(savedBusiness));
    }
 }, []);

 useEffect(() => {
     if (isDashboardPage) {
       getUserBusinesses();
     }
 }, [isDashboardPage]);

  useEffect(() => {
     if (_id) {
       getBusiness();
     }
   }, [_id]);

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
        const savedBusiness = await saveBusinessToDb(business);
        setBusiness(savedBusiness);
        // clear local storage
        localStorage.removeItem("business");
        // nofity user
        toast.success("🎉 Business saved successfully");
        // redirec to edit page
        router.push(`/dashboard/business/edit/${savedBusiness._id}`);
      } catch (err: any) {
        console.error(err);
        toast.error("❌ Failed to save business");
      } finally {
        setLoading(false);
      }
    }
  };

  const getUserBusinesses = async () => {
      setLoading(true);
  
      try {
        const businesses = await getUserBusinessesFromDb();
        setBusinesses(businesses);
      } catch (err: any) {
        console.error(err);
        toast.error("❌ Failed to fetch businesses");
      } finally {
        setLoading(false);
      }
  };

  const getBusiness = async () => {
      try {
        const business = await getBusinessFromDb(_id.toString());
        setBusiness(business);
      } catch (err: any) {
        console.error(err);
        toast.error("❌ Failed to fetch business");
      }
  };
  

  
 return (
 <BusinessContext.Provider
 value={{ business, setBusiness, loading, setLoading, handleChange, handleSubmit, businesses, setBusinesses}}
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