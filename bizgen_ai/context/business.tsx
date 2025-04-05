"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from
"react";
import { BusinessState } from "@/utils/types/business";
import { useClerk, useUser } from "@clerk/nextjs";
import {
    saveBusinessToDb,
    getUserBusinessesFromDb,
    getBusinessFromDb,
    updateBusinessInDb,
    togglePublishdInDb,
    deleteBusinessFromDb,
  } from "@/actions/business";
import { aiGenerateBusinessDescription } from "@/actions/ai";
import { handleLogoAction } from "@/actions/cloudinary";
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
  initialState: BusinessState;
  logoUploading: boolean;
  generateBusinessDescription: () => void;
  generateDescriptionLoading: boolean;
  updateBusiness: () => void;
  isEditPage: boolean;
  openDescriptionModal: boolean;
  setOpenDescriptionModal: React.Dispatch<React.SetStateAction<boolean>>;
  isDashboardPage: boolean;
  togglePublished: () => void;
  deleteBusiness: () => void;
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
 const [logoUploading, setLogoUploading] = useState<boolean>(false);
 const [generateDescriptionLoading, setGenerateDescriptionLoading] = useState<boolean>(false);

 // modal state
 const [openDescriptionModal, setOpenDescriptionModal] = useState<boolean>(false);


 // hooks
 const { openSignIn } = useClerk();
 const { isSignedIn } = useUser();
 const router = useRouter();
 const pathname = usePathname();

 const isDashboardPage = pathname === "/dashboard";
 const isEditPage = pathname.includes("/edit");
 const  {_id}  = useParams();

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
        await handleLogo(files, name);
    } else {
      setBusiness((prevBusiness: BusinessState) => {
        const updatedBusiness = { ...prevBusiness, [name]: value };

        // save to local storage
        localStorage.setItem("business", JSON.stringify(updatedBusiness));

        return updatedBusiness;
      });
    }
  };

   const handleLogo = async (files: FileList, name: string) => {
      const file = files[0];
      setLogoUploading(true);
  
      // convert image to base64
      const reader = new FileReader();
  
      return new Promise<void>((resolve, reject) => {
        reader.onloadend = async () => {
          const base64Image = reader.result as string;
  
          try {
            const imageUrl = await handleLogoAction(base64Image);
  
            if (imageUrl) {
              setBusiness((prevBusiness) => {
                const updatedBusiness = { ...prevBusiness, [name]: imageUrl };
  
                // save to local storage
                localStorage.setItem("business", JSON.stringify(updatedBusiness));
  
                return updatedBusiness;
              });
  
              resolve();
            } else {
              toast.error("❌ Failed to upload logo");
            }
          } catch (err: any) {
            console.error(err);
            toast.error("❌ Failed to upload logo");
          } finally {
            setLogoUploading(false);
          }
        };
  
        reader.onerror = (error) => {
          toast.error("❌ Failed to upload image");
          reject(error);
        };
  
        reader.readAsDataURL(file);
      });
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
        const business = await getBusinessFromDb((_id as string).toString());
        setBusiness(business);
      } catch (err: any) {
        console.error(err);
        toast.error("❌ Failed to fetch business");
      }
  };


  const generateBusinessDescription = async () => {
      setGenerateDescriptionLoading(true);
  
      const { createdAt, updatedAt, __v, ...businessForAi } = business;
      business.description = ""; // clear description
  
      try {
        const description = await aiGenerateBusinessDescription(businessForAi);
        setBusiness((prevBusiness: BusinessState) => {
          const updatedBusiness = { ...prevBusiness, description };
  
          // save to local storage
          localStorage.setItem("business", JSON.stringify(updatedBusiness));
  
          return updatedBusiness;
        });
        toast.success("🎉 Business description generated by AI");
      } catch (err: any) {
        console.error(err);
        toast.error("❌ Failed to generate business description");
      } finally {
        setGenerateDescriptionLoading(false);
      }
  };


  const updateBusiness = async () => {
    setLoading(true);

    try {
      const updatedBusiness = await updateBusinessInDb(business);
      setBusiness(updatedBusiness);
      // clear local storage
      localStorage.removeItem("business");
      // nofity user
      toast.success("🎉 Business updated successfully");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to update business");
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async () => {
      setLoading(true);
  
      try {
        const updatedBusiness = await togglePublishdInDb((_id as string).toString());
  
        setBusiness((prevBusiness) => ({
          ...prevBusiness,
          published: updatedBusiness.published,
        }));
  
        if (updatedBusiness.published) {
          toast.success("🎉 Business published");
        } else {
          toast.success("🎉 Business unpublished");
        }
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to toggle published");
      } finally {
        setLoading(false);
      }
  };

  const deleteBusiness = async () => {
      setLoading(true);
  
      try {
        await deleteBusinessFromDb((_id as string).toString());
        toast.success("🎉 Business deleted");
        router.push("/dashboard/admin");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete business");
      } finally {
        setLoading(false);
      }
  };
  

  
 return (
 <BusinessContext.Provider
 value={{ business, 
    setBusiness, 
    loading, 
    setLoading, 
    handleChange, 
    handleSubmit, 
    businesses, 
    setBusinesses, 
    initialState, 
    logoUploading, 
    generateBusinessDescription,
    generateDescriptionLoading, 
    updateBusiness, 
    isEditPage, 
    isDashboardPage,
    openDescriptionModal,
    setOpenDescriptionModal,
    togglePublished,
    deleteBusiness,
 }}
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