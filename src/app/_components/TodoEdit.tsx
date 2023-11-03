'use client'
import { useStore } from '@/stores'
import supabase from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { PrimaryButton } from './PrimaryButton'

export const TodoEdit = () => {
  const router = useRouter()
  const editedTask = useStore((state) => state.editedTask)
  const loginUser = useStore((state) => state.loginUser)
  const updateTask = useStore((state) => state.updateEditedTask)
  const resetTask = useStore((state) => state.resetEditedTask)

  const signOut = () => {
    supabase.auth.signOut()
    router.push('/auth')
  }

  const submitHandler = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (editedTask.id === '') {
      // 新規TODO作成
      const { error } = await supabase.from('todos').insert([{ title: editedTask.title, user_id: loginUser.id }])
    } else {
      // TODO編集
      console.log('Update task!')
      const { error } = await supabase.from('todos').update({ title: editedTask.title }).match({ id: editedTask.id })
    }
    router.refresh()
    resetTask()
  }

  return (
    <div className="m-5 text-center">
      <p className="my-3">{loginUser.email}</p>
      <div className="my-3 flex justify-center">
        <PrimaryButton onClick={signOut}>Logout</PrimaryButton>
      </div>

      <form className="flex justify-center space-x-1" onSubmit={submitHandler}>
        <input
          type="text"
          className="block rounded border border-gray-300 p-2"
          value={editedTask.title}
          onChange={(ev) => updateTask({ ...editedTask, title: ev.target.value })}
        />
        <PrimaryButton attrType="submit">{editedTask.id ? 'Update' : 'Create'}</PrimaryButton>
      </form>
    </div>
  )
}
