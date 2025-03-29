"use client";
import React from "react";
import { useBusiness} from "@/context/business";

export default function AddBusinessPage() {

  const {business} = useBusiness();

 return (
    <div className="flex flex-col lg:flex-row h-screen">
    <div className="flex flex-col lg:w-1/2 p-4 lg:order-last lg:flex
    lg:justify-center lg:items-center overflow-y-auto">preview</div>

    <div className="flex flex-col lg:w-1/2 p-4 lg:order-first lg:flex
    lg:justify-center lg:items-start overflow-y-auto">form
    <pre>{JSON.stringify(business,null,4)}</pre>
    </div>

 </div>
 );
}
