import type { Database } from '@/types/database'
import { dateToString } from '@/utils/dateToString'
import { sleep } from '@/utils/sleep'

type Note = Database['public']['Tables']['notes']['Row']

const fetchNotes = async () => {
  await sleep(1000)
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/notes?select=*`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
    // cache: 'force-cache', // default
    cache: 'no-store', // SSR
    // next: { revalidate: 1000 },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch notes')
  }
  const notes: Note[] = await res.json()
  return notes
}

export const NotesList = async () => {
  const notes = await fetchNotes()

  return (
    <div>
      <h2 className="text-2xl font-bold">Notes</h2>
      <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <li key={note.id} className="flex flex-col gap-1 rounded-md border border-gray-200 p-4 shadow-sm">
            <div className="text-lg">{note.title}</div>
            <time dateTime={note.created_at} className="text-sm italic text-gray-400">
              Created at: {dateToString(note.created_at)}
            </time>
          </li>
        ))}
      </ul>
    </div>
  )
}
