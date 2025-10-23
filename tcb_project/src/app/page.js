// app/page.js
import prisma from '@/lib/prisma'

export default async function Home() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">📰 InsightDigest</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <div key={article.id} className="bg-white shadow p-4 rounded-xl">
            <img
              src={article.imageUrl || '/noimg.png'}
              alt={article.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-2">{article.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{article.summary}</p>
            <a
              href={article.url}
              target="_blank"
              className="text-blue-500 mt-2 inline-block"
            >
              Read full →
            </a>
          </div>
        ))}
      </div>
    </main>
  )
}
