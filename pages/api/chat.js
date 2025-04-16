import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!configuration.apiKey) {
    return res.status(500).json({ error: "OpenAI API anahtarı eksik" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Sen reklamingo.com.tr için çalışan yaratıcı bir yapay zekasın. Kullanıcılardan sektörleri veya işleriyle ilgili bilgiler alıyorsun ve onlara iki başlık altında öneriler veriyorsun: 'Harika Fikirler' ve 'Reklamingo’dan Size Uygun Ürünler'. Cevapların sade, Türkçe ve yaratıcı olmalı."
        },
        {
          role: "user",
          content: `Bir müşteri şöyle yazdı: "${prompt}". Lütfen iki başlık altında yaratıcı fikir ve ürün önerisi sun.`
        }
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const reply = completion.data.choices[0].message.content;
    const [ideas, products] = reply.split("Reklamingo’dan Size Uygun Ürünler");

    res.status(200).json({
      ideas: ideas?.replace("Harika Fikirler", "").trim().split("\n").filter(Boolean),
      products: products?.trim().split("\n").filter(Boolean),
    });

  } catch (error) {
    console.error("GPT API hatası:", error);
    res.status(500).json({ error: "GPT API isteği başarısız oldu." });
  }
}