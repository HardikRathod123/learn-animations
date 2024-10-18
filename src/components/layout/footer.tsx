'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-100 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto px-4 text-center text-gray-600">
        © {new Date().getFullYear()} Learn Animations. All rights reserved.
      </div>
    </motion.footer>
  )
}
