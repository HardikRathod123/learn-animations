import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <button>
        <Link href={'/components'}> Explore Components</Link>
      </button>
    </div>
  )
}
