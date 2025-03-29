"use client";
import React, { createContext, useContext, useState, ReactNode } from
"react";
// business state type
interface BusinessState {
 _id: string;
 userEmail: string;
 name: string;
 category: string;
 description: string;
 address: string;
 phone: string;
 email: string;
 website: string;
 hours: string;
 logo: string;
 abn: string;
 slug: string;
 published?: boolean;
 createdAt?: string;
 updatedAt?: string;
 __v?: number;
}

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
}

// create context
const BusinessContext = createContext < BusinessContextType | undefined > (undefined);
// create provider component
export const BusinessProvider: React.FC<{ children: ReactNode }> = ({
 children,
}) => {
 const [business, setBusiness] = useState<BusinessState>(initialState);
 const [loading, setLoading] = useState(false);
 return (
 <BusinessContext.Provider
 value={{ business, setBusiness, loading, setLoading }}
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