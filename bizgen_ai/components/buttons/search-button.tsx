"use client";
import React from "react";
import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SearchButton() {
  // query
  const [query, setQuery] = React.useState("");
  // hooks
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    // get the query from the url and set it as the initial value
    const initialQuery = searchParams.get("query") || "";
    setQuery(initialQuery);
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("search handle chagne value", value);
    setQuery(value);
    replace(`/search?query=${value}`);
  };

  const handleClick = () => {
    replace("/search");
  };

  const sharedStyles: React.CSSProperties = {
    height: "32px",
  };

  const sharedClasses =
    "flex items-center w-full max-w-sm cursor-pointer rounded-full border border-gray-500 dark:border-gray-400 bg-white dark:bg-gray-800 px-2 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none";

  if (pathname.includes("/search")) {
    return (
      <div style={sharedStyles} className={sharedClasses}>
        <Search size={16} className="text-gray-500 dark:text-gray-300" />
        <input
          type="search"
          className="ml-2 w-full bg-transparent border-none focus:outline-none"
          placeholder="Search businesses..."
          value={query}
          onChange={handleChange}
          autoFocus
        />
      </div>
    );
  } else {
    return (
      <button
        onClick={handleClick}
        style={sharedStyles}
        className={sharedClasses}
      >
        <Search size={16} className="text-gray-500 dark:text-gray-300" />
        <span className="ml-2">Search businesses...</span>
      </button>
    );
  }
}
