// lib/news.js

import prisma from './prisma';

// Use the public environment variable for client-side fetches (or server-side ones if needed)
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// ----------------------------------------------------
// 1. Synchronization Function (Fetches API, writes to DB)
// ----------------------------------------------------

/**
 * Fetches top headlines from NewsAPI, transforms them, and saves new articles to the database.
 */
export async function syncNews() {
    if (!NEWS_API_KEY) {
        console.error("NEWS_API_KEY is missing. Skipping external fetch.");
        return; // Exit if the key is missing
    }

    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

    try {
        console.log("Fetching news from external API...");
        const response = await fetch(url, {
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!response.ok) {
            console.error(`NewsAPI fetch failed with status: ${response.status}`);
            return;
        }

        const data = await response.json();
        
        const articlesToCreate = data.articles
            .filter(article => article.url) // Only process articles with a URL (for unique ID)
            .map(article => ({
                // Map the NewsAPI fields to your Prisma Schema fields
                title: article.title || 'Untitled',
                description: article.description,
                url: article.url,
                imageUrl: article.urlToImage,
                source: article.source?.name,
                publishedAt: new Date(article.publishedAt),
            }));

        console.log(`Attempting to save ${articlesToCreate.length} articles to DB...`);

        // Use a transaction to perform multiple inserts efficiently
        const results = await prisma.$transaction(
            articlesToCreate.map(article => 
                prisma.article.upsert({
                    where: { url: article.url }, // Check if URL exists (to prevent duplicates)
                    update: {}, // No updates needed if it exists
                    create: article, // Create if it doesn't exist
                })
            )
        );

        console.log(`Successfully synced and saved ${results.length} articles.`);

    } catch (error) {
        console.log('Error during news sync process:', error.message);
    }
}


// ----------------------------------------------------
// 2. Retrieval Function (Gets data from DB)
// ----------------------------------------------------

/**
 * Retrieves all stored articles from the PostgreSQL database.
 * @returns {Promise<Article[]>}
 */
export async function getArticlesFromDB() {
    try {
        // Fetch all articles, sorted by published date (newest first)
        const articles = await prisma.article.findMany({
            orderBy: { publishedAt: 'desc' },
        });

        console.log(`Retrieved ${articles.length} articles from the database.`);
        return articles;

    } catch (error) {
        console.error('Error fetching articles from database:', error.message);
        return [];
    }
}
