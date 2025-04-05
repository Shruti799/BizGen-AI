import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  MapPin,
  Star,
  PlusCircle,
  Smartphone,
  Share2,
  Link as LinkIcon,
  Cpu,
} from "lucide-react";
import CategoryAddressCard from "@/components/business/cards/category-address-card";
import { FaTwitter } from "react-icons/fa";
 
export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("/backgroundimage.jpg")',
          height: "60vh",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010818] z-0"></div>
 
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4 w-full max-w-4xl">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
             Explore and Elevate Local Businesses with {" "}
              <span className="inline-block">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text animate-pulse">
                  AI
                </span>
              </span>
            </h1>
 
            <p className="text-white mb-5 mx-auto">
              Our Local Business Platform connects you with nearby businesses. 
              Add your listing for free and help others discover the best local spots!
              Connect with your community today!
            </p>
            <Link href="/business/add">
              <Button
                size="lg"
                className="text-lg px-4 md:px-8 py-2 md:py-4 w-full md:w-auto"
              >
                Add Your Business for Free <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
 
      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-20">
            Why Use Our AI-Enhanced Local Business Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<PlusCircle className="w-12 h-12 text-blue-500" />}
              title="Free Business Listings"
              description="List your business for free and boost your online visibility. Connect with more local customers effortlessly."
            />
            <FeatureCard
              icon={<Search className="w-12 h-12 text-green-500" />}
              title="Easy Local Search"
              description="Easily discover businesses near you with our powerful search. Find local services and products in just a few clicks."
            />
            <FeatureCard
              icon={<Star className="w-12 h-12 text-purple-500" />}
              title="Customer Reviews"
              description="Share your experiences by leaving reviews and help others choose wisely. Feedback also helps businesses grow and improve."
            />
          </div>
 
          <div className="mt-20 text-center">
            <Link href="/businesses">
              <Button
                size="lg"
                className="text-lg px-4 md:px-8 py-2 md:py-4 w-full md:w-auto"
              >
                Explore Local Businesses <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
 
      {/* SEO Benefits Section */}
      <section className="bg-sky-100 dark:bg-sky-900 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-20">
            Boost Your Local SEO Instantly
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Cpu className="w-12 h-12 text-blue-500" />}
              title="AI-Generated Content"
              description="Let our AI craft compelling business descriptions in seconds—saving you time and boosting your online visibility."
            />
            <FeatureCard
              icon={<LinkIcon className="w-12 h-12 text-green-500" />}
              title="SEO Boosting Backlinks"
              description="Boost your search engine rankings and online visibility with valuable backlinks to your website."
            />
            <FeatureCard
              icon={<MapPin className="w-12 h-12 text-purple-500" />}
              title="Improved Local Rankings"
              description="Strengthen your local SEO with our optimized listings, making your business more visible in local search results."
            />
          </div>
        </div>
      </section>

      <div className="mt-8">
        <CategoryAddressCard />
      </div>

      <footer className="mt-12 border-t pt-6 flex flex-col items-center bg-gray-50">
        <p className="text-gray-700 text-sm">
          Developed by{" "}
        <a
          href="https://x.com/Shruti_Aug2"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black font-semibold hover:underline"
        >
          Shruti
       </a>
       </p>

       <a
         href="https://x.com/Shruti_Aug2"
         target="_blank"
         rel="noopener noreferrer"
         className="flex items-center space-x-2 text-black font-semibold hover:underline mt-1"
       >
       <FaTwitter className="text-xl" />
       <span>Twitter</span>
      </a>
     </footer>


    </div>
  );
}
 
function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">
        {description}
      </p>
    </div>
  );
}