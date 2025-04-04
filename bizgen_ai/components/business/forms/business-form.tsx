"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BusinessState } from "@/utils/types/business";
import { useBusiness } from "@/context/business";
import PreviewCard from "@/components/business/preview/preview-card";
import { Loader2Icon, Send, Brain } from "lucide-react";

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
      loading,
      logoUploading,
      generateBusinessDescription,
      generateDescriptionLoading,
      isEditPage,
      updateBusiness,
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
         value={
            item.name === "logo"
              ? ""
              : ((business[item.name as keyof BusinessState] || "") as
                  | string
                  | number)
          }
         accept={item.accept}
       />
         {logoUploading && item.name === "logo" && (
             <div className="absolute inset-0 flex items-center justify-center
               bg-opacity-50 bg-white">
             <Loader2Icon className="animate-spin" size={32} />
             </div>
         )}

      </div>
      ))}

      <div className="flex justify-between items-center w-full">
         <Button
           variant="destructive"
           onClick={generateBusinessDescription}
           className="my-5 bg-red-600 hover:bg-red-700 transition duration-300"
           disabled={
             !business?.name ||
             !business?.category ||
             generateDescriptionLoading
           }
         >
           {generateDescriptionLoading ? (
             <Loader2Icon className="animate-spin mr-2" />
           ) : (
             <Brain className="mr-2" />
           )}{" "}
           Generate description with AI
         </Button>


         <Button onClick={isEditPage ? updateBusiness : handleSubmit} type="submit" className="my-5"
         disabled={
            !business?.name ||
            !business?.category ||
            !business?.address ||
            loading ||
            generateDescriptionLoading
           }
         >
         {loading ? (
                 <Loader2Icon className="animate-spin mr-2" />
               ) : (
                 <Send className="mr-2" />
         )}{" "}
         Submit
         </Button>
      </div>
   </div>
</div>
);
}
       
     