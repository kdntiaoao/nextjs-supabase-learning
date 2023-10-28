type Props = {
  children: React.ReactNode
  attrType?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export const PrimaryButton = ({ children, attrType = 'button', onClick }: Props) => {
  return (
    <button type={attrType} onClick={onClick} className="relative block rounded-md bg-blue-500 text-white">
      <span className="block transform px-4 py-2 transition-all duration-300 ease-in-out hover:translate-y-1">
        {children}
      </span>
    </button>
  )
}
