import Link from 'next/link'

const navLinks = [
  {
    href: '/',
    label: 'HOME',
  },
  {
    href: '/blogs',
    label: 'BLOGS',
  },
  {
    href: '/streaming-sr',
    label: 'STREAMING SR',
  },
  {
    href: '/auth',
    label: 'AUTH',
  },
]

export const NavBar = () => {
  return (
    <header className="px-4 font-mono text-black shadow-sm">
      <nav>
        <ul className="flex h-16 flex-row items-center gap-4">
          {navLinks.map(({ href, label }, index) => (
            <li key={index}>
              <Link href={href} className="px-6 py-4 text-gray-500 transition hover:bg-slate-50">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
