import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type ResponseData = {
  images?: string[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompts } = req.body;

  if (!prompts || !Array.isArray(prompts) || prompts.length === 0) {
    return res.status(400).json({ error: 'Prompts are required and must be an array' });
  }

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Générer une image pour chaque prompt
    const imagePromises = prompts.map(async (prompt) => {
      try {
        const response = await openai.createImage({
          prompt: prompt,
          n: 1,
          size: "1024x1024",
        });
        
        return response.data.data[0].url || "";
      } catch (error) {
        console.error("Error generating image for prompt:", prompt, error);
        return ""; // Retourner une chaîne vide en cas d'erreur
      }
    });

    const images = await Promise.all(imagePromises);
    const filteredImages = images.filter(url => url !== "");

    return res.status(200).json({ images: filteredImages });
  } catch (error: any) {
    console.error("Error calling OpenAI:", error);
    return res.status(500).json({ error: error.message || 'Failed to generate images' });
  }
}
