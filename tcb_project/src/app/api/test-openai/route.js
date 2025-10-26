import { NextResponse } from 'next/server';

export async function GET() {
  // prints to server terminal
  console.log('SERVER PROCESS.OPENAI:', !!process.env.OPENAI_API_KEY);
  return NextResponse.json({ ok: !!process.env.OPENAI_API_KEY });
}
