"use client";

import {
  BarChart3,
  Tractor,
  Leaf,
  CloudSun,
  Users,
  ShieldCheck,
  AlertCircle,
  Info,
  Sprout,
} from "lucide-react";
import { Geist, Roboto_Slab, Pacifico } from "next/font/google";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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

const summaryStats = [
  {
    label: "Crops Managed",
    value: 12,
    icon: <Tractor className="h-7 w-7 text-green-600" />,
    color: "bg-green-50 dark:bg-green-900/30",
  },
  {
    label: "Soil Health Score",
    value: "8.7/10",
    icon: <Sprout className="h-7 w-7 text-lime-600" />,
    color: "bg-lime-50 dark:bg-lime-900/30",
  },
  {
    label: "Weather Alerts",
    value: 2,
    icon: <CloudSun className="h-7 w-7 text-blue-400" />,
    color: "bg-blue-50 dark:bg-blue-900/30",
  },
  {
    label: "Community Posts",
    value: 34,
    icon: <Users className="h-7 w-7 text-blue-600" />,
    color: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    label: "Disease Reports",
    value: 1,
    icon: <ShieldCheck className="h-7 w-7 text-green-700" />,
    color: "bg-green-100 dark:bg-green-900/30",
  },
];

const recentActivity = [
  {
    icon: <Leaf className="h-5 w-5 text-green-600" />,
    text: "Soil analyzed: Loamy, pH 6.8",
  },
  {
    icon: <CloudSun className="h-5 w-5 text-blue-400" />,
    text: "Weather alert: Rain expected tomorrow",
  },
  {
    icon: <Users className="h-5 w-5 text-blue-600" />,
    text: "New post in Community: 'Best irrigation tips?'",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-green-700" />,
    text: "Disease identified: Late Blight",
  },
  {
    icon: <Tractor className="h-5 w-5 text-green-600" />,
    text: "Crop added: Tomatoes",
  },
];

function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {summaryStats.map((stat, idx) => (
        <Card
          key={idx}
          className={`flex flex-row items-center gap-4 p-4 shadow-md border ${stat.color}`}
        >
          <div className="p-3 rounded-full bg-white/80 dark:bg-gray-900/30">
            {stat.icon}
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm font-[var(--font-geist-sans)]">
              {stat.label}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function RecentActivity() {
  return (
    <Card className="bg-white/80 rounded-xl shadow-lg border border-green-100 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black font-[var(--font-geist-sans)]">
          <Info className="h-5 w-5 text-blue-500" /> Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent">
        {recentActivity.map((act, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 text-gray-700 dark:text-gray-200"
          >
            {act.icon}
            <span>{act.text}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function AnalyticsChart() {
  // Simple mock chart using SVG
  return (
    <Card className="bg-white/80 rounded-xl shadow-lg border border-green-100 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black font-[var(--font-geist-sans)]">
          <BarChart3 className="h-5 w-5 text-blue-500" /> Yield Trend (Mock)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <svg viewBox="0 0 200 60" className="w-full h-16">
          <polyline
            fill="none"
            stroke="#22c55e"
            strokeWidth="4"
            points="0,50 30,40 60,35 90,30 120,25 150,20 180,15 200,10"
          />
          <circle cx="200" cy="10" r="4" fill="#22c55e" />
        </svg>
        <div className="text-xs text-gray-500 mt-2">
          Yield is trending up this season!
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardTips() {
  return (
    <Card className="bg-white/80 rounded-xl shadow-lg border border-green-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black font-[var(--font-geist-sans)]">
          <Info className="h-5 w-5 text-blue-500" /> Dashboard Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2 text-blue-900 dark:text-blue-100">
          <li>Monitor your crop and soil stats regularly for best results.</li>
          <li>Check weather alerts to plan your farming activities.</li>
          <li>Engage with the community for tips and support.</li>
          <li>Use analytics to track your farm's progress over time.</li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 ${geist.variable} ${robotoSlab.variable} ${pacifico.variable}`}
    >
      {/* Hero/Header Section */}
      <div className="relative overflow-hidden pt-8 pb-4">
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-center font-[var(--font-pacifico)] bg-gradient-to-r from-blue-600 via-green-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg mb-2">
          Dashboard
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-6 font-[var(--font-roboto-slab)] flex items-center justify-center gap-2">
          <Info className="size-5 text-blue-500" />
          Your farm data, analytics, and recent activity at a glance.
        </p>
      </div>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <SummaryCards />
        <div className="grid md:grid-cols-2 gap-8">
          <RecentActivity />
          <AnalyticsChart />
        </div>
        <div className="mt-8">
          <DashboardTips />
        </div>
      </div>
      <footer className="mt-8 mb-4 text-gray-500 text-sm text-center font-[var(--font-geist-sans)]">
        &copy; {new Date().getFullYear()} AgroYantra. Cultivating the Future.
      </footer>
    </div>
  );
}
