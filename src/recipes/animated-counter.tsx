'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TMetadata } from '@/lib/types'
import { motion, MotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

const fontSize = 60
const padding = 10
const height = fontSize + padding
const digitWidth = 50

export const metadata: TMetadata = {
  title: 'Animated Counter',
  description: 'An animated counter component built with Framer Motion',
}

export default function AnimatedCounter() {
  const [inputValue, setInputValue] = useState(0)

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-yellow-300 to-red-500 p-4">
      <Card className="w-full max-w-md bg-black bg-opacity-80 text-white">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-yellow-400">
            Lucky Number Generator
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Enter your lucky number and watch it spin!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              min={0}
              max={999999}
              value={inputValue}
              onChange={(e) => {
                const newValue = isNaN(e.target.valueAsNumber)
                  ? 0
                  : Math.min(999999, Math.max(0, e.target.valueAsNumber))
                setInputValue(newValue)
              }}
              className="w-full bg-gray-800 text-white"
              placeholder="Enter a number (0-999999)"
            />
          </div>
          <Counter value={inputValue} />
        </CardContent>
      </Card>
    </div>
  )
}

const Counter = ({ value }: { value: number }) => {
  return (
    <div className="flex justify-center gap-2 rounded-lg bg-black p-4 shadow-inner">
      {[100000, 10000, 1000, 100, 10, 1].map((place) => (
        <Digit key={place} value={value} place={place} />
      ))}
    </div>
  )
}

const Digit = ({ value, place }: { value: number; place: number }) => {
  const placeValue = Math.floor((value / place) % 10) // which placed value we have to watch out for
  const animatedValue = useSpring(placeValue) //this is the value which user entered which we have to animate

  useEffect(() => {
    animatedValue.set(placeValue)
  }, [animatedValue, placeValue])

  return (
    <div
      style={{ height, width: digitWidth }}
      className="relative mx-[1px] overflow-hidden rounded-md bg-gray-800 text-6xl font-bold text-yellow-400"
    >
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black to-transparent opacity-50"></div>
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  )
}

const Number = ({ mv, number }: { mv: MotionValue; number: number }) => {
  //offset will define position of height whereas number is value of the number we selected
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10 // we only want to animate the last digit since we are only considering 1 digit
    //+10 is added to handle negative values
    // modulo 10 is used so our offset is always between 0-9
    const offset = (10 + number - placeValue) % 10

    let memo = offset * height

    //Flip the number after current selected number to reuse the span elements which were already calculated
    // it can be >2,>3,e.t.c. as well but cant be >0 as that will be the current selected number
    if (offset > 5) {
      memo -= 10 * height
    }
    return memo
  })

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  )
}
