"use client";

import { useState } from "react";
import {
  Sprout,
  Droplets,
  Thermometer,
  MapPin,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const soilTips = [
  {
    icon: <Sprout className="h-6 w-6 text-green-600" />,
    title: "Add Organic Matter",
    desc: "Incorporate compost or manure to improve soil fertility and structure.",
  },
  {
    icon: <Droplets className="h-6 w-6 text-blue-500" />,
    title: "Maintain Moisture",
    desc: "Mulch your soil to retain moisture and reduce evaporation.",
  },
  {
    icon: <Thermometer className="h-6 w-6 text-orange-500" />,
    title: "Monitor Temperature",
    desc: "Keep an eye on soil temperature for optimal plant growth.",
  },
];

export default function SoilManagementPage() {
  const [location, setLocation] = useState("");
  const [soilType, setSoilType] = useState("");
  const [ph, setPh] = useState("");
  const [moisture, setMoisture] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("/api/soil-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, soilType, ph, moisture }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setResult(data.tips);
    } catch (err: any) {
      setError(err.message || "Failed to analyze soil.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-yellow-600/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 pt-8 pb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Sprout className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Soil Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Analyze and improve your soil health for better crop yields. Get
            actionable tips and recommendations tailored to your field.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16 grid md:grid-cols-3 gap-8 mt-4 items-start">
        {/* Soil Analysis Form */}
        <div className="md:col-span-1 h-full">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" /> Soil Analysis
              </CardTitle>
              <CardDescription>
                Enter your soil details to get a quick health check and tips.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Location
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north-india">North India</SelectItem>
                    <SelectItem value="south-india">South India</SelectItem>
                    <SelectItem value="east-india">East India</SelectItem>
                    <SelectItem value="west-india">West India</SelectItem>
                    <SelectItem value="central-india">Central India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Sprout className="h-4 w-4" /> Soil Type
                </label>
                <Select value={soilType} onValueChange={setSoilType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="loamy">Loamy</SelectItem>
                    <SelectItem value="peaty">Peaty</SelectItem>
                    <SelectItem value="silty">Silty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Droplets className="h-4 w-4" /> Moisture (%)
                </label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="e.g. 40"
                  value={moisture}
                  onChange={(e) => setMoisture(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Thermometer className="h-4 w-4" /> pH Level
                </label>
                <Input
                  type="number"
                  min={0}
                  max={14}
                  step={0.1}
                  placeholder="e.g. 6.5"
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                />
              </div>
              <Button
                className="w-full mt-2"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Soil"}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Result */}
          {error && (
            <Card className="mt-6 border-2 border-red-400">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Error
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-red-700 dark:text-red-300">{error}</div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Soil Health Tips */}
        <div className="md:col-span-2 h-full grid">
          <h2 className="text-2xl font-semibold  flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" /> Soil Health Tips
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 mt-2">
            {Array.isArray(result) && result.length > 0
              ? result.map((tip, idx) => (
                  <Card key={idx} className="flex flex-col h-full">
                    <CardHeader className="flex flex-row items-center ">
                      <Sprout className="h-6 w-6 text-green-600" />
                      <CardTitle className="text-lg">Tip {idx + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 text-gray-700 dark:text-gray-200">
                      {tip}
                    </CardContent>
                  </Card>
                ))
              : soilTips.map((tip, idx) => (
                  <Card key={idx} className="flex flex-col h-full">
                    <CardHeader className="flex flex-row items-center  ">
                      {tip.icon}
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 text-gray-700 dark:text-gray-200">
                      {tip.desc}
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </div>
      <footer className="mt-8 mb-4 text-gray-500 text-sm text-center font-[var(--font-geist-sans)]">
        &copy; {new Date().getFullYear()} AgroYantra. Cultivating the Future.
      </footer>
    </div>
  );
}
