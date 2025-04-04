import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[175px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 mx-1 w-[250px]" />
        <Skeleton className="h-4 mx-1 w-[250px]" />
      </div>
    </div>
  );
}