import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type ResponseData = {
  cameraMovements?: string[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Vérifiez que la méthode de requête est POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { scenes, images } = req.body;

  // Validez les scènes
  if (!scenes || !Array.isArray(scenes) || scenes.length === 0) {
    return res.status(400).json({ error: 'Scenes are required and must be an array' });
  }

  // Validez les images si elles sont fournies
  if (images && (!Array.isArray(images) || images.length !== scenes.length)) {
    return res.status(400).json({ error: 'Images must be an array of the same length as scenes' });
  }

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Générer des mouvements de caméra pour chaque scène
    const cameraPromises = scenes.map(async (scene, index) => {
      // Construire un contexte avec l'image si disponible
      let contextPrompt = `Scène: "${scene}"`;
      if (images && images[index]) {
        contextPrompt += `\nUne image visuelle de cette scène a été générée. Tiens compte du contenu visuel dans ta proposition.`;
      }

      const completion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Tu es un directeur de la photographie expert en mouvements de caméra et plans cinématographiques. Tu suggères des mouvements de caméra précis et adaptés pour maximiser l'impact narratif et visuel de chaque scène."
          },
          {
            role: "user",
            content: `Pour la scène suivante, suggère 2-3 options de mouvements de caméra spécifiques (travelling, panoramique, zoom, etc.) avec des détails sur l'angle, la distance, et le rythme. Explique comment chaque mouvement renforce l'émotion ou le message de la scène. ${contextPrompt}`
          }
        ],
      });

      return completion.data.choices[0]?.message?.content || "";
    });

    const cameraMovements = await Promise.all(cameraPromises);

    return res.status(200).json({ cameraMovements });
  } catch (error: any) {
    console.error("Error calling OpenAI:", error);
    return res.status(500).json({ error: error.message || 'Failed to generate camera movements' });
  }
}
