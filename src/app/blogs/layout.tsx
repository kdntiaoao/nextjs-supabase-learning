import { Suspense } from 'react'
import { BlogListStatic } from '../_components/BlogListStatic'
import { RefreshBtn } from '../_components/RefreshBtn'
import { Spinner } from '../_components/Spinner'

type Props = {
  children: React.ReactNode
}

export const metadata = {
  title: 'Blogs',
}

export default function Layout({ children }: Props) {
  return (
    <section className="pl-80">
      <aside className="fixed bottom-0 left-0 top-16 w-80 bg-slate-100 p-4">
        <Suspense fallback={<Spinner />}>
          <BlogListStatic />
          <div className="mt-5">
            <RefreshBtn />
          </div>
        </Suspense>
      </aside>
      <div className="mt-10 flex-1 p-4">{children}</div>
    </section>
  )
}
