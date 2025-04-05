"use client";
import React from "react";
import throttle from "lodash/throttle";
import { searchBusinessesFromDb } from "@/actions/business";
import BusinessCard from "@/components/business/cards/business-card";
import { BusinessState } from "@/utils/types/business";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// throttle the fetchResults function outside the component
const throttledFetchResults = throttle(
  async (
    query: string,
    setResults: React.Dispatch<React.SetStateAction<BusinessState[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (query) {
      setLoading(true);

      try {
        const data = await searchBusinessesFromDb(query);
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
      setLoading(false);
    }
  },
  1000
);

export default function SearchPage(){
  // state
  const [results, setResults] = React.useState<BusinessState[]>([]);
  const [loading, setLoading] = React.useState(false);


  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const fetchResults = React.useCallback(() => {
      throttledFetchResults(query, setResults, setLoading);
  }, [query]);

  React.useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  React.useEffect(() => {
    // clear the results and loading state if the query is empty
    if (!searchParams.get("query")) {
      setResults([]);
      setLoading(false);
    }
  }, [searchParams.get("query")]);

  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5 text-center">Search Results</h1>
        {loading && searchParams.get("query") && (
          <p className="text-center">Loading...</p>
        )}

        {!loading && searchParams.get("query") && results.length === 0 && (
          <p className="text-center">No results found</p>
        )}

        {results.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((business: BusinessState) => (
              <Link key={business._id} href={`/business/${business.slug}`}>
                <div className="transform transition duration-300 hover:scale-105 hover:shadow-lg">
                  <BusinessCard business={business} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
