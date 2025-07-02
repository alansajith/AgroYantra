"use client";

import { useState } from "react";
import {
  CloudSun,
  MapPin,
  Calendar,
  Search,
  Droplets,
  Wind,
  Sun,
  Sunrise,
  Sunset,
  Thermometer,
  Info,
  CloudRain,
  Cloud,
  Snowflake,
} from "lucide-react";
import { Geist, Roboto_Slab, Pacifico } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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

const mockWeather = {
  location: "Bangalore, India",
  date: new Date().toLocaleDateString(),
  temperature: 28,
  condition: "Partly Cloudy",
  icon: <CloudSun className="h-12 w-12 text-yellow-400" />,
  humidity: 68,
  wind: 12,
  sunrise: "6:10 AM",
  sunset: "6:45 PM",
  forecast: [
    {
      day: "Mon",
      icon: <CloudSun className="text-yellow-400" />,
      temp: 28,
      desc: "Partly Cloudy",
    },
    {
      day: "Tue",
      icon: <CloudRain className="text-blue-400" />,
      temp: 25,
      desc: "Showers",
    },
    {
      day: "Wed",
      icon: <Cloud className="text-gray-400" />,
      temp: 26,
      desc: "Cloudy",
    },
    {
      day: "Thu",
      icon: <Sun className="text-yellow-400" />,
      temp: 30,
      desc: "Sunny",
    },
    {
      day: "Fri",
      icon: <Snowflake className="text-blue-300" />,
      temp: 22,
      desc: "Cool",
    },
  ],
};

const weatherTips = [
  {
    icon: <Droplets className="h-6 w-6 text-blue-500" />,
    title: "Irrigation Planning",
    desc: "Adjust your irrigation schedule based on rainfall and humidity forecasts.",
  },
  {
    icon: <Wind className="h-6 w-6 text-cyan-600" />,
    title: "Wind Alerts",
    desc: "Secure lightweight structures and avoid spraying pesticides on windy days.",
  },
  {
    icon: <Sun className="h-6 w-6 text-yellow-500" />,
    title: "Sunlight Management",
    desc: "Plan sowing and harvesting for days with optimal sunlight.",
  },
  {
    icon: <CloudRain className="h-6 w-6 text-blue-400" />,
    title: "Rain Protection",
    desc: "Protect crops from heavy rain with proper drainage and cover.",
  },
];

function WeatherSearch({
  onSearch,
}: {
  onSearch: (loc: string, date: string) => void;
}) {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  return (
    <Card className="bg-white/80 rounded-xl shadow-lg border border-green-100 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black font-[var(--font-geist-sans)]">
          <Search className="h-5 w-5" /> Weather Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Location
            </label>
            <Input
              placeholder="Enter location (e.g. Bangalore)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Date
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <Button
          className="w-full mt-2"
          onClick={() => onSearch(location, date)}
          disabled={!location}
        >
          <Search className="h-4 w-4 mr-2" /> Get Weather
        </Button>
      </CardContent>
    </Card>
  );
}

function WeatherDetails({ weather }: { weather: typeof mockWeather }) {
  return (
    <Card className="bg-white/80 rounded-xl shadow-lg border border-green-100 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black font-[var(--font-geist-sans)]">
          <CloudSun className="h-7 w-7 text-yellow-400" /> Current Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            {weather.icon}
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              {weather.temperature}&deg;C
            </div>
            <div className="text-lg text-gray-700 dark:text-gray-200 font-[var(--font-geist-sans)]">
              {weather.condition}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {weather.location}
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar className="h-4 w-4" /> {weather.date}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <span className="text-sm">Humidity:</span>
              <span className="font-semibold">{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-cyan-600" />
              <span className="text-sm">Wind:</span>
              <span className="font-semibold">{weather.wind} km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <Sunrise className="h-5 w-5 text-orange-400" />
              <span className="text-sm">Sunrise:</span>
              <span className="font-semibold">{weather.sunrise}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sunset className="h-5 w-5 text-pink-500" />
              <span className="text-sm">Sunset:</span>
              <span className="font-semibold">{weather.sunset}</span>
            </div>
          </div>
        </div>
        {/* Forecast */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-blue-400" /> 5-Day Forecast
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {weather.forecast.map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 min-w-[90px]"
              >
                <div className="text-lg font-semibold mb-1">{f.day}</div>
                <div className="mb-1">{f.icon}</div>
                <div className="text-xl font-bold">{f.temp}&deg;C</div>
                <div className="text-xs text-gray-600 dark:text-gray-300 text-center">
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function WeatherTips() {
  return (
    <Card className="bg-white/80 rounded-xl shadow-lg border border-green-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black font-[var(--font-geist-sans)]">
          <Info className="h-5 w-5 text-blue-500" /> Weather Tips for Farmers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-6">
          {weatherTips.map((tip, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            >
              {tip.icon}
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  {tip.title}
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function WeatherPage() {
  const [weather, setWeather] = useState(mockWeather);
  // In a real app, fetch weather data based on location/date
  const handleSearch = (loc: string, date: string) => {
    // For now, just update location and date in mock
    setWeather({
      ...mockWeather,
      location: loc || mockWeather.location,
      date: date || mockWeather.date,
    });
  };
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 ${geist.variable} ${robotoSlab.variable} ${pacifico.variable}`}
    >
      {/* Hero/Header Section */}
      <div className="relative overflow-hidden pt-8 pb-4">
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
            <CloudSun className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-center font-[var(--font-pacifico)] bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 bg-clip-text text-transparent drop-shadow-lg mb-2">
          Weather Forecast
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-6 font-[var(--font-roboto-slab)] flex items-center justify-center gap-2">
          <Info className="size-5 text-blue-500" />
          Get real-time weather updates and plan your farming activities for
          better yield.
        </p>
      </div>
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 pb-16 space-y-6">
        <WeatherSearch onSearch={handleSearch} />
        <WeatherDetails weather={weather} />
        <WeatherTips />
      </div>
      <footer className="mt-8 mb-4 text-gray-500 text-sm text-center font-[var(--font-geist-sans)]">
        &copy; {new Date().getFullYear()} AgroYantra. Cultivating the Future.
      </footer>
    </div>
  );
}
