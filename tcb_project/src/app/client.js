// app/page.js
'use client';
import prisma from '@/lib/prisma'
import { fetchNews } from '@/lib/news'

export default async function Client() {
   
  const articles = await fetchNews()

  const handleSummarize = async (text) => {
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    const data = await res.json()
    console.log('Summary:', data.summary)
    alert(data.summary) // or update state to show in UI
  }
 


  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-black 3xl font-bold mb-6">InsightDigest</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map(article => (
          <div className="bg-gray-200 shadow p-4 rounded-xl">
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
            <div onClick={() => handleSummarize(article.content || article.description || article.title)} className="text-gray-500 text-sm mt-2 bg-gray-200 shadow p-1 rounded-xl">
             summarize  
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
