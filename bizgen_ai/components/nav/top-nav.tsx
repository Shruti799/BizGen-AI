import React from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import ModeToggle from "@/components/nav/mode-toggle";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Plus,
  LogIn,
  ShieldCheck,
  Handshake,
} from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { Toaster } from "react-hot-toast";
import AddBusinessButton from "@/components/buttons/add-business-button";
import SearchButton from "@/components/buttons/search-button";

export default async function TopNav() {
  // hooks
   const user = await currentUser();
   const isAdmin = user?.privateMetadata?.role === "admin";

  return (
    <>
      <Menubar>
        <div className="flex-none">
          <MenubarMenu>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                width={30}
                height={30}
                className="hover:cursor-pointer"
              />
            </Link>
          </MenubarMenu>
        </div>

        <div className="hidden md:flex flex-grow justify-center px-4 max-w-3xl">
          <SearchButton />
        </div>

        <div className="flex flex-grow items-center justify-end gap-1">
          <MenubarMenu>
            <MenubarTrigger className="text-base font-normal">
              <Link href="/businesses">
                <span className="flex items-center">
                  <Handshake size={16} className="mr-2" />
                  <span>Businesses</span>
                </span>
              </Link>
            </MenubarTrigger>
          </MenubarMenu>

          <AddBusinessButton /> 

          {user && (
            <MenubarMenu>
              <MenubarTrigger className="text-base font-normal">
                <Link href="/dashboard">
                  <span className="flex items-center">
                    <LayoutDashboard size={16} className="mr-2" />
                    <span>Dashboard</span>
                  </span>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          )} 

          {isAdmin && (
            <MenubarMenu>
              <MenubarTrigger className="text-base font-normal">
                <Link href="/dashboard/admin">
                  <span className="flex items-center">
                    <ShieldCheck size={16} className="mr-2" />
                    <span>Admin</span>
                  </span>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          )}

          <SignedOut>
            <span className="flex items-center">
              <LogIn size={16} className="mr-2" />
              <SignInButton />
            </span>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn> 

          <MenubarMenu>
            <ModeToggle />
          </MenubarMenu>
        </div>

        <Toaster />
      </Menubar>

      {/* search for mobile screens */}
      <div className="md:hidden w-full flex justify-center px-4 my-1">
        <SearchButton />
      </div>
    </>
  );
}
