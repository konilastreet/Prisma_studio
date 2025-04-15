import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type ResponseData = {
  synopsis?: string;
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

  const { developedIdea } = req.body;

  // Validez l'idée développée
  if (!developedIdea || typeof developedIdea !== 'string' || developedIdea.trim() === "") {
    return res.status(400).json({ error: 'Developed idea is required and must be a non-empty string' });
  }

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Appel à l'API OpenAI pour générer un synopsis
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Tu es un scénariste professionnel capable de transformer des idées en synopsis structurés pour des productions audiovisuelles."
        },
        {
          role: "user",
          content: `Transforme cette idée développée en un synopsis structuré qui expose clairement l'intrigue, les personnages principaux et l'arc narratif: "${developedIdea}"`
        }
      ],
    });

    const synopsis = completion.data.choices[0]?.message?.content || "";

    return res.status(200).json({ synopsis });
  } catch (error: any) {
    console.error("Error calling OpenAI:", error);
    return res.status(500).json({ error: error.message || 'Failed to generate synopsis' });
  }
}
