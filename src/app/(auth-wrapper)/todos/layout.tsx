import { Suspense } from 'react'
import { Spinner } from '../../_components/Spinner'
import { TodoEdit } from '../../_components/TodoEdit'
import { TodoList } from '../../_components/TodoList'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <section className="pl-80">
      <aside className="fixed bottom-0 left-0 top-16 w-80 bg-slate-100 p-4">
        <TodoEdit />
        <div className="mt-5">
          <Suspense fallback={<Spinner />}>
            <TodoList />
          </Suspense>
        </div>
      </aside>
      <div className="mt-10 flex-1 p-4">{children}</div>
    </section>
  )
}
