import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

// Initialize generic client if key exists, otherwise we handle it gracefully in the UI
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getGeminiRecommendation = async (userQuery: string, language: 'fr' | 'en' = 'fr'): Promise<string> => {
  if (!ai) {
    return language === 'fr' 
      ? "Clé API manquante. Veuillez configurer votre clé API pour utiliser l'assistant."
      : "API Key missing. Please configure your API Key to use the assistant.";
  }

  try {
    const model = "gemini-2.5-flash";
    
    const instructions = {
      fr: `Tu es 'CineBot', un expert en cinéma passionné et utile pour une application de streaming.
      Tes réponses doivent être courtes, engageantes et en français.
      Suggère 3 films correspondant à la demande de l'utilisateur avec une très brève description pour chacun.
      N'utilise pas de formatage Markdown complexe (comme les tableaux), utilise des listes simples.`,
      en: `You are 'CineBot', a passionate and helpful movie expert for a streaming app.
      Your answers must be short, engaging, and in English.
      Suggest 3 movies matching the user's request with a very brief description for each.
      Do not use complex Markdown formatting (like tables), use simple lists.`
    };

    const systemInstruction = instructions[language];

    const response = await ai.models.generateContent({
      model: model,
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const fallbackText = language === 'fr' 
      ? "Désolé, je n'ai pas pu générer de recommandation pour le moment."
      : "Sorry, I couldn't generate a recommendation at this time.";

    return response.text || fallbackText;
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return language === 'fr'
      ? "Une erreur est survenue lors de la connexion à l'assistant intelligent."
      : "An error occurred while connecting to the AI assistant.";
  }
};