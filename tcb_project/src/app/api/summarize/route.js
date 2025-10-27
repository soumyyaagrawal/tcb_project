console.log("API ROUTE ENV CHECK:", process.env.OPENAI_API_KEY ? "Key Found" : "Key MISSING");

import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// REMOVE the top-level client initialization

export async function POST(req) {
  const { text } = await req.json()

  // Initialize the client *inside* the POST function
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
  })
  
  // ... rest of your code
  if (!text) {
    return NextResponse.json({ summary: 'No text provided' })
  }

  const prompt = `Summarize this article in simple words in 2 lines:\n\n${text}`

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    })
    const summary = response.choices[0].message.content
    return NextResponse.json({ summary: summary })

  } catch (error) {
    console.error("OpenAI API Error:", error)
    // Send a 500 status response for an internal error
    return new NextResponse('Error summarizing text', { status: 500 })
  }
}