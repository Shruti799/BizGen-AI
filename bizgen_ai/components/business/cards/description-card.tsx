"use client";
import React from "react";
import dynamic from "next/dynamic";
import { BusinessState } from "@/utils/types/business";
import "react-quill-new/dist/quill.bubble.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function DescriptionCard({
  business,
}: {
  business: BusinessState;
}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="text-sm mb-4">
        {business?.description && (
          <div dangerouslySetInnerHTML={{ __html: business.description }} />
        )}
      </div>
    );
  }

  return (
    <div className="m-5 mb-10">
      <ReactQuill
        value={business?.description || ""}
        readOnly={true}
        theme="bubble"
      />
    </div>
  );
}
