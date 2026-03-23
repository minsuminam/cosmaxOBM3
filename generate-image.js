import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: "A high-quality, professional corporate photograph representing a brand growth partnership. A diverse team of creative professionals and business strategists collaborating in a modern, bright, minimalist office. They are looking at design prototypes, marketing charts, and a global map, symbolizing product development and global market expansion. Warm lighting, photorealistic, highly detailed.",
      config: {
        imageConfig: {
          aspectRatio: "4:3",
          imageSize: "1K"
        }
      }
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        fs.writeFileSync('./public/brand-partnership.jpg', Buffer.from(base64Data, 'base64'));
        console.log("Image saved successfully.");
        return;
      }
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
run();
