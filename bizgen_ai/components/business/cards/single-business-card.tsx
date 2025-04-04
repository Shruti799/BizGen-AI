import React from "react";
import { MapPin, Phone, Mail, Globe, Clock, ShieldCheck } from "lucide-react";
import { BusinessState } from "@/utils/types/business";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import DescriptionCard from "@/components/business/cards/description-card";

export default function SingleBusinessCard({
  business,
}: {
  business: BusinessState;
}) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <div className="w-16 h-16 relative overflow-hidden rounded-md">
          {business?.logo ? (
            <Image
              src={business?.logo}
              alt={`${business?.name} - ${business?.category}`}
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Logo</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <CardTitle className="text-lg line-clamp-1">
            {business?.name || "Business Name"}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {business?.category || "Category"}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <DescriptionCard business={business} />
      </CardContent>
    </Card>
  );
}
