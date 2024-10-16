'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ComponentModule {
  default: React.ComponentType
  metadata: {
    title: string
    description: string
    features: string[]
  }
}

export default function Page() {
  const params = useParams()
  const slug = params.slug as string
  const [ComponentModule, setComponentModule] =
    useState<ComponentModule | null>(null)

  useEffect(() => {
    const loadComponent = async () => {
      const dynamicComponent = await import(`@/recipes/${slug}`)
      setComponentModule(dynamicComponent)
    }
    loadComponent()
  }, [slug])

  if (!ComponentModule) {
    return (
      <div className="flex h-[calc(100vh-128px)] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl text-gray-600"
        >
          Loading...
        </motion.div>
      </div>
    )
  }

  const { default: DefaultComponent, metadata } = ComponentModule

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <Link
          href="/recipes"
          className="mb-4 inline-block text-blue-500 transition-colors hover:text-blue-600"
        >
          ← Back to Recipes
        </Link>
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          {metadata.title}
        </h1>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="overflow-hidden rounded-lg bg-white shadow-md"
      >
        <div className="flex flex-col md:flex-row">
          <div className="bg-gray-50 p-6 md:w-1/3">
            <h2 className="mb-4 text-xl font-semibold">About this Component</h2>
            <p className="mb-4 text-gray-600">{metadata.description}</p>
            <h3 className="mb-2 text-lg font-semibold">Key Features:</h3>
            <ul className="list-inside list-disc text-gray-600">
              {metadata.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="flex min-h-[400px] items-center justify-center bg-gray-100 p-6 md:w-2/3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex h-full w-full items-center justify-center"
            >
              <DefaultComponent />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
