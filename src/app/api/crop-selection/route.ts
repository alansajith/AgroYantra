import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// It's best to store your Gemini API key in an environment variable
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { soilType, region, season } = await req.json();
    if (!soilType || !region || !season) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const prompt = `You are an expert in agriculture. Based on the following conditions, provide the following as a single JSON object:\n\n1. recommendedCrops: The 3-5 best crops to grow, each as an object with name, duration (in days or range), yield (e.g. High/Medium/Low or tons/acre), and a rating (1-5, where 5 is best).\n2. popularCrops: The 3-5 most popular crops grown, each as an object with name, duration, yield, and rating.\n3. weather: A short summary of typical weather (temperature range, humidity, sunlight hours) for these conditions.\n4. growingTips: 3-5 essential tips for successful crop cultivation in these conditions.\n\nConditions:\nSoil type: ${soilType}\nRegion: ${region}\nSeason: ${season}\n\nFormat your response as:\n{\n  "recommendedCrops": [{"name": "", "duration": "", "yield": "", "rating": 0}],\n  "popularCrops": [{"name": "", "duration": "", "yield": "", "rating": 0}],\n  "weather": { "temperature": "", "humidity": "", "sunlight": "" },\n  "growingTips": ["Tip1", "Tip2", ...]\n}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini raw response:", text);

    // Try to extract the JSON object from Gemini's response
    let aiData = {
      recommendedCrops: [],
      popularCrops: [],
      weather: { temperature: "", humidity: "", sunlight: "" },
      growingTips: [],
    };
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        aiData = JSON.parse(match[0]);
      }
    } catch (e) {
      console.error("JSON parse error:", e, "\nGemini response:", text);
      // fallback: leave aiData as default
    }

    return NextResponse.json(aiData);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to get crop recommendations." },
      { status: 500 }
    );
  }
}
