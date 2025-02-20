import { createContext, useState } from "react"

export const VolumeContext = createContext()

export const VolumeProvider = ({ children }) => {
  const [isVolumeOn, setIsVolumeOn] = useState(false)

  return (
    <VolumeContext.Provider value={{ isVolumeOn, setIsVolumeOn }}>
      {children}
    </VolumeContext.Provider>
  )
}
