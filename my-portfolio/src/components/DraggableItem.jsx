import React, { useRef, useState, useEffect } from "react"
import Draggable from "react-draggable"
import { motion } from "framer-motion"
import "../styles/draggable_item.css"

// Image Imports
import Fishy from "../assets/fishy/fishy.png"
import FishyBitten1 from "../assets/fishy/fishy-bitten-1.png"
import FishyBitten2 from "../assets/fishy/fishy-bitten-2.png"
import FishyBitten3 from "../assets/fishy/fishy-bitten-3.png"
import FishyBitten4 from "../assets/fishy/fishy-bitten-4.png"
import FishyBitten5 from "../assets/fishy/fishy-bitten-5.png"

const DraggableItem = ({ dangerZoneRef }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [fishyState, setFishyState] = useState(Fishy)
  const [biteStage, setBiteStage] = useState(0)
  const [isDestroyed, setIsDestroyed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false) // Track if animation is running

  const biteFrames = [FishyBitten1, FishyBitten2, FishyBitten3, FishyBitten4, FishyBitten5]

  const fishyRef = useRef(null)

  // Function to check collision with Danger Zone
  const checkCollision = () => {
    if (!fishyRef.current || !dangerZoneRef?.current) return

    const fishyRect = fishyRef.current.getBoundingClientRect()
    const dangerRect = dangerZoneRef.current.getBoundingClientRect()

    if (
      fishyRect.left < dangerRect.right &&
      fishyRect.right > dangerRect.left &&
      fishyRect.top < dangerRect.bottom &&
      fishyRect.bottom > dangerRect.top
    ) {
      if (!isAnimating && biteStage < biteFrames.length) {
        setIsAnimating(true)
        playBiteAnimation(biteStage) // Start from the current stage
      }
    } else {
      setIsAnimating(false) // Reset when leaving danger zone
    }
  }

  const playBiteAnimation = (currentStage) => {
    // if (currentStage >= biteFrames.length) return // Stop if fully bitten

    const animateBites = (stage) => {
      if (stage >= biteFrames.length) {
        setTimeout(() => setIsDestroyed(true), 1000) // Delay before disappearing
        return
      }

      // 🔥 Instantly update the bite stage
      setFishyState(biteFrames[stage])
      setBiteStage(stage + 1)

      // ✅ Delay happens AFTER updating, before moving to the next stage
      setTimeout(() => {
        // Check if still in the danger zone before continuing
        if (!fishyRef.current || !dangerZoneRef?.current) return

        const fishyRect = fishyRef.current.getBoundingClientRect()
        const dangerRect = dangerZoneRef.current.getBoundingClientRect()

        if (
          fishyRect.left < dangerRect.right &&
          fishyRect.right > dangerRect.left &&
          fishyRect.top < dangerRect.bottom &&
          fishyRect.bottom > dangerRect.top
        ) {
          animateBites(stage + 1) // Continue animation after delay
        } else {
          setIsAnimating(false) // Stop animation if fish leaves
        }
      }, 1000) // ⏳ Delay happens AFTER updating
    }

    animateBites(currentStage) // Start from the current stage
  }

  if (isDestroyed) return null // Remove Fishy if completely bitten

  return (
    <Draggable
      nodeRef={fishyRef}
      position={position}
      onDrag={checkCollision} // ✅ Check collision while dragging
    >
      <motion.div ref={fishyRef} className="fishy-container">
        <motion.img draggable="false" src={fishyState} alt="Fishy" className="fishy" />
      </motion.div>
    </Draggable>
  )
}

export default DraggableItem
