import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/database'
import { dateToString } from '@/utils/dateToString'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'

type Props = {
  params: {
    id: string
  }
}

export default async function TodoPage({ params: { id } }: Props) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  const { data: todo } = await supabase.from('todos').select('*').match({ id }).single()

  if (!todo) {
    return notFound()
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">{todo.title}</h2>
      <dl className="flex flex-col gap-4 rounded-md bg-slate-100 p-4 shadow-md">
        <div>
          <dt className="font-bold">Task ID:</dt>
          <dd>{todo.id}</dd>
        </div>
        <div>
          <dt className="font-bold">Status:</dt>
          <dd>{todo.completed ? 'Done!' : 'Not yet.'}</dd>
        </div>
        <div>
          <dt className="font-bold">Task Created At:</dt>
          <dd>{dateToString(todo.created_at)}</dd>
        </div>
      </dl>
    </div>
  )
}
