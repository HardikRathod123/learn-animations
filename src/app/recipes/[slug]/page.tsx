'use client'

import { Button } from '@/components/ui/button'
import Markdown from '@/components/utils/markdown'
import { GITHUB_REPO_URL } from '@/lib/constants'
import { TMetadata } from '@/lib/types'
import { motion } from 'framer-motion'
import { Code } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ComponentModule {
  default: React.ComponentType
  metadata: TMetadata
  name: string
}

export default function Page() {
  const params = useParams()
  const slug = params.slug as string
  const [ComponentModule, setComponentModule] =
    useState<ComponentModule | null>(null)
  const github_link = `${GITHUB_REPO_URL}/blob/main/src/recipes/${slug}.tsx`

  useEffect(() => {
    const loadComponent = async () => {
      const dynamicComponent = await import(`@/recipes/${slug}`)
      setComponentModule(dynamicComponent)
    }
    loadComponent()
  }, [slug])

  const { default: DefaultComponent, metadata } = ComponentModule || {}

  if (!DefaultComponent || !metadata) {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/recipes"
          className="inline-block text-blue-500 transition-colors hover:text-blue-600"
        >
          ← Back to Recipes
        </Link>
        <Button variant="outline" asChild>
          <Link href={github_link} target="_blank" rel="noopener noreferrer">
            <Code className="mr-2 h-4 w-4" />
            View Code
          </Link>
        </Button>
      </div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        {metadata.title}
      </h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="overflow-hidden rounded-lg bg-white shadow-md"
      >
        <div className="flex flex-col md:flex-row">
          <div className="bg-gray-50 p-6 md:w-1/3">
            <Markdown>{metadata.description}</Markdown>
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
