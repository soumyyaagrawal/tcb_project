// app/page.js
'use client';
// import prisma from '@/lib/prisma'

export default function Client({ articles }) {

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

    <main className="min-h-screen p-10 bg-black">
      <h1 className="text-purple-700 text-3xl font-bold mb-6">
        <span className="bg-gradient-to-r from-purple-700  via-purple-500 to-purple-400 text-transparent bg-clip-text">
          InsightDigest
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map(article => (
          <div className="bg-gradient-to-t from-gray-800 via-blue-800 to-blue-900 shadow p-4 rounded-xl">
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
            <div onClick={() => handleSummarize(article.content || article.description || article.title)} className="text-gray-900 text-md text-center mt-2 p-2 bg-gray-200 shadow p-1 rounded-xl">
             summarize  
            </div>
          </div>
        ))}
      </div>

    </main>
  )
}
