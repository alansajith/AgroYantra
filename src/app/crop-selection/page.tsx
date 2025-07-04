"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Thermometer,
  Droplets,
  Sun,
  Leaf,
  Calendar,
  ArrowRight,
  Star,
  Clock,
  TrendingUp,
  Info,
  CheckCircle,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@clerk/nextjs";

interface CropData {
  id: string;
  name: string;
  category: string;
  season: string;
  duration: string;
  yield: string;
  difficulty: string;
  rating: number;
  image: string;
  description: string;
}

export default function CropSelectionPage() {
  const { userId } = useAuth();
  // Use user-specific key if signed in, else fallback to guest
  const LS_KEY = userId
    ? `agroyantra-crop-selection-${userId}`
    : "agroyantra-crop-selection-guest";
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedSoilType, setSelectedSoilType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<CropData[]>([]);
  const [popularCropsAI, setPopularCropsAI] = useState<CropData[]>([]);
  const [weatherAI, setWeatherAI] = useState<{
    temperature: string;
    humidity: string;
    sunlight: string;
  }>({ temperature: "", humidity: "", sunlight: "" });
  const [growingTipsAI, setGrowingTipsAI] = useState<string[]>([]);

  useEffect(() => {
    // On mount, restore state from localStorage if available
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log("Restoring from localStorage", parsed);
        setSelectedLocation(parsed.selectedLocation || "");
        setSelectedSeason(parsed.selectedSeason || "");
        setSelectedSoilType(parsed.selectedSoilType || "");
        setSelectedExperience(parsed.selectedExperience || "");
        setRecommendations(parsed.recommendations || []);
        setPopularCropsAI(parsed.popularCropsAI || []);
        setWeatherAI(
          parsed.weatherAI || { temperature: "", humidity: "", sunlight: "" }
        );
        setGrowingTipsAI(parsed.growingTipsAI || []);
      } catch {}
    }
  }, []);

  const saveToLocalStorage = (data: any) => {
    console.log("Saving to localStorage", data);
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setRecommendations([]);
    setPopularCropsAI([]);
    setWeatherAI({ temperature: "", humidity: "", sunlight: "" });
    setGrowingTipsAI([]);
    try {
      const response = await fetch("/api/crop-selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          soilType: selectedSoilType,
          region: selectedLocation,
          season: selectedSeason,
        }),
      });
      const data = await response.json();
      let newRecommendations: CropData[] = [];
      let newPopularCropsAI: CropData[] = [];
      let newWeatherAI = { temperature: "", humidity: "", sunlight: "" };
      let newGrowingTipsAI: string[] = [];
      // Recommended Crops
      if (Array.isArray(data.recommendedCrops)) {
        newRecommendations = data.recommendedCrops.map(
          (crop: any, idx: number) => ({
            id: `gemini-rec-${idx}`,
            name: crop.name || "",
            category: "Recommended",
            season: selectedSeason,
            duration: crop.duration || "-",
            yield: crop.yield || "-",
            difficulty: "-",
            rating: crop.rating || 0,
            image: "🌱",
            description: "Recommended by AI based on your inputs.",
          })
        );
        setRecommendations(newRecommendations);
      }
      // Popular Crops
      if (Array.isArray(data.popularCrops)) {
        newPopularCropsAI = data.popularCrops.map((crop: any, idx: number) => ({
          id: `gemini-pop-${idx}`,
          name: crop.name || "",
          category: "Popular",
          season: selectedSeason,
          duration: crop.duration || "-",
          yield: crop.yield || "-",
          difficulty: "-",
          rating: crop.rating || 0,
          image: "🌱",
          description: "Popular crop for your region and season.",
        }));
        setPopularCropsAI(newPopularCropsAI);
      }
      // Weather
      if (data.weather) {
        newWeatherAI = {
          temperature: data.weather.temperature || "",
          humidity: data.weather.humidity || "",
          sunlight: data.weather.sunlight || "",
        };
        setWeatherAI(newWeatherAI);
      }
      // Growing Tips
      if (Array.isArray(data.growingTips)) {
        newGrowingTipsAI = data.growingTips;
        setGrowingTipsAI(newGrowingTipsAI);
      }
      // Save to localStorage after successful fetch and state update
      saveToLocalStorage({
        selectedLocation,
        selectedSeason,
        selectedSoilType,
        selectedExperience,
        recommendations: newRecommendations,
        popularCropsAI: newPopularCropsAI,
        weatherAI: newWeatherAI,
        growingTipsAI: newGrowingTipsAI,
      });
    } catch (error) {
      setRecommendations([]);
      setPopularCropsAI([]);
      setWeatherAI({ temperature: "", humidity: "", sunlight: "" });
      setGrowingTipsAI([]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-1">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Smart Crop Selection
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Get AI-powered crop recommendations based on your location,
              climate, and farming experience. Make informed decisions for a
              successful harvest.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-5">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Crop Recommendation Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Crop Analysis
                </CardTitle>
                <CardDescription>
                  Enter your details to get personalized crop recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </label>
                  <Select
                    value={selectedLocation}
                    onValueChange={setSelectedLocation}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north-india">North India</SelectItem>
                      <SelectItem value="south-india">South India</SelectItem>
                      <SelectItem value="east-india">East India</SelectItem>
                      <SelectItem value="west-india">West India</SelectItem>
                      <SelectItem value="central-india">
                        Central India
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Growing Season
                  </label>
                  <Select
                    value={selectedSeason}
                    onValueChange={setSelectedSeason}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select growing season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring">Spring (March-May)</SelectItem>
                      <SelectItem value="summer">
                        Summer (June-August)
                      </SelectItem>
                      <SelectItem value="monsoon">
                        Monsoon (July-September)
                      </SelectItem>
                      <SelectItem value="autumn">
                        Autumn (October-November)
                      </SelectItem>
                      <SelectItem value="winter">
                        Winter (December-February)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Leaf className="h-4 w-4" />
                    Soil Type
                  </label>
                  <Select
                    value={selectedSoilType}
                    onValueChange={setSelectedSoilType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay Soil</SelectItem>
                      <SelectItem value="loamy">Loamy Soil</SelectItem>
                      <SelectItem value="sandy">Sandy Soil</SelectItem>
                      <SelectItem value="silt">Silt Soil</SelectItem>
                      <SelectItem value="black">Black Soil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Experience Level
                  </label>
                  <Select
                    value={selectedExperience}
                    onValueChange={setSelectedExperience}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={
                    !selectedLocation ||
                    !selectedSeason ||
                    !selectedSoilType ||
                    !selectedExperience ||
                    isAnalyzing
                  }
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Get Recommendations
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Climate Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-6 h-6 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  Climate Conditions
                </CardTitle>
                <CardDescription>
                  Current weather and growing conditions for optimal crop
                  selection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Thermometer className="w-6 h-6 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Temperature
                      </p>
                      <p className="font-semibold text-blue-900 dark:text-blue-100">
                        {weatherAI.temperature || "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                    <Droplets className="w-6 h-6 flex-shrink-0 text-cyan-600 dark:text-cyan-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Humidity
                      </p>
                      <p className="font-semibold text-cyan-900 dark:text-cyan-100">
                        {weatherAI.humidity || "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Sun className="w-6 h-6 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sunlight
                      </p>
                      <p className="font-semibold text-yellow-900 dark:text-yellow-100">
                        {weatherAI.sunlight || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations Section */}
            {recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Recommended Crops
                  </CardTitle>
                  <CardDescription>
                    Based on your location and preferences, here are the best
                    crops for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {recommendations.map((crop, index) => (
                      <div
                        key={crop.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="text-4xl">{crop.image}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{crop.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {crop.rating}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {crop.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">
                              {crop.category}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                              {crop.season}
                            </span>
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded-full">
                              {crop.difficulty}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-1">
                            <Clock className="h-4 w-4" />
                            {crop.duration}
                          </div>
                          <div className="text-sm font-medium text-green-600 dark:text-green-400">
                            {crop.yield} Yield
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Popular Crops */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Popular Crops
                </CardTitle>
                <CardDescription>
                  Most commonly grown crops with high success rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularCropsAI.length > 0 ? (
                    popularCropsAI.map((crop) => (
                      <div
                        key={crop.id}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{crop.image}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold">{crop.name}</h3>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                  {crop.rating}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {crop.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {crop.season}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {crop.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No popular crops found for your selection.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tips Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Growing Tips
                </CardTitle>
                <CardDescription>
                  Essential tips for successful crop cultivation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {growingTipsAI.length > 0 ? (
                    growingTipsAI.map((tip, idx) => {
                      // Remove asterisks and leading/trailing whitespace
                      const cleanTip = tip
                        .replace(/\*+/g, "")
                        .replace(/^\s+|\s+$/g, "");
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Lightbulb className="h-5 w-5 text-yellow-500" />
                              <span className="font-semibold text-green-700 dark:text-green-300">
                                Tip {idx + 1}
                              </span>
                            </div>
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                              {cleanTip}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500">
                      No tips found for your selection.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <footer className="mt-8 mb-4 text-gray-500 text-sm text-center font-[var(--font-geist-sans)]">
        &copy; {new Date().getFullYear()} AgroYantra. Cultivating the Future.
      </footer>
    </div>
  );
}
