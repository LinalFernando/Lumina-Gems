import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

const getAiClient = () => {
  // In a real app, handle missing key gracefully
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const askGemologist = async (product: Product, question: string): Promise<string> => {
  const ai = getAiClient();
  
  const systemInstruction = `You are the Chief Gemologist at "Lumina Gems", a high-end luxury jewelry boutique. 
  You are knowledgeable, sophisticated, and polite. 
  You are currently assisting a customer looking at a specific gemstone.
  
  Current Gem Context:
  Name: ${product.name}
  Type: ${product.category}
  Origin: ${product.origin}
  Carat: ${product.carat}
  Price: $${product.price}
  
  Answer the user's question about this specific gem or gems in general. 
  Keep answers concise (under 100 words) but informative. 
  If asked about price, justify it based on rarity and quality.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    return response.text || "I apologize, I am having trouble inspecting this gem at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I cannot connect to our gemological database right now. Please try again.";
  }
};

export const generateGemDescription = async (gemName: string): Promise<string> => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a 2-sentence luxurious marketing description for a ${gemName}. Focus on emotion and beauty.`,
    });
    return response.text || "A beautiful gemstone of rare quality.";
  } catch (error) {
    return "A beautiful gemstone of rare quality.";
  }
};