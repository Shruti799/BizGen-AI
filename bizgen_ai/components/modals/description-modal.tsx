"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBusiness } from "@/context/business";
import { Loader2Icon, Send, Brain } from "lucide-react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";


export default function DescriptionModal() {
  const {
    openDescriptionModal,
    setOpenDescriptionModal,
    business,
    setBusiness,
    generateBusinessDescription,
    generateDescriptionLoading,
  } = useBusiness();

  return (
    <Dialog open={openDescriptionModal} onOpenChange={setOpenDescriptionModal}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Business description</DialogTitle>
          <DialogDescription>
            Make changes to your business description here. Click save when you
            are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <ReactQuill
            theme="snow"
            onChange={(e) => setBusiness({ ...business, description: e })}
            value={business.description}
          />
        </div>
        <DialogFooter>
          <div className="flex justify-between items-center w-full">
            <Button
              variant="destructive"
              onClick={generateBusinessDescription}
              className="my-5"
              disabled={
                !business?.name ||
                !business?.category ||
                generateDescriptionLoading
              }
            >
              {generateDescriptionLoading ? (
                <Loader2Icon className="animate-spin mr-2" />
              ) : (
                <Brain className="mr-2" />
              )}{" "}
              Generate description with AI
            </Button>

            <Button
              type="submit"
              className="my-5"
              onClick={() => setOpenDescriptionModal(false)}
              disabled={
                !business?.name ||
                !business?.category ||
                !business?.address ||
                generateDescriptionLoading
              }
            >
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
