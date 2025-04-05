import { getAllBusinessesFromDb } from "@/actions/business";
import { BusinessState } from "@/utils/types/business";
import Link from "next/link";
import Pagination from "@/components/nav/pagination";
import CategoryAddressCard from "@/components/business/cards/category-address-card";
import Image from "next/image";
import { Settings } from "lucide-react";

interface BusinessesPageProps {
  searchParams: { page?: number };
}

export default async function AdminDashboard({
  searchParams,
}: BusinessesPageProps) {
  const page = searchParams?.page
    ? parseInt(searchParams.page as unknown as string, 10)
    : 1;
  const limit = 12;

  const { businesses, totalCount } = await getAllBusinessesFromDb(page, limit);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-1 text-center">Businesses</h1>
      </div>

      {/* display businesses in a table for admin to manage */}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              <th className="border px-4 py-2">Logo</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Slug</th>
              <th className="border px-4 py-2">Edit</th>
            </tr>
          </thead>

          <tbody>
            {businesses.map((business: BusinessState) => (
              <tr
                key={business._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <td className="border px-4 py-2">
                  <Image
                    src={business.logo || "/logo.svg"}
                    alt={business.name}
                    width={50}
                    height={50}
                  />
                </td>
                <td className="border px-4 py-2">{business.category}</td>
                <td className="border px-4 py-2">{business.name}</td>
                <td className="border px-4 py-2">{business.slug}</td>
                <td className="border px-4 py-2">
                  <Link href={`/dashboard/business/edit/${business._id}`}>
                    <Settings />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} />

      <div className="mt-8">
        <CategoryAddressCard />
      </div>
    </div>
  );
}
