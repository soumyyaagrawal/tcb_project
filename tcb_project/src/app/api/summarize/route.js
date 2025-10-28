import { NextResponse } from 'next/server';



export async function POST(req) {
    // 1. Get the article text from the request body
    const { text } = await req.json();

    // 2. Define API key and endpoint (Read from environment variable)
    // IMPORTANT: Make sure this variable is defined in your .env.local
    const apiKey = process.env.GEMINI_API_KEY; 
    const model = 'gemini-2.5-flash-preview-09-2025';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    if (!text) {
        return NextResponse.json({ summary: 'No text provided' });
    }

    if (!apiKey) {
        console.error("GEMINI_API_KEY environment variable is not set.");
        return new NextResponse('AI service configuration error: GEMINI_API_KEY is missing.', { status: 500 });
    }

    const prompt = `Summarize this article in simple words in 2 lines:\n\n${text}`;

    // 3. Construct the Gemini API Payload
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        // Optional: A system instruction to ensure the model stays concise
        systemInstruction: {
            parts: [{ text: "You are a concise news summarizer. Provide the summary in exactly two sentences." }]
        },
    };

    try {
        // 4. Call the Gemini API using native fetch
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        // Check for general API errors (e.g., rate limit, invalid key)
        if (!response.ok || result.error) {
            console.error('Gemini API Response Error:', result.error || response.statusText);
            return new NextResponse(`Gemini API Error: ${result.error?.message || response.statusText}`, { status: response.status || 500 });
        }

        // 5. Extract the generated text from the correct response path
        const summary = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!summary) {
            console.warn('Gemini returned no text content.', result);
            return NextResponse.json({ summary: 'Summary could not be generated.' });
        }

        return NextResponse.json({ summary: summary });

    } catch (error) {
        console.error("Network or Processing Error:", error);
        return new NextResponse('Internal server error during AI processing.', { status: 500 });
    }
}
