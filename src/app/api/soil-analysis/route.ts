import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { location, soilType, ph, moisture } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not set." },
        { status: 500 }
      );
    }

    // Prepare prompt for Gemini
    const prompt = `You are an expert agronomist. Based on the following soil analysis, provide exactly 3 short, actionable soil health tips. Each tip should be a single sentence, around 10 words, and output as a JSON array of strings.\n\nLocation: ${location}\nSoil Type: ${soilType}\nMoisture: ${moisture}%\npH: ${ph}`;

    // Call Gemini AI (Google Generative Language API)
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await response.json();
    // Try to extract a JSON array from the AI's response
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    let tips: string[] = [];
    try {
      tips = JSON.parse(aiText);
      if (!Array.isArray(tips)) throw new Error("Not an array");
    } catch {
      // fallback: try to extract JSON array from text
      const match = aiText.match(/\[[\s\S]*\]/);
      if (match) {
        try {
          tips = JSON.parse(match[0]);
        } catch {}
      }
    }
    if (!tips.length) tips = [aiText];
    return NextResponse.json({ tips });
  } catch (error) {
    return NextResponse.json(
      { error: error?.toString() || "Unknown error" },
      { status: 500 }
    );
  }
}
