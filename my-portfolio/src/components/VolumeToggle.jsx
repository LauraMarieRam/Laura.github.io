import { useContext } from "react"
import { VolumeContext } from "../VolumeContext"
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io"

const VolumeToggle = () => {
  const { isVolumeOn, setIsVolumeOn } = useContext(VolumeContext)

  return (
    <button onClick={() => setIsVolumeOn(!isVolumeOn)} className="icon">
      {isVolumeOn ? <IoMdVolumeHigh size={24} /> : <IoMdVolumeOff size={24} />}
    </button>
  )
}

export default VolumeToggle
