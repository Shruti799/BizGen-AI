"use client";
import React from "react";
//import { useBusiness } from "@/context/business";
//import PreviewCard from "@/components/business/preview/preview-card";
import Link from "next/link";
//import SkeletonCard from "@/components/business/cards/skeleton-card";

export default function Dashboard() {
  //const { businesses } = useBusiness();

//   if (!businesses?.length) {
//     return (
//       <div>
//         <p className="text-center my-5">Loading...</p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
//           <SkeletonCard />
//           <SkeletonCard />
//           <SkeletonCard />
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5 text-center">Dashboard</h1>

      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {businesses.map((business, index) => (
          <Link key={index} href={`/dashboard/business/edit/${business._id}`}>
            <div className="transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <PreviewCard business={business} />
            </div>
          </Link>
        ))}
      </div> */}
    </div>
  );
}
