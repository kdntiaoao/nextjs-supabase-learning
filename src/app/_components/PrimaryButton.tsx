type Props = {
  children: React.ReactNode
  onClick: () => void
}

export const PrimaryButton = ({ children, onClick }: Props) => {
  return (
    <button type="button" onClick={onClick} className="relative block rounded-md bg-blue-500 px-4 py-2 text-white">
      <span className="block transform transition-all duration-300 ease-in-out hover:translate-y-1">{children}</span>
    </button>
  )
}
