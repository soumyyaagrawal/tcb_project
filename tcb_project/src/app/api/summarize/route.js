import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  const { text } = await req.json()

  if (!text) {
    return NextResponse.json({ summary: 'No text provided' })
  }

  const prompt = `Summarize this article in simple words in 2 lines:\n\n${text}`

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  })

  const summary = response.choices[0].message.content
  return NextResponse.json({ summary })
}
