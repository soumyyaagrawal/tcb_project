// lib/news.js
export async function fetchNews() {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.OPENAI_API_KEY}`
    )
    const data = await res.json()
  
    return data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      content: article.content,
      imageUrl: article.urlToImage,
      source: article.source?.name,
      publishedAt: article.publishedAt
    }))
  }
  