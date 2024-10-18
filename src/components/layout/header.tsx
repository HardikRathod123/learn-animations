'use client'

import { Button } from '@/components/ui/button'
import { GITHUB_REPO_URL } from '@/lib/constants'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
  return (
    <motion.header
      className="border-b bg-background"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href="/" className="text-2xl font-bold text-primary">
            Learn Animations
          </Link>
        </motion.div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button variant="ghost" asChild className="text-lg font-semibold">
                <Link href="/">Home</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild className="text-lg font-semibold">
                <Link href="/recipes">Recipes</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild className="text-lg font-semibold">
                <Link href={GITHUB_REPO_URL} target="_blank">
                  Github
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}
