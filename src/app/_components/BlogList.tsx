import { Database } from '@/types/database'
import { sleep } from '@/utils/sleep'

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

export const BlogList = async () => {
  const blogs = await fetchBlogs()

  return (
    <div>
      <h2 className="text-2xl font-bold">Blogs</h2>
      <ul className="mt-5 flex flex-col gap-2">
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}
