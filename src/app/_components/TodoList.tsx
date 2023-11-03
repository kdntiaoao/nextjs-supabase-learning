import { Database } from '@/types/database'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { TodoItem } from './TodoItem'

export const TodoList = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  const { data: todos } = await supabase.from('todos').select('*').order('created_at', { ascending: true })

  return <ul className="mx-3 my-6">{todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)}</ul>
}
