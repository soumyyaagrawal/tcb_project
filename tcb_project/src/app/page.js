// app/page.js
'use client';
import prisma from '@/lib/prisma'
import { fetchNews } from '@/lib/news'
import { summarize } from '@/lib/ai'

export default async function Home() {
   console.log("OPENAI KEY:")
   console.log("OPENAI KEY:", process.env.OPENAI_API_KEY)
  const articles = await fetchNews()
 


  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-black 3xl font-bold mb-6">InsightDigest</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map(article => (
          <div key={article.id} className="bg-gray-200 shadow p-4 rounded-xl">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-52 object-cover rounded-lg"
            />
            <h1 className="text-black lg font-semibold mt-2">{article.title}</h1> <br />
            <p className="text-black sm text-gray-600 mt-2">{article.content}</p>
            <a
              href={article.url}
              target="_blank"
              className="text-blue-500 mt-2 inline-block"
            >
              Read full 
            </a> 
            <div onClick={() => summarize(article.content || article.description || article.title)} className="text-gray-500 text-sm mt-2 bg-gray-200 shadow p-1 rounded-xl">
             summarize  
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
