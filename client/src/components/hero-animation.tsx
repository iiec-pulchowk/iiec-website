"use client"
import { motion } from "framer-motion"

export default function HeroAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute w-32 h-32 bg-blue-500 rounded-2xl opacity-80"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          borderRadius: ["20%", "50%", "20%"],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{ left: "20%", top: "30%" }}
      />
      <motion.div
        className="absolute w-24 h-24 bg-purple-500 rounded-full opacity-80"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{ right: "30%", bottom: "40%" }}
      />
      <motion.div
        className="absolute w-20 h-20 bg-green-500 rounded-lg opacity-80"
        animate={{
          rotate: [0, 180, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{ right: "20%", top: "20%" }}
      />
      <motion.div
        className="absolute w-28 h-28 bg-yellow-500 rounded-3xl opacity-80"
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
          rotate: [0, -60, 0],
        }}
        transition={{
          duration: 7,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{ left: "30%", bottom: "20%" }}
      />
      <motion.div
        className="absolute w-40 h-40 border-4 border-dashed border-primary rounded-full opacity-30"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  )
}
