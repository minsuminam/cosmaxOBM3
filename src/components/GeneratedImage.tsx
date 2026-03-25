import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export function GeneratedImage({ prompt, alt, className }: { prompt: string, alt: string, className?: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generate = async () => {
      if (!ai) {
        console.error("Gemini API key is missing. Please set GEMINI_API_KEY in your environment variables.");
        const seed = encodeURIComponent(prompt.substring(0, 20));
        setImageUrl(`https://picsum.photos/seed/${seed}/800/600`);
        setLoading(false);
        return;
      }

      // Hash the prompt or just use it as key if it's not too long
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
          contents: prompt,
          config: {
            imageConfig: {
              aspectRatio: "4:3",
              imageSize: "1K"
            }
          }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            const url = `data:image/jpeg;base64,${base64EncodeString}`;
            setImageUrl(url);
            
            // Try to cache it, might fail if base64 is too large for localStorage
            try {
              localStorage.setItem(cacheKey, url);
            } catch (e) {
              console.warn("Could not cache image to localStorage", e);
            }
            
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error("Failed to generate image", e);
      }
      
      // Fallback to placeholder if generation fails or no image part found
      const seed = encodeURIComponent(prompt.substring(0, 20));
      setImageUrl(`https://picsum.photos/seed/${seed}/800/600`);
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

  if (!imageUrl) {
    return (
      <div className={`bg-gray-100 flex flex-col items-center justify-center ${className} p-4 text-center`}>
        <span className="text-gray-500 text-sm font-medium mb-1">Failed to load image</span>
        {!ai && <span className="text-red-400 text-xs">Gemini API key is missing.</span>}
      </div>
    );
  }

  return <img src={imageUrl} alt={alt} className={className} referrerPolicy="no-referrer" />;
}
