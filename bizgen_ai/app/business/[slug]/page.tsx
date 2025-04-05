import { getBusinessBySlugFromDb } from "@/actions/business";
import SingleBusinessCard from "@/components/business/cards/single-business-card";
import BusinessHighlightCard from "@/components/business/cards/business-highlight-card";
import CategoryAddressCard from "@/components/business/cards/category-address-card";
import type { Metadata } from "next";

// interface BusinessPageProps {
//   params: {
//     slug: string;
//   };
// }

function stripHtmlAndTruncate(text: string, maxLength: number): string {
    // Remove HTML tags
    const strippedText = text.replace(/(<([^>]+)>)/gi, "");
  
    // Remove line breaks and extra white spaces
    const cleanedText = strippedText.replace(/\s+/g, " ").trim();
  
    // Truncate the text if necessary
    return cleanedText.length > maxLength
      ? cleanedText.substring(0, maxLength) + "..."
      : cleanedText;
  }
  
  export async function generateMetadata({ params }:{ params: { slug: string } }
  ): Promise<Metadata> {
    const business = await getBusinessBySlugFromDb(params.slug);
    const imageUrl = business?.logo || "/logo.png";
    const shortDescription = stripHtmlAndTruncate(business?.description, 160);
  
    return {
      title: `${business?.name} - ${business?.category}`,
      description: shortDescription,
      alternates: {
        canonical: `${process.env.DOMAIN}/business/${params?.slug}`,
      },
      openGraph: {
        title: `${business?.name} - ${business?.category}`,
        description: shortDescription,
        type: "website",
        url: `${process.env.DOMAIN}/business/${params?.slug}`,
        siteName: process.env.APP_NAME,
        images: [
          {
            url: imageUrl,
            alt: `${business?.name} - ${business?.category}`,
            type: "image/jpg",
          },
        ],
      },
    };
  }
  
  export default async function BusinessPage({ params }: { params: { slug: string } }
  ): Promise<Metadata> {
    const business = await getBusinessBySlugFromDb(params.slug);
  
    return (
      <div className="mx-1 md:m-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="order-2 md:order-1 md:col-span-2">
            <SingleBusinessCard business={business} />
          </div>
  
          <div className="order-1 md-order-2 md:col-span-1">
            <BusinessHighlightCard business={business} />
          </div>
        </div>
  
        <div className="mt-8">
          <CategoryAddressCard />
        </div>
      </div>
    );
  }
  
