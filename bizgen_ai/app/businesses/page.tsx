import { getLatestBusinessesFromDb } from "@/actions/business";
import { BusinessState } from "@/utils/types/business";
import Link from "next/link";
import BusinessCard from "@/components/business/cards/business-card";
import BusinessPagination from "@/components/nav/pagination";
import CategoryAddressCard from "@/components/business/cards/category-address-card";

export const metadata = {
  title: "Local businesses directory",
  description: "Find local businesses in your area",
};

// interface BusinessesPageProps {
//   searchParams: { page?: number };
// }


export default async function Home({searchParams}: {
  searchParams: Promise<{ page?: string }>;
}){

  const { page: pageParam } = await searchParams;

  // '10' ensures the string is parsed as a decimal number
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const limit = 3;
  const { businesses, totalCount } = await getLatestBusinessesFromDb(
  page,
  limit
  );

  const totalPages = Math.ceil(totalCount / limit);
  
  return (
    <div>
      {/* <p className="text-center my-5">
        {businesses.length} businesses on this page / total {totalCount}{""}
        business / total page {totalPages}
      </p> */}
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5 text-center">
        Recently added businesses
      </h1>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {/* {businesses.map((business: BusinessState) => (
        <Link key={business._id} href={`/business/${business.slug}`}>
          <div className="transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <PreviewCard business={business} />
          </div>
        </Link>
      ))} */}
      {businesses?.length > 0 ? (
        businesses.map((business: BusinessState) => (
        <Link key={business._id} href={`/business/${business.slug}`} legacyBehavior>
          <a className="transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <BusinessCard business={business} />
          </a>
        </Link>
      ))
    ) : (
      <p>Loading businesses...</p>
     )}
    </div>
  </div>

  <div className="flex justify-center mt-5">
   <BusinessPagination page={page} totalPages={totalPages} />
  </div>;

  <div className="mt-8">
    <CategoryAddressCard />
  </div>


 </div>
  );
}