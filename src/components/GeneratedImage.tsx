import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export function GeneratedImage({ prompt, alt, className }: { prompt: string, alt: string, className?: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const generate = async () => {
      if (!ai) {
        setErrorMsg("Gemini API key is missing.");
        setLoading(false);
        return;
      }

      const cacheKey = `gen_img_${btoa(encodeURIComponent(prompt)).substring(0, 50)}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setImageUrl(cached);
        setLoading(false);
        return;
      }

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              { text: prompt }
            ]
          },
          config: {
            imageConfig: {
              aspectRatio: "4:3"
            }
          }
        });

        let foundImage = false;
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            const url = `data:image/png;base64,${base64EncodeString}`;
            setImageUrl(url);
            
            try {
              localStorage.setItem(cacheKey, url);
            } catch (e) {
              console.warn("Could not cache image to localStorage", e);
            }
            
            foundImage = true;
            break;
          }
        }
        
        if (!foundImage) {
          setErrorMsg("No image data found in response.");
        }
      } catch (e: any) {
        console.error("Failed to generate image", e);
        setErrorMsg(e.message || "Unknown error occurred");
      }
      setLoading(false);
    };
    
    generate();
  }, [prompt]);

  if (loading) {
    return (
      <div className={`animate-pulse bg-gray-100 flex flex-col items-center justify-center ${className}`}>
        <div className="w-8 h-8 border-4 border-[#C1A68D] border-t-transparent rounded-full animate-spin mb-2"></div>
        <span className="text-gray-400 text-sm font-medium">Generating Image...</span>
      </div>
    );
  }

  if (errorMsg || !imageUrl) {
    return (
      <div className={`bg-gray-100 flex flex-col items-center justify-center p-4 text-center ${className}`}>
        <span className="text-red-500 text-sm font-bold mb-1">Failed to load image</span>
        <span className="text-gray-500 text-xs">{errorMsg}</span>
      </div>
    );
  }

  return <img src={imageUrl} alt={alt} className={className} referrerPolicy="no-referrer" />;
}
