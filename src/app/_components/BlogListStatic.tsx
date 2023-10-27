import { Database } from '@/types/database'
import { sleep } from '@/utils/sleep'
import Link from 'next/link'

type Blog = Database['public']['Tables']['blogs']['Row']

const fetchBlogs = async () => {
  await sleep(1000)
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blogs?select=*`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`)
  }
  const blogs: Blog[] = await res.json()
  return blogs
}

export const BlogListStatic = async () => {
  const blogs = await fetchBlogs()

  return (
    <div>
      <h2 className="text-2xl font-bold">Blogs</h2>
      <ul className="mt-5 flex flex-col gap-2">
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`} className="text-blue-500 underline hover:no-underline">
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
