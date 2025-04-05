import React from "react";
import { getUniqueCategoriesAndAddresses } from "@/actions/business";
import FilteredList from "@/components/search/filtered-list";
import { LayoutList, MapPinHouse } from "lucide-react";

export default async function CategoryAddressCard() {
  const { uniqueCategories, uniqueAddresses } =
    await getUniqueCategoriesAndAddresses();

  // ensure uniqueCategories and uniqueAddresses are arrays
  const categories = Array.isArray(uniqueCategories) ? uniqueCategories : [];
  const addresses = Array.isArray(uniqueAddresses) ? uniqueAddresses : [];

  return (
    <aside className="pb-10 mt-5 relative">
      <div className="m-5 space-y-6">
        <FilteredList
          data={categories}
          title="Categories"
          icon={<LayoutList />}
        />

        <FilteredList
          data={addresses}
          title="Addresses"
          icon={<MapPinHouse />}
        />
      </div>
    </aside>
  );
}
