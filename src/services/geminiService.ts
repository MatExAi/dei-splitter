
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseBillText = async (rawText: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Parse this Greek electricity bill text and return a JSON structure. 
    Map items into: 
    - kwh-related (energy_supply, fixed_fee, regulated, misc, vat)
    - sqm-related (municipal_fees_dt, municipal_tax_df)
    - katerina-only (tap)
    - equal-split (ert)

    Bill Text:
    ${rawText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                amount: { type: Type.NUMBER },
                type: { type: Type.STRING, enum: ['kwh', 'sqm', 'katerina100', 'equal50'] }
              },
              required: ['name', 'amount', 'type']
            }
          },
          totalKwh: { type: Type.NUMBER }
        },
        required: ['items', 'totalKwh']
      }
    }
  });

  return JSON.parse(response.text);
};

export const fetchLatestTariffs = async () => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Search for the latest electricity tariffs in Greece (August 2024/September 2024) from DEI (ΔΕΗ) and other providers. Return a summary for the user in Greek.",
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};
