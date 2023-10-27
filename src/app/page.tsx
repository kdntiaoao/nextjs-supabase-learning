import { Suspense } from 'react'
import { NotesList } from './_components/NotesList'
import { Spinner } from './_components/Spinner'
import { RefreshBtn } from './_components/RefreshBtn'

export default function Home() {
  return (
    <main className="mt-5 px-4">
      <Suspense fallback={<Spinner />}>
        <NotesList />
        <div className="mt-8 flex justify-center">
          <RefreshBtn />
        </div>
      </Suspense>
    </main>
  )
}
