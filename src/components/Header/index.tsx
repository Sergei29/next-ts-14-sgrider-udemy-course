import Link from 'next/link'

const Header = (): JSX.Element => {
  return (
    <header>
      <nav>
        <Link href="/">Corp</Link>
        <Link href="/scale">Scale</Link>
        <Link href="/performance">Performance</Link>
        <Link href="/reliability">Reliability</Link>
      </nav>
    </header>
  )
}

export default Header
