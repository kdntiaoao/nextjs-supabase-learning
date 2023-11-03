'use client'

import { useStore } from '@/stores'
import { Database } from '@/types/database'
import supabase from '@/utils/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Todo = Database['public']['Tables']['todos']['Row']

type Props = {
  todo: Todo
}

export const TodoItem = ({ todo }: Props) => {
  const router = useRouter()
  const updateTask = useStore((state) => state.updateEditedTask)
  const updateMutate = async (id: string, completed: boolean) => {
    await supabase.from('todos').update({ completed }).match({ id })
    router.refresh()
  }
  const deleteMutate = async (id: string) => {
    await supabase.from('todos').delete().match({ id })
    router.refresh()
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-300 p-4">
      <div className="flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="mr-4"
          checked={todo.completed}
          onChange={(e) => {
            updateMutate(todo.id, !todo.completed)
          }}
        />
        <Link href={`/todos/${todo.id}`} className={`text-xl font-medium ${todo.completed ? 'line-through' : ''}`}>
          {todo.title}
        </Link>
      </div>
      <div className="flex items-center">
        <button
          className="mr-4 text-sm text-blue-500"
          onClick={() => {
            updateTask({ id: todo.id, title: todo.title || '' })
          }}
        >
          Edit
        </button>
        <button
          className="text-sm text-red-500"
          onClick={() => {
            deleteMutate(todo.id)
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
