import { RouterBtn } from '../_components/RouterBtn'

export default function BlogsPage() {
  return (
    <div className="flex flex-col items-center text-center">
      <p>Click a title on the left to view detail 🚀</p>
      <div className="mt-5">
        <RouterBtn />
      </div>
    </div>
  )
}
