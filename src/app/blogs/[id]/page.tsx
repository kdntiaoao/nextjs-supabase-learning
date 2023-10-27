import { Database } from '@/types/database'
import { dateToString } from '@/utils/dateToString'
import { notFound } from 'next/navigation'

type Blog = Database['public']['Tables']['blogs']['Row']

type Props = {
  params: {
    id: string
  }
}

const fetchBlog = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blogs?id=eq.${id}&select=*`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`)
  }
  const blogs: Blog[] = await res.json()
  return blogs[0]
}

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blogs?select=id`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
    cache: 'no-store',
  })
  const ids: Blog['id'][] = await res.json()

  return ids
}

export default async function BlogPage({ params: { id } }: Props) {
  const blog = await fetchBlog(id)

  if (!blog) {
    return notFound()
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">{blog.title}</h2>
      <dl className="flex flex-col gap-4 rounded-md bg-slate-100 p-4 shadow-md">
        <div>
          <dt className="font-bold">Task ID:</dt>
          <dd>{blog.id}</dd>
        </div>
        <div>
          <dt className="font-bold">Task Content:</dt>
          <dd>{blog.content}</dd>
        </div>
        <div>
          <dt className="font-bold">Task Created At:</dt>
          <dd>{dateToString(blog.created_at)}</dd>
        </div>
      </dl>
    </div>
  )
}
