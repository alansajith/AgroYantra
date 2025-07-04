import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { location, date } = await req.json();
    // Geocode location to lat/lon using Open-Meteo geocoding
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        location
      )}&count=1&language=en&format=json`
    );
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      return NextResponse.json(
        { error: "Location not found." },
        { status: 400 }
      );
    }
    const { latitude, longitude, name, country } = geoData.results[0];
    // Fetch 5-day weather forecast
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,windspeed_10m_max,relative_humidity_2m_max,relative_humidity_2m_min,sunrise,sunset&forecast_days=5&timezone=auto`
    );
    const weatherData = await weatherRes.json();
    // Prepare summary for Gemini
    const forecast = weatherData.daily;
    let summary = `5-day weather forecast for ${name}, ${country} starting ${forecast.time[0]}:\n`;
    for (let i = 0; i < forecast.time.length; i++) {
      summary += `Day ${i + 1} (${forecast.time[i]}): Max Temp: ${
        forecast.temperature_2m_max[i]
      }°C, Min Temp: ${forecast.temperature_2m_min[i]}°C, Precipitation: ${
        forecast.precipitation_sum[i]
      }mm, Max Wind: ${forecast.windspeed_10m_max[i]} km/h, Weather Code: ${
        forecast.weathercode[i]
      }\n`;
    }
    // Gemini prompt
    const prompt = `You are an agricultural expert. Given this weather forecast, provide concise, actionable tips for farmers in these categories: Irrigation Planning, Wind Alerts, Sunlight Management, Rain Protection.\n${summary}\nRespond in JSON: { "irrigation": string, "wind": string, "sunlight": string, "rain": string }`;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not set." },
        { status: 500 }
      );
    }
    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    if (!geminiRes.ok) {
      const error = await geminiRes.text();
      return NextResponse.json({ error }, { status: 500 });
    }
    const geminiData = await geminiRes.json();
    const aiText =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    let tips = {};
    try {
      tips = JSON.parse(aiText);
    } catch {
      const match = aiText.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          tips = JSON.parse(match[0]);
        } catch {}
      }
    }
    // Attach location name for frontend display
    weatherData.location_name = `${name}, ${country}`;
    return NextResponse.json({ weather: weatherData, tips });
  } catch (error) {
    return NextResponse.json(
      { error: error?.toString() || "Unknown error" },
      { status: 500 }
    );
  }
}
