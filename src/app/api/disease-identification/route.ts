import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // for faster response

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const crop = formData.get("crop");
    const symptom = formData.get("symptom");
    const imageFile = formData.get("image");
    let imageBase64 = "";
    if (
      imageFile &&
      typeof imageFile === "object" &&
      "arrayBuffer" in imageFile
    ) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageBase64 = buffer.toString("base64");
    }
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not set." },
        { status: 500 }
      );
    }
    // Compose prompt for Gemini
    let prompt = `You are a plant pathologist. Given the following information, identify the most likely disease and provide 2-3 actionable measures to overcome it.\nCrop: ${crop}\nSymptoms: ${symptom}`;
    if (imageBase64) {
      prompt += `\nThe following is a base64-encoded image of the affected plant: ${imageBase64.substring(
        0,
        100
      )}... (truncated)`;
    }
    prompt += '\nRespond in JSON: { "disease": string, "measures": string[] }';
    // Call Gemini
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: 500 });
    }
    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    let result = {};
    try {
      result = JSON.parse(aiText);
    } catch {
      // fallback: try to extract JSON from text
      const match = aiText.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          result = JSON.parse(match[0]);
        } catch {}
      }
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error?.toString() || "Unknown error" },
      { status: 500 }
    );
  }
}
