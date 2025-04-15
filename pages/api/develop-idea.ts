import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type ResponseData = {
  developedIdea?: string;
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

  const { idea } = req.body;

  // Validez l'idée
  if (!idea || typeof idea !== 'string' || idea.trim() === "") {
    return res.status(400).json({ error: 'Idea is required and must be a non-empty string' });
  }

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Appel à l'API OpenAI pour développer l'idée
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Tu es un assistant créatif spécialisé dans le développement d'idées pour des productions audiovisuelles. Développe l'idée fournie en un concept plus riche et narratif."
        },
        {
          role: "user",
          content: `Développe cette idée de façon plus détaillée, en suggérant un contexte, des personnages potentiels et une direction narrative: "${idea}"`
        }
      ],
    });

    const developedIdea = completion.data.choices[0]?.message?.content || "";

    return res.status(200).json({ developedIdea });
  } catch (error: any) {
    console.error("Error calling OpenAI:", error);
    return res.status(500).json({ error: error.message || 'Failed to develop idea' });
  }
}
