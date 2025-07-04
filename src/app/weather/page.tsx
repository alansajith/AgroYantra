"use client";

import { useState, ReactElement } from "react";
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
  CloudRain,
  Cloud,
  Snowflake,
  Lightbulb,
  Loader2,
} from "lucide-react";
import { Geist, Roboto_Slab, Pacifico } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";

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
  date: new Date().toISOString().slice(0, 10),
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

const PlantMascot = dynamic(() => import("./PlantMascot"), { ssr: false });

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

// WeatherDetails expects weather: WeatherDetailsType
type WeatherDetailsType = {
  location: string;
  temperature: string | number;
  icon: ReactElement;
  humidity: string;
  wind: string | number;
  sunrise: string;
  sunset: string;
  forecast: Array<{
    day: string;
    icon: ReactElement;
    temp: string | number;
    minTemp: string | number;
    precip: string | number;
    wind: string | number;
    humidity: string;
    sunrise: string;
    sunset: string;
  }>;
};

function WeatherDetails({ weather }: { weather: WeatherDetailsType }) {
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
            {/* Removed condition display as it's not used */}
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {weather.location}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <span className="text-sm">Humidity:</span>
              <span className="font-semibold">{weather.humidity}</span>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className="h-5 w-5 text-blue-400" />
              <span className="text-sm">Precipitation:</span>
              <span className="font-semibold">
                {weather.forecast?.[0]?.precip ?? "-"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-cyan-600" />
              <span className="text-sm">Wind:</span>
              <span className="font-semibold">{weather.wind} km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <Sunrise className="h-5 w-5 text-orange-400" />
              <span className="text-sm">Sunrise:</span>
              <span className="font-semibold">
                {formatTime(weather.sunrise)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Sunset className="h-5 w-5 text-pink-500" />
              <span className="text-sm">Sunset:</span>
              <span className="font-semibold">
                {formatTime(weather.sunset)}
              </span>
            </div>
          </div>
        </div>
        {/* Forecast */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-blue-400" /> 5-Day Forecast
          </h3>
          <div className="flex gap-6 overflow-x-auto pb-2">
            {weather.forecast.map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 min-w-[150px] shadow-md border border-blue-100 dark:border-blue-900/40"
                style={{ flex: "0 0 170px" }}
              >
                <div className="text-base font-semibold mb-2 text-gray-800 dark:text-gray-100">
                  {f.day}
                </div>
                <div className="mb-2">{f.icon}</div>
                <div className="text-2xl font-bold mb-2 text-blue-900 dark:text-blue-100">
                  {f.temp}&deg;C
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 text-left w-full">
                  <div>
                    <span className="font-medium">Min:</span> {f.minTemp}°C
                  </div>
                  <div>
                    <span className="font-medium">Precip:</span> {f.precip}mm
                  </div>
                  <div>
                    <span className="font-medium">Wind:</span> {f.wind} km/h
                  </div>
                  <div>
                    <span className="font-medium">Humidity:</span> {f.humidity}
                  </div>
                  <div>
                    <span className="font-medium">Sunrise:</span> {f.sunrise}
                  </div>
                  <div>
                    <span className="font-medium">Sunset:</span> {f.sunset}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function WeatherTips({ tips }: { tips: any }) {
  const tipList = [
    {
      key: "irrigation",
      title: "Irrigation Planning",
      icon: <Droplets className="h-6 w-6 text-blue-500" />,
    },
    {
      key: "wind",
      title: "Wind Alerts",
      icon: <Wind className="h-6 w-6 text-cyan-600" />,
    },
    {
      key: "sunlight",
      title: "Sunlight Management",
      icon: <Sun className="h-6 w-6 text-yellow-500" />,
    },
    {
      key: "rain",
      title: "Rain Protection",
      icon: <CloudRain className="h-6 w-6 text-blue-400" />,
    },
  ];
  return (
    <Card className="bg-white/80 rounded-xl shadow-lg border border-green-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black font-[var(--font-geist-sans)]">
          <Lightbulb className="h-5 w-5 text-yellow-500" /> Weather Tips for
          Farmers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-6">
          {tipList.map((tip, idx) => (
            <div
              key={tip.key}
              className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            >
              {tip.icon}
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  {tip.title}
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {tips[tip.key] || "No tip available."}
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
  const [weather, setWeather] = useState<any>(null);
  const [tips, setTips] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (loc: string, date: string) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setTips(null);
    try {
      const res = await fetch("/api/weather-tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: loc, date }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setWeather(data.weather);
      setTips(data.tips);
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather.");
    } finally {
      setLoading(false);
    }
  };

  // Map Open-Meteo weather codes to mascot conditions
  // See https://open-meteo.com/en/docs#api_form for weathercode meanings
  function getMascotCondition(weather: any): string {
    const code = weather?.weathercode?.[0] ?? weather?.daily?.weathercode?.[0];
    if (code === undefined) return "sunny";
    if ([0, 1].includes(code)) return "sunny"; // Clear, mainly clear
    if ([2, 3, 45, 48].includes(code)) return "cloudy"; // Partly/overcast/fog
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
      return "rainy"; // Drizzle/rain/showers
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "cloudy"; // Snow (use cloudy for now)
    if ([95, 96, 99].includes(code)) return "windy"; // Thunderstorm (use windy for effect)
    return "sunny";
  }
  const mascotCondition = getMascotCondition(weather);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 ${geist.variable} ${robotoSlab.variable} ${pacifico.variable}`}
    >
      {/* Animated Plant Mascots */}
      <PlantMascot condition={mascotCondition} side="left" />
      <PlantMascot condition={mascotCondition} side="right" />
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
          Get real-time weather updates and plan your farming activities for
          better yield.
        </p>
      </div>
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 pb-16 space-y-6">
        <WeatherSearch onSearch={handleSearch} />
        {loading && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="animate-spin h-10 w-10 text-blue-500 mb-3" />
            <span className="text-blue-600 font-medium">
              Loading weather data...
            </span>
          </div>
        )}
        {error && <div className="text-center text-red-600">{error}</div>}
        {weather && (
          <WeatherDetails weather={formatWeatherForDetails(weather)} />
        )}
        {tips && <WeatherTips tips={tips} />}
      </div>
      <footer className="mt-8 mb-4 text-gray-500 text-sm text-center font-[var(--font-geist-sans)]">
        &copy; {new Date().getFullYear()} AgroYantra. Cultivating the Future.
      </footer>
    </div>
  );
}

// Helper to format Open-Meteo API data for WeatherDetails
function formatTime(dateTime: string) {
  // Expects 'YYYY-MM-DDTHH:MM' or 'YYYY-MM-DDTHH:MM:SS'
  if (!dateTime) return "-";
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) return dateTime;
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function formatWeatherForDetails(weather: any) {
  // Use the first day as current weather
  return {
    location:
      weather?.location_name ||
      (weather?.latitude && weather?.longitude
        ? `${weather.latitude.toFixed(2)}, ${weather.longitude.toFixed(2)}`
        : ""),
    date: weather?.daily?.time?.[0] || "",
    temperature: weather?.daily?.temperature_2m_max?.[0] || "-",

    icon: <CloudSun className="h-12 w-12 text-yellow-400" />, // Could be improved with weathercode
    humidity:
      weather?.daily?.relative_humidity_2m_max?.[0] !== undefined &&
      weather?.daily?.relative_humidity_2m_min?.[0] !== undefined
        ? `${weather.daily.relative_humidity_2m_min[0]}% - ${weather.daily.relative_humidity_2m_max[0]}%`
        : "-",
    wind: weather?.daily?.windspeed_10m_max?.[0] || "-",
    sunrise: weather?.daily?.sunrise?.[0] || "-",
    sunset: weather?.daily?.sunset?.[0] || "-",
    forecast: Array.isArray(weather?.daily?.time)
      ? weather.daily.time.map((t: string, i: number) => ({
          day: t,
          icon: <CloudSun className="text-yellow-400" />, // Could be improved with weathercode
          temp: weather.daily.temperature_2m_max?.[i] || "-",
          minTemp: weather.daily.temperature_2m_min?.[i] || "-",
          precip: weather.daily.precipitation_sum?.[i] || "_",
          wind: weather.daily.windspeed_10m_max?.[i] || "-",
          humidity:
            weather.daily.relative_humidity_2m_min?.[i] !== undefined &&
            weather.daily.relative_humidity_2m_max?.[i] !== undefined
              ? `${weather.daily.relative_humidity_2m_min[i]}% - ${weather.daily.relative_humidity_2m_max[i]}%`
              : "-",
          sunrise: formatTime(weather.daily.sunrise?.[i]),
          sunset: formatTime(weather.daily.sunset?.[i]),
        }))
      : [],
  };
}
