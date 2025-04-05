import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme";
import TopNav from "@/components/nav/top-nav";
import { ClerkProvider } from "@clerk/nextjs";
import { BusinessProvider } from "@/context/business";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BizGen-AI",
  description: "Free for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
       <html lang="en" suppressHydrationWarning>
         <body
           className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
          <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
             >
            
            <div className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-10 transition-opacity duration-300" style={{
              backgroundImage: 'url("/backgroundimage.jpg")',
            }} />


            <BusinessProvider>
              <header className="fixed top-0 left-0 right-0 z-50 opacity-90">
                <TopNav />
              </header>
              <main className="mt-20 md:mt-10 relative">{children}</main>
            </BusinessProvider>

           </ThemeProvider>
         </body>
       </html>
    </ClerkProvider>
  );
}

// https://frontend.instafocus.in/posts/67c36094af997fc7a21916ec