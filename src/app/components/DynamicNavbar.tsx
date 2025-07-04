"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ClientNavWrapper from "./ClientNavWrapper";

const navBgByRoute: Record<string, string> = {
  "/": "bg-white/80",
  "/crop-selection": "bg-green-100/80",
  "/soil-management": "bg-yellow-100/80",
  "/disease-identification": "bg-red-100/80",
  "/weather": "bg-blue-100/80",
  "/community": "bg-purple-100/80",
  "/dashboard": "bg-gray-100/80",
};

export default function DynamicNavbar() {
  const pathname = usePathname();
  // Default to white if not found
  const navBg = navBgByRoute[pathname] || "bg-white/80";

  return (
    <nav className="w-full bg-white/50 backdrop-blur-md  dark:bg-gray-900/60 transition-colors duration-300">
      <div className="w-full mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex flex-1 justify-start">
            <div className="flex items-center space-x-4">
              <Link href="/" className="font-bold text-lg hover:underline">
                Home
              </Link>
              <Link href="/crop-selection" className="hover:underline">
                Crop Selection
              </Link>
              <Link href="/soil-management" className="hover:underline">
                Soil Management
              </Link>
              <Link href="/disease-identification" className="hover:underline">
                Disease Identification
              </Link>
              <Link href="/weather" className="hover:underline">
                Weather
              </Link>
              <Link href="/community" className="hover:underline">
                Community
              </Link>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </div>
          </div>
          <ClientNavWrapper />
        </div>
      </div>
    </nav>
  );
}
