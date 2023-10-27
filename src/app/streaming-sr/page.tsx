import { Suspense } from 'react'
import { BlogList } from '../_components/BlogList'
import { NewsList } from '../_components/NewsList'
import { Spinner } from '../_components/Spinner'

export const revalidate = 0

export default function Page() {
  return (
    <section className="flex gap-8 p-8">
      <div className="flex-1 rounded p-4 shadow">
        <Suspense fallback={<Spinner color="blue" />}>
          <BlogList />
        </Suspense>
      </div>
      <div className="flex-1 rounded p-4 shadow">
        <Suspense fallback={<Spinner color="green" />}>
          <NewsList />
        </Suspense>
      </div>
    </section>
  )
}
