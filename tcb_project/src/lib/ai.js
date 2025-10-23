// lib/ai.js
import OpenAI from 'openai'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function summarize(text) {
  if (!text) return "No summary available."

  const prompt = `Summarize this news article in easy words in 2 lines:\n\n${text}`
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  })

  return response.choices[0].message.content
}
