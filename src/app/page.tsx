import { Suspense } from 'react'
import { NotesList } from './_components/NotesList'
import { Spinner } from './_components/Spinner'
import { RefreshBtn } from './_components/RefreshBtn'

export default function Home() {
  return (
    <main className="mt-5 px-4">
      <div className="m-10 text-center">Hello World!</div>
      <Suspense fallback={<Spinner />}>
        <NotesList />
      </Suspense>
      <div className="mt-8 flex justify-center">
        <RefreshBtn />
      </div>
    </main>
  )
}
