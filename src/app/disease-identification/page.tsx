"use client";

import { useState } from "react";
import {
  ImageUp,
  Search,
  Info,
  AlertCircle,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import { Geist, Roboto_Slab, Pacifico } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const cropOptions = [
  "Wheat",
  "Rice",
  "Maize",
  "Potato",
  "Tomato",
  "Cotton",
  "Soybean",
];

export default function DiseaseIdentificationPage() {
  const [image, setImage] = useState<File | null>(null);
  const [crop, setCrop] = useState("");
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleIdentify = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        disease: "Late Blight",
        description:
          "Late blight is a disease that affects potatoes and tomatoes, caused by the oomycete Phytophthora infestans. It thrives in cool, moist conditions.",
        suggestions: [
          "Remove and destroy infected plants.",
          "Apply recommended fungicides.",
          "Avoid overhead irrigation.",
        ],
        severity: "high",
      });
      setLoading(false);
    }, 1800);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 ${geist.variable} ${robotoSlab.variable} ${pacifico.variable}`}
    >
      {/* Hero/Header Section */}
      <div className="relative overflow-hidden pt-8 pb-4">
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
            <ShieldCheck className="h-8 w-8 text-green-700 dark:text-green-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-center font-[var(--font-pacifico)] bg-gradient-to-r from-green-600 via-blue-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg mb-2">
          Disease Identification
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-6 font-[var(--font-roboto-slab)] flex items-center justify-center gap-2">
          <Info className="size-5 text-blue-500" />
          Upload a photo and describe symptoms to identify plant diseases using
          AI.
        </p>
      </div>
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 pb-16 space-y-6">
        <Card className="bg-white/80 rounded-xl shadow-lg border border-green-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black font-[var(--font-geist-sans)]">
              <ImageUp className="text-primary" /> Upload Plant Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Drag and Drop Upload Area */}
            <div
              className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-colors cursor-pointer p-6 text-center bg-white/60 dark:bg-gray-900/30 ${
                dragActive
                  ? "border-green-500 bg-green-50 dark:bg-green-900/40"
                  : "border-gray-300 dark:border-gray-700"
              }`}
              onClick={() => document.getElementById("image-upload")?.click()}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              tabIndex={0}
              role="button"
              aria-label="Upload plant image"
            >
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <ImageUp className="size-8 text-green-600 mb-2" />
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Drag & drop an image here, or{" "}
                <span className="underline text-green-700">
                  click to select
                </span>
              </span>
              <span className="text-xs text-gray-500 mt-1">
                (JPG, PNG, or JPEG, max 5MB)
              </span>
              {image && (
                <div className="mt-4 flex flex-col items-center w-full">
                  <span className="text-sm text-green-700 dark:text-green-300 font-medium mb-2">
                    {image.name}
                  </span>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="max-h-40 rounded-lg border shadow mt-1"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="crop-select">Crop Type</Label>
                <Select value={crop} onValueChange={setCrop}>
                  <SelectTrigger id="crop-select">
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropOptions.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="symptom">Symptoms</Label>
                <Input
                  id="symptom"
                  placeholder="e.g. brown spots, wilting"
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                />
              </div>
            </div>
            <Button
              className="w-full mt-2"
              onClick={handleIdentify}
              disabled={!image || loading}
            >
              {loading ? "Identifying..." : "Identify Disease"}
            </Button>
          </CardContent>
        </Card>
        {result && (
          <Card className="bg-white/80 rounded-xl shadow-lg border-2 border-green-500 animate-in fade-in duration-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black font-[var(--font-geist-sans)]">
                {result.severity === "high" ? (
                  <AlertCircle className="text-red-500" />
                ) : (
                  <CheckCircle className="text-green-500" />
                )}
                {result.disease}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-muted-foreground font-[var(--font-roboto-slab)]">
                {result.description}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                {result.suggestions.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
      <footer className="mt-8 mb-4 text-gray-500 text-sm text-center font-[var(--font-geist-sans)]">
        &copy; {new Date().getFullYear()} AgroYantra. Cultivating the Future.
      </footer>
    </div>
  );
}
