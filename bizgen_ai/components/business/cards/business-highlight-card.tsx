"use client";
import React from "react";
import { BusinessState } from "@/utils/types/business";
import { Clock, Globe, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function BusinessHighlightCard({
  business,
}: {
  business: BusinessState;
}) {
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${field} copied to clipboard!`);
  };

  return (
    <div className="space-y-4 p-4 rounded-lg border shadow-sm">
      <h2 className="text-xl font-bold">{business.name}</h2>
      <span className="text-sm text-muted-foreground">
        Business Information
      </span>

      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() =>
          business.address &&
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              business.address
            )}`,
            "_blank",
            "noopener noreferrer"
          )
        }
      >
        <MapPin size={16} />
        <span className="ml-2">{business.address || "Address"}</span>
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() =>
          business.website &&
          window.open(
            formatUrl(business.website),
            "_blank",
            "noopener noreferrer"
          )
        }
      >
        <Globe size={16} />
        <span className="ml-2">{business.website || "Website"}</span>
      </Button>

      <Button
        onClick={() => handleCopy(business.phone, "Phone")}
        variant="outline"
        className="w-full justify-start"
      >
        <Phone size={16} />
        <span className="ml-2">{business.phone || "Phone"}</span>
      </Button>

      <Button
        onClick={() => handleCopy(business.email, "Email")}
        variant="outline"
        className="w-full justify-start"
      >
        <Mail size={16} />
        <span className="ml-2">{business.email || "Email"}</span>
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() =>
          business.name &&
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              business.name
            )} ${business.address}`,
            "_blank",
            "noopener noreferrer"
          )
        }
      >
        <Clock size={16} />
        <span className="ml-2">{business.hours || "hours"}</span>
      </Button>
    </div>
  );
}

function formatUrl(url: string): string {
  if (!url) return "";
  // Add http:// if missing
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
}