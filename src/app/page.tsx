"use client";
import dynamic from "next/dynamic";
import {
  Tractor,
  Leaf,
  CloudSun,
  Users,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { Geist, Roboto_Slab, Pacifico } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Spline 3D Background */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <Spline scene="https://prod.spline.design/NGeLsCQjg3kQIgQo/scene.splinecode" />
      </div>
      <main
        className={`min-h-screen flex flex-col items-center justify-center bg-transparent ${geist.variable} ${robotoSlab.variable} ${pacifico.variable}`}
      >
        <h1 className="text-5xl sm:text-6xl mb-4 bg-gradient-to-r from-green-600 via-blue-500 to-yellow-500 bg-clip-text text-transparent font-[var(--font-pacifico)] drop-shadow-lg p-2">
          AgroYantra
        </h1>
        <p className="text-xl sm:text-2xl mb-8 font-[var(--font-pacifico)] text-white text-center max-w-2xl">
          "Empowering Farmers, Enriching Fields: Your Smart Companion for Modern
          Agriculture!"
        </p>
        <section className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col items-center p-6 bg-white/80 rounded-xl shadow-lg border border-white">
            <Tractor className="text-green-600 mb-2" size={40} />
            <h2 className="text-black text-lg mb-1 font-[var(--font-geist-sans)] ">
              AI-Powered Crop Selection
            </h2>
            <p className="text-gray-600 text-center">
              Get the best crop recommendations tailored to your soil and
              climate using advanced AI.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/80 rounded-xl shadow-lg border border-white">
            <Leaf className="text-green-500 mb-2" size={40} />
            <h2 className="text-lg text-black mb-1 font-[var(--font-geist-sans)]">
              Soil Health Management
            </h2>
            <p className="text-gray-600 text-center">
              Monitor and improve your soil health with actionable insights and
              tips.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/80 rounded-xl shadow-lg border border-white">
            <CloudSun className="text-yellow-500 mb-2" size={40} />
            <h2 className="text-lg text-black mb-1 font-[var(--font-geist-sans)]">
              Weather Forecasting
            </h2>
            <p className="text-gray-600 text-center">
              Plan your farming activities with real-time weather updates and
              alerts.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/80 rounded-xl shadow-lg border border-white">
            <BarChart3 className="text-blue-500 mb-2" size={40} />
            <h2 className="text-lg text-black mb-1 font-[var(--font-geist-sans)]">
              Farm Data Analytics
            </h2>
            <p className="text-gray-600 text-center">
              Visualize your farm data and make informed decisions for higher
              productivity.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/80 rounded-xl shadow-lg border border-white">
            <ShieldCheck className="text-green-700 mb-2" size={40} />
            <h2 className="text-lg text-black mb-1 font-[var(--font-geist-sans)]">
              Disease Identification
            </h2>
            <p className="text-gray-600 text-center">
              Identify crop diseases early and get expert advice for treatment
              and prevention.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/80 rounded-xl shadow-lg border border-white">
            <Users className="text-blue-700 mb-2" size={40} />
            <h2 className="text-lg text-black mb-1 font-[var(--font-geist-sans)]">
              Community & Support
            </h2>
            <p className="text-gray-600 text-center">
              Connect with fellow farmers and experts for support and knowledge
              sharing.
            </p>
          </div>
        </section>
        <footer className="mt-auto mb-4 text-gray-500 text-sm font-[var(--font-geist-sans)]">
          &copy; {new Date().getFullYear()} AgroYantra. Cultivating the Future.
        </footer>
      </main>
    </div>
  );
}
