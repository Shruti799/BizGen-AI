// /app/search/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load the client component to improve performance
const SearchClient = dynamic(() => import("./SearchClient"), { ssr: false });

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center p-4">Loading search...</div>}>
      <SearchClient />
    </Suspense>
  );
}
