"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BusinessState } from "@/utils/types/business";
import { useBusiness } from "@/context/business";
import PreviewCard from "@/components/business/preview/preview-card";


// input fields type
interface InputField {
   name: string;
   label: string;
   //placeholder: string;
   type: string;
   required?: boolean;
   accept?: string;
}


// input fields
const inputFields: InputField[] = [
   {
      name: "name",
      label: "Business name",
      type: "text",
      required: true,
   },
   {
      name: "category",
      label: "Category* (e.g. Construction, Cafe, etc)",
      type: "text",
      required: true,
   },
   {
      name: "address",
      label: "Business address",
      type: "text",
      required: true,
   },
   {  name: "phone", label: "Phone", type: "tel" },
   {  name: "email", label: "Email", type: "email" },
   {  name: "website", label: "Website URL", type: "url" },
   {
      name: "hours",
      label: "Opening Hours (e.g. Mon-Fri 9am-5pm)",
      type: "text",
   },
   {
      name: "abn",
      label: "ABN",
      type: "number",
   },
   {
      name: "logo",
      label: "Logo (Upload square image)",
      type: "file",
      accept: "image/*",
   },
];

export default function AddBusinessPage() {
   const {
      business,
      handleChange,
      handleSubmit,
    } = useBusiness();

   return (
      <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex flex-col lg:w-1/2 p-4 lg:order-last lg:flex
     lg:justify-center lg:items-center overflow-y-auto min-h-[354px]">
          <PreviewCard business={business} />
      </div>
      <div className="flex flex-col lg:w-1/2 p-4 lg:order-first lg:flex
      overflow-y-auto">
      <h1>
      List your business for free and reach out to millions of
     customers
      </h1>
      {inputFields.map((item, index) => (
      <div key={index} className="my-2 w-full">
      <label className="text-xs">{item.label}</label>
      <Input
      name={item.name}
      type={item.type}
      required={item.required}
      onChange={handleChange}
      value={((business[item.name as keyof BusinessState] || "") as
              | string
              | number)
            }
       />
      </div>
      ))}
      <Button onClick={handleSubmit} type="submit" className="my-5">
      Submit
      </Button>
      </div>
      </div>
      );
   }
       
     
  
