import { getArticlesFromDB, syncNews } from '@/lib/news';
import Client from '@/app/client.js';

// This is the default export for the page
export default async function Home() {
  
  
  await syncNews();

  
  const articles = await getArticlesFromDB();

  // 3. Pass the articles array down as a prop to the Client Component.
  return <Client articles={articles} />;
}
