import { useState, useEffect, useContext } from "react"
import { motion } from "framer-motion"
import { VolumeContext } from "../VolumeContext"

import cattail from "../assets/cat/cat tail0.png"
import cattail1 from "../assets/cat/cat tail1.png"
import cattail2 from "../assets/cat/cat tail2.png"
import catyawn1 from "../assets/cat/cat yawn1.png"
import catyawn2 from "../assets/cat/cat yawn2.png"
import catyawn3 from "../assets/cat/cat yawn3.png"
import catmeow from "../assets/audio/cat-yawn-meow.wav"

const backgroundFrames = [cattail, cattail2] // Looping animation
const yawnFrames = [catyawn1, catyawn2, catyawn3] // Yawn animation

const AnimatedFrames = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const [yawnIndex, setYawnIndex] = useState(null) // Null means use background animation
  const [isHovering, setIsLocalHovering] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false) // Track user interaction
  const { isVolumeOn } = useContext(VolumeContext)

  const audio = new Audio(catmeow)
  audio.preload = "auto" // Preload the audio file
  // Looping background animation

  useEffect(() => {
    if (isHovering) return // Pause looping animation during hover

    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgroundFrames.length)
    }, 500) // Change every 500ms

    return () => clearInterval(interval)
  }, [isHovering])

  // Yawn animation on hover
  useEffect(() => {
    if (!isHovering) return // Do nothing if not hovering

    let frame = 0
    const interval = setInterval(() => {
      if (frame < yawnFrames.length) {
        setYawnIndex(frame)
        frame++
      } else {
        setTimeout(() => {
          setYawnIndex(null) // Reset animation back to background frames
          setIsLocalHovering(false)
        }, 50) // Small delay to avoid flicker
      }
    }, 350) // Slightly increased time for smoother animation

    return () => clearInterval(interval)
  }, [isHovering]) // Handle user interaction (e.g., click anywhere)
  useEffect(() => {
    const handleClick = () => {
      setHasInteracted(true) // User has interacted with the page
    }

    // Add event listener for click anywhere on the document
    document.addEventListener("click", handleClick)

    // Cleanup on component unmount
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <motion.img
      src={
        isHovering && yawnIndex !== null
          ? yawnFrames[yawnIndex]
          : backgroundFrames[backgroundIndex] || cattail // Ensure fallback image
      }
      alt="Animated Cat"
      className="cat-animation"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onMouseOver={() => {
        setIsLocalHovering(true)
        setYawnIndex(0) // Start yawn animation from the first frame
        setTimeout(() => {
          if (hasInteracted && isVolumeOn) {
            audio.play() // Play audio on hover, after user interaction
          }
        }, 600)
      }}
      onMouseLeave={() => {
        setTimeout(() => {
          setYawnIndex(null)
          setIsLocalHovering(false)
        }, 10) // Delay prevents brief disappearance
      }}
    />
  )
}

export default AnimatedFrames
