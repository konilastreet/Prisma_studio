import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type ResponseData = {
  storyboard?: string[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { synopsis } = req.body;

  if (!synopsis || typeof synopsis !== 'string') {
    return res.status(400).json({ error: 'Synopsis is required and must be a string' });
  }

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "Tu es un réalisateur expert dans la création de storyboards. Tu peux découper un synopsis en scènes distinctes pour la production audiovisuelle." 
        },
        { 
          role: "user", 
          content: `Découpe ce synopsis en 5 à 10 scènes distinctes pour un storyboard. Chaque scène doit être numérotée et contenir une description précise de l'action, du décor et des personnages présents. Format attendu pour chaque scène: Scène X: [Description détaillée]. Voici le synopsis: "${synopsis}"` 
        }
      ],
    });

    const storyboardText = completion.data.choices[0]?.message?.content || "";
    
    // Transformer le texte en tableau de scènes
    const storyboardScenes = storyboardText
      .split(/Scène \d+:/i)
      .filter(text => text.trim() !== '')
      .map(text => text.trim());

    return res.status(200).json({ storyboard: storyboardScenes });
  } catch (error: any) {
    console.error("Error calling OpenAI:", error);
    return res.status(500).json({ error: error.message || 'Failed to generate storyboard' });
  }
}
