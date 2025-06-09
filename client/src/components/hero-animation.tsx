// "use client"
// import { motion } from "framer-motion"

// export default function HeroAnimation() {
//   return (
//     <div className="relative w-full h-full flex items-center justify-center">
//       <motion.div
//         className="absolute w-32 h-32 bg-blue-500 rounded-2xl opacity-80"
//         animate={{
//           scale: [1, 1.2, 1],
//           rotate: [0, 90, 0],
//           borderRadius: ["20%", "50%", "20%"],
//         }}
//         transition={{
//           duration: 5,
//           ease: "easeInOut",
//           repeat: Number.POSITIVE_INFINITY,
//         }}
//         style={{ left: "20%", top: "30%" }}
//       />
//       <motion.div
//         className="absolute w-24 h-24 bg-purple-500 rounded-full opacity-80"
//         animate={{
//           y: [0, -30, 0],
//           x: [0, 20, 0],
//           scale: [1, 1.1, 1],
//         }}
//         transition={{
//           duration: 4,
//           ease: "easeInOut",
//           repeat: Number.POSITIVE_INFINITY,
//         }}
//         style={{ right: "30%", bottom: "40%" }}
//       />
//       <motion.div
//         className="absolute w-20 h-20 bg-green-500 rounded-lg opacity-80"
//         animate={{
//           rotate: [0, 180, 0],
//           scale: [1, 1.3, 1],
//         }}
//         transition={{
//           duration: 6,
//           ease: "easeInOut",
//           repeat: Number.POSITIVE_INFINITY,
//         }}
//         style={{ right: "20%", top: "20%" }}
//       />
//       <motion.div
//         className="absolute w-28 h-28 bg-yellow-500 rounded-3xl opacity-80"
//         animate={{
//           x: [0, 30, 0],
//           y: [0, 20, 0],
//           rotate: [0, -60, 0],
//         }}
//         transition={{
//           duration: 7,
//           ease: "easeInOut",
//           repeat: Number.POSITIVE_INFINITY,
//         }}
//         style={{ left: "30%", bottom: "20%" }}
//       />
//       <motion.div
//         className="absolute w-40 h-40 border-4 border-dashed border-primary rounded-full opacity-30"
//         animate={{
//           rotate: [0, 360],
//         }}
//         transition={{
//           duration: 20,
//           ease: "linear",
//           repeat: Number.POSITIVE_INFINITY,
//         }}
//       />
//     </div>
//   )
// }

"use client"
import { motion } from "framer-motion"

export default function HeroAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      {/* Central IIEC Formation */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Letter I */}
        <motion.div
          className="w-12 h-16 bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg mx-1 flex items-center justify-center text-white font-bold text-2xl shadow-lg"
          initial={{ x: -200, y: -100, rotate: -45, opacity: 0 }}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, type: "spring", stiffness: 100 }}
        >
          I
        </motion.div>

        {/* Letter I */}
        <motion.div
          className="w-12 h-16 bg-gradient-to-b from-purple-500 to-purple-600 rounded-lg mx-1 flex items-center justify-center text-white font-bold text-2xl shadow-lg"
          initial={{ x: 200, y: 100, rotate: 45, opacity: 0 }}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 2, delay: 0.8, type: "spring", stiffness: 100 }}
        >
          I
        </motion.div>

        {/* Letter E */}
        <motion.div
          className="w-12 h-16 bg-gradient-to-b from-green-500 to-green-600 rounded-lg mx-1 flex items-center justify-center text-white font-bold text-2xl shadow-lg"
          initial={{ x: -100, y: 200, rotate: 90, opacity: 0 }}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 2, delay: 1.1, type: "spring", stiffness: 100 }}
        >
          E
        </motion.div>

        {/* Letter C */}
        <motion.div
          className="w-12 h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-lg mx-1 flex items-center justify-center text-white font-bold text-2xl shadow-lg"
          initial={{ x: 100, y: -200, rotate: -90, opacity: 0 }}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 2, delay: 1.4, type: "spring", stiffness: 100 }}
        >
          C
        </motion.div>
      </div>

      {/* Floating Innovation Elements */}

      {/* Lightbulb - Innovation Symbol */}
      <motion.div
        className="absolute w-16 h-16 bg-yellow-400 rounded-full opacity-80"
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
          boxShadow: ["0 0 0 rgba(250, 204, 21, 0)", "0 0 20px rgba(250, 204, 21, 0.6)", "0 0 0 rgba(250, 204, 21, 0)"]
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{ left: "5%", top: "5%" }}
      >
        <div className="w-full h-full rounded-full relative">
          <div className="absolute inset-1 bg-yellow-300 rounded-full"></div>
        </div>
      </motion.div>

      {/* Gear - Incubation Process */}
      <motion.div
        className="absolute w-20 h-20 border-4 border-gray-600 rounded-lg opacity-70"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{ right: "0%", top: "0%" }}
      >
        <div className="absolute inset-1 border-2 border-gray-500 rounded-sm"></div>
      </motion.div>

      {/* Growth Arrow - Entrepreneurship */}
      <motion.div
        className="absolute w-32 h-8 bg-green-500 opacity-80"
        animate={{
          x: [0, 30, 0],
          scaleX: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{ right: "15%", bottom: "10%" }}
      >
        <div className="w-full h-full relative">
          <div className="absolute right-0 top-0 w-0 h-0 border-l-8 border-l-green-500 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
      </motion.div>

      {/* Network Nodes - Collaboration */}
      <motion.div
        className="absolute w-12 h-12 bg-blue-400 rounded-full opacity-60"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{ left: "15%", bottom: "5%" }}
      />

      <motion.div
        className="absolute w-4 h-4 bg-purple-400 rounded-full opacity-60"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          delay: 1,
        }}
        style={{ left: "25%", bottom: "15%" }}
      />

      {/* Floating Particles */}
      <motion.div
        className="absolute w-6 h-6 bg-pink-400 rounded-full opacity-50"
        animate={{
          y: [0, -20, 0],
          x: [0, 20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{ right: "5%", bottom: "5%" }}
      />

      <motion.div
        className="absolute w-4 h-4 bg-indigo-400 rounded-full opacity-60"
        animate={{
          y: [0, -35, 0],
          x: [0, -25, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4.5,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          delay: 2,
        }}
        style={{ left: "5%", top: "40%" }}
      />

      {/* Orbiting Ring - Ecosystem */}
      <motion.div
        className="absolute w-80 h-80 border-4 border-dotted border-gray-300 rounded-full opacity-70"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      {/* Inner Ring */}
      <motion.div
        className="absolute w-60 h-60 border-2 border-dashed border-violet-300 rounded-full opacity-80"
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  )
}
