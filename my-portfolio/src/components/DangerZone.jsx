import React, { useRef, useEffect } from "react"
import AnimatedCat from "../components/AnimatedCat"

const DangerZone = ({ setDangerZoneRef }) => {
  const dangerZoneRef = useRef(null)

  useEffect(() => {
    if (setDangerZoneRef) {
      setDangerZoneRef(dangerZoneRef)
    }
  }, [setDangerZoneRef])

  return (
    <div ref={dangerZoneRef} className="danger-zone">
      <AnimatedCat />{" "}
    </div>
  )
}

export default DangerZone
