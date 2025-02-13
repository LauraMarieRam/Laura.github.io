import React, { useRef } from "react"
import Draggable from "react-draggable"
import "./draggable_item.css" // Or wherever your CSS file is located

const DraggableItem = ({ image }) => {
  const nodeRef = useRef(null) // Use ref instead of findDOMNode

  return (
    <Draggable nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        className="p-4 bg-white shadow-lg rounded-lg border border-gray-300 cursor-move fish-holder"
      >
        <img draggable="false" src={image} alt="Draggable fish" className="object-cover fishy" />
      </div>
    </Draggable>
  )
}

export default DraggableItem
