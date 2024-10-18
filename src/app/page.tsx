'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        className="rounded-lg bg-white p-8 text-center shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="mb-6 text-5xl font-bold text-gray-800"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        >
          Learn Animations
        </motion.h1>
        <motion.p
          className="mx-auto mb-8 max-w-md text-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Master the art of fluid animations. Elevate your website with engaging
          animations.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-blue-500 font-medium text-white hover:bg-blue-600"
          >
            <Link href="/recipes">
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Recipes
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
