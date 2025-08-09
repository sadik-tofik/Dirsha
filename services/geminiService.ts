
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

// This check is to prevent errors in environments where process.env.API_KEY is not set.
// In a real application, the key would be expected to be present.
const apiKey = process.env.API_KEY || "mock_api_key";
const ai = new GoogleGenAI({ apiKey });

/**
 * Helper function to convert a Blob to a Base64 encoded string.
 * @param blob The blob to convert.
 * @returns A promise that resolves with the base64 string.
 */
const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                // The result includes the data URL prefix (e.g., "data:audio/webm;base64,"),
                // which needs to be removed.
                const base64String = (reader.result as string).split(',')[1];
                resolve(base64String);
            } else {
                reject(new Error("Failed to read blob."));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};


export const getAIFeedback = async (farmData: string): Promise<string> => {
    console.log("Requesting AI feedback for:", farmData);

    if (!process.env.API_KEY) {
        console.warn("API_KEY not found. Returning dynamic mock data.");
        return new Promise(resolve => setTimeout(() => {
            const sizeMatch = farmData.match(/Farm size: ([\d.]+)/);
            const soilMatch = farmData.match(/Soil type: ([\w\s]+)\./i);

            const size = sizeMatch ? parseFloat(sizeMatch[1]) : 0;
            const soil = soilMatch ? soilMatch[1].trim().toLowerCase() : 'unknown';

            let recommendation = "";
            if (soil.includes('loam')) {
                recommendation = "Loam soil is excellent for maize or teff. With good irrigation, your yield can be very high.";
            } else if (soil.includes('clay')) {
                recommendation = "For clay soil, consider planting wheat or sugarcane. Ensure proper tillage to improve aeration.";
            } else if (soil.includes('sandy')) {
                recommendation = "Sandy soil is best for drought-resistant crops like sorghum or chickpeas. Consider adding compost to improve water retention.";
            } else {
                recommendation = "Consider testing your soil pH. Knowing the acidity or alkalinity can help in selecting the perfect crop.";
            }

            if (size > 10) {
                recommendation += " Given your large farm size, mechanization could significantly boost efficiency.";
            } else if (size > 0) {
                recommendation += ` For a ${size}-hectare farm, crop rotation with legumes is a great way to naturally enrich the soil.`;
            }

            resolve(recommendation);
        }, 1200));
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on this farm data: ${farmData}, provide a single, short, actionable recommendation for the farmer.`,
            config: {
                systemInstruction: "You are an agricultural expert providing concise advice to farmers in Ethiopia.",
                temperature: 0.7,
                maxOutputTokens: 50,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching AI feedback from Gemini:", error);
        return "Could not get AI feedback at this time. Please try again later.";
    }
};

export const getChatbotResponse = async (message: string, lang: Language): Promise<string> => {
    console.log(`Requesting chatbot response for: "${message}" in language: ${lang}`);

    if (!process.env.API_KEY) {
        console.warn("API_KEY not found. Returning mock data for chatbot.");
        return new Promise(resolve => setTimeout(() => {
            if (lang === Language.AM) {
                if (message.includes("ጤፍ")) {
                    resolve("ጤፍ በኢትዮጵያ በደንብ የሚበቅል ጠንካራ እህል ነው። በዝናብ ወቅት መትከል የተሻለ ነው። ስለ ጤፍ ማዳበሪያ ማወቅ ይፈልጋሉ?");
                } else {
                    resolve("ስለ ሰብሎች፣ አፈር እና የገበያ ዋጋ ጥያቄዎችን መርዳት እችላለሁ። ምን ማወቅ ይፈልጋሉ?");
                }
            } else {
                 if (message.toLowerCase().includes("teff")) {
                    resolve("Teff is a hardy grain that grows well in Ethiopia. It's best to plant during the rainy season. Would you like to know about fertilization for Teff?");
                } else {
                    resolve("I can help with questions about crops, soil, and market prices. What would you like to know?");
                }
            }
        }, 1200));
    }

    const systemInstruction = lang === Language.AM
        ? "You are an expert agricultural assistant named Dirsha. Respond ONLY in Amharic. You provide helpful and concise advice to farmers in Ethiopia. Answer questions about crop management, soil, weather, and market prices. Keep responses brief and easy to understand."
        : "You are an expert agricultural assistant named Dirsha. You provide helpful and concise advice to farmers in Ethiopia. Answer questions about crop management, soil, weather, and market prices. Keep responses brief and easy to understand.";

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching chatbot response from Gemini:", error);
        return lang === Language.AM
            ? "ይቅርታ፣ አሁን በመገናኘት ላይ ችግር እያጋጠመኝ ነው። እባክዎ ከትንሽ ቆይታ በኋላ እንደገና ይሞክሩ።"
            : "Sorry, I'm having trouble connecting right now. Please try again in a moment.";
    }
};


export const transcribeVoice = async (audioBlob: Blob): Promise<string> => {
    console.log("Transcribing audio blob:", audioBlob.size, "bytes", "MIME type:", audioBlob.type);

    if (!process.env.API_KEY) {
        console.warn("API_KEY not found. Returning mock transcription.");
        return new Promise(resolve => setTimeout(() => resolve("show me market prices for teff"), 1500));
    }
    
    try {
        const base64Audio = await blobToBase64(audioBlob);
        const audioPart = {
            inlineData: {
                mimeType: audioBlob.type || 'audio/webm',
                data: base64Audio,
            },
        };

        const textPart = {
            text: "Transcribe this audio recording of a user asking a question for an agricultural app. The audio is in English or Amharic.",
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [audioPart, textPart] },
        });

        const transcription = response.text.trim();
        console.log("Transcription result:", transcription);
        if (!transcription) {
             return "Sorry, I could not understand that. Please try again.";
        }
        return transcription;

    } catch (error) {
        console.error("Error transcribing voice with Gemini:", error);
        return "Sorry, I could not understand that. Please try again.";
    }
};
