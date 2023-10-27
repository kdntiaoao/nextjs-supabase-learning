import { Database } from '@/types/database'
import { sleep } from '@/utils/sleep'

type News = Database['public']['Tables']['news']['Row']

const fetchNewsList = async () => {
  await sleep(6000)
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/news?select=*`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`)
  }
  const newsList: News[] = await res.json()
  return newsList
}

export const NewsList = async () => {
  const newsList = await fetchNewsList()

  return (
    <div>
      <h2 className="text-2xl font-bold">News</h2>
      <ul className="mt-5 flex flex-col gap-2">
        {newsList.map((news) => (
          <li key={news.id}>{news.title}</li>
        ))}
      </ul>
    </div>
  )
}
