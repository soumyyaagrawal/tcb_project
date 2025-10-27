// app/page.js

import prisma from '@/lib/prisma'
import { fetchNews } from '@/lib/news'
import { summarize } from '@/lib/ai'
import Client from '@/app/client'

export default async function Home() {
   
  return <Client />
}
