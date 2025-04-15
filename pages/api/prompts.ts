import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type ResponseData = {
  prompts?: string[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { scenes } = req.body;

  if (!scenes || !Array.isArray(scenes) || scenes.length === 0) {
    return res.status(400).json({ error: 'Scenes are required and must be an array' });
  }

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Traiter chaque scène pour générer un prompt visuel
    const promptPromises = scenes.map(async (scene, index) => {
      const completion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          { 
            role: "system", 
            content: "Tu es un expert en prompts pour la génération d'images par IA. Tu transformes des descriptions textuelles en prompts optimisés pour obtenir les meilleurs résultats visuels." 
          },
          { 
            role: "user", 
            content: `Convertis cette description de scène en un prompt détaillé pour la génération d'image par IA. Inclus des détails sur le style visuel, l'éclairage, l'angle de caméra, et l'ambiance. Utilise un vocabulaire riche et descriptif pour obtenir une image de haute qualité. Ne dépasse pas 150 mots. Scène à convertir: "${scene}"` 
          }
        ],
      });

      return completion.data.choices[0]?.message?.content || "";
    });

    const prompts = await Promise.all(promptPromises);

    return res.status(200).json({ prompts });
  } catch (error: any) {
    console.error("Error calling OpenAI:", error);
    return res.status(500).json({ error: error.message || 'Failed to generate prompts' });
  }
}
