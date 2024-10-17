import { TMetadata } from '@/lib/types'
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'

export default function MagnifiedDock() {
  const mouseX = useMotionValue(Infinity) //Distance of mouse from left in x axis

  return (
    <div
      className="mx-auto flex h-16 items-end gap-4 rounded-2xl bg-gray-700 px-4 pb-3"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onTouchMove={(e) => mouseX.set(e.touches[0].clientX)}
      onTouchEnd={() => mouseX.set(Infinity)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {[...Array(6).keys()].map((index) => (
        <AppIcon key={index} mouseX={mouseX} />
      ))}
    </div>
  )
}

const AppIcon = ({ mouseX }: { mouseX: MotionValue }) => {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    const center = bounds.x + bounds.width / 2
    return val - center
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]) // used for describing how should animation happen according to mouse position
  const width = useSpring(widthSync, {
    stiffness: 1000,
    damping: 30,
    mass: 0.1,
  }) // giving it springy animation
  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square w-10 rounded-full bg-gray-200"
    ></motion.div>
  )
}

export const metadata: TMetadata = {
  title: 'Magnified Dock',
  description: 'Magnified Dock Inspired from Apple',
  features: [
    'Magnify the icons based on mouse hover position',
    'Springy animation effects',
  ],
}
