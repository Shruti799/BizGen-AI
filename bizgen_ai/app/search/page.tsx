import SearchClient from "./SearchClient";
import { Suspense } from "react";


export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center p-4">Loading search...</div>}>
      <SearchClient />
    </Suspense>
  );
}
