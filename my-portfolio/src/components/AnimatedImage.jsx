import { useState, useEffect } from "react"
import { motion } from "framer-motion"
// import "../components/animated_image.css"

import cat from "../assets/cat yawn.png"
import cattail from "../assets/cat yawn0.png"
import catyawn1 from "../assets/cat yawn1.png"
import catyawn2 from "../assets/cat yawn2.png"
import catyawn3 from "../assets/cat yawn3.png"

const backgroundFrames = [cat, cattail] // Looping animation
const yawnFrames = [catyawn1, catyawn2, catyawn3] // Yawn animation

const AnimatedFrames = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const [yawnIndex, setYawnIndex] = useState(null) // Null means use background animation
  const [isHovering, setIsHovering] = useState(false)

  // Looping background animation
  useEffect(() => {
    if (isHovering) return // Pause looping animation during hover

    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgroundFrames.length)
    }, 500) // Change every 500ms

    return () => clearInterval(interval)
  }, [isHovering]) // Restart when hover state changes

  // Handle hover event
  useEffect(() => {
    if (!isHovering) return // Do nothing if not hovering

    let frame = 0
    const interval = setInterval(() => {
      if (frame < yawnFrames.length) {
        setYawnIndex(frame)
        frame++
      } else {
        setIsHovering(false) // Reset back to normal animation
      }
    }, 300) // Faster transition for yawn

    return () => clearInterval(interval)
  }, [isHovering])

  return (
    <motion.img
      key={isHovering ? `yawn-${yawnIndex}` : `bg-${backgroundIndex}`} // Ensures smooth transition
      src={
        isHovering && yawnIndex !== null ? yawnFrames[yawnIndex] : backgroundFrames[backgroundIndex]
      }
      alt="Animated Cat"
      className="cat-animation"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onMouseOver={() => {
        setIsHovering(true)
        setYawnIndex(0) // Start yawn animation from the first frame
      }}
      onMouseLeave={() => {
        setIsHovering(false)
        setYawnIndex(null) // Reset to background animation
      }}
    />
  )
}

export default AnimatedFrames
