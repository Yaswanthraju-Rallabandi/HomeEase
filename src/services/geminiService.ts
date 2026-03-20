import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function analyzeImage(base64Image: string, language: string = 'en') {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Analyze this image of a home repair problem. 
    1. Identify the core problem (e.g., leaking tap, broken fan, cracked wall).
    2. Suggest the most appropriate service category (e.g., Plumber, Electrician, Carpenter).
    3. Provide a short description of the issue.
    
    Respond in JSON format:
    {
      "problem": "string",
      "category": "string",
      "description": "string"
    }
    
    Respond in ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}.
  `;

  const imagePart = {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64Image.split(',')[1],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [imagePart, { text: prompt }] }],
      config: { responseMimeType: "application/json" }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return null;
  }
}
