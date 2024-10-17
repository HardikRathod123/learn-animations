'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Page() {
  const [files, setFiles] = useState<string[]>([])

  useEffect(() => {
    async function fetchFiles() {
      const response = await fetch('/api/recipes')
      const data = await response.json()
      console.log('data', data)
      setFiles(data.recipes)
    }
    fetchFiles()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="mb-6 text-4xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Framer Motion Recipes
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {files.map((file, index) => {
          const [fileName] = file.split('.')
          return (
            <motion.div
              key={fileName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/recipes/${fileName}`}
                className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:bg-blue-50 hover:shadow-md"
              >
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="truncate text-lg font-medium text-gray-700">
                    {fileName}
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
