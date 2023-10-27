type Size = 'sm' | 'md' | 'lg'

type Props = {
  color?: string
  size?: Size
}

export const Spinner = ({ color = '#999', size = 'md' }: Props) => {
  const fontSize = (size === 'sm' && '0.75rem') || (size === 'md' && '1rem') || (size === 'lg' && '1.5rem') || '1rem'

  return (
    <div className="flex items-center justify-center" style={{ fontSize }}>
      <svg
        className="-ml-1 mr-3 animate-spin"
        style={{ color, width: '1.2em', height: '1.2em' }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      <span>Loading...</span>
    </div>
  )
}
