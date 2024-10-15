'use client'

import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams()
  const slug = params.slug as string
  const Component = dynamic(() => import(`@/components/${slug}`))

  if (!Component) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Component: {slug}</h1>
      <Component />
    </div>
  )
}
