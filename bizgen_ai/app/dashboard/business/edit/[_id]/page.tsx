"use client";
import React from "react";
import { useBusiness } from "@/context/business";


export default function BusinessEditPage() {
   const { business } = useBusiness();

   return (
    <div>
       <pre>{JSON.stringify(business, null, 4)}</pre>
    </div>
   );
}
