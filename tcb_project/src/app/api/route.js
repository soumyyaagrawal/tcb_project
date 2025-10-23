// app/api/fetch-and-store/route.js
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { fetchNews } from '@/lib/news'
import { summarize } from '@/lib/ai'

export async function GET() {
  try {
    const articles = await fetchNews()

    for (const article of articles.slice(0, 5)) {
      const summary = await summarize(article.description || article.title)
      await prisma.article.create({
        data: { 
          ...article, 
          summary, 
          publishedAt: new Date(article.publishedAt) 
        },
      })
    }

    return NextResponse.json({ success: true, message: "Articles fetched and summarized!" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: error.message })
  }
}
