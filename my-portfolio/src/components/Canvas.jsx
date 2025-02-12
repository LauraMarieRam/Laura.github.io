import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react"

const Canvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null)

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current // ✅ Allow parent component to access the canvas
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return // ✅ Prevent errors if the canvas is not ready

    // Set canvas to full width & height of its parent container
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth
        canvas.height = canvas.parentElement.clientHeight
      }
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} {...props} />
})

export default Canvas
