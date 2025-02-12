import React, { useRef, useEffect, useState, useCallback } from "react"
import "./App.css"
import AnimatedFrames from "./components/AnimatedFrames"
import TechLogo from "./components/TechLogo"
import Canvas from "./components/Canvas"
const NUM_STARS = 50

// ✅ Ensure stars cover the full scrollable height
const generateStars = () => {
  const pageHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
    document.body.clientHeight,
    window.innerHeight
  )

  return Array.from({ length: NUM_STARS }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * pageHeight, // ✅ Full page height coverage
    size: Math.random() * 5 + 5,
    opacity: Math.random(),
    speed: Math.random() * 0.1 + 0.2
  }))
}

const App = () => {
  const [stars, setStars] = useState([])
  const [scrollY, setScrollY] = useState(0)
  const canvasRef = useRef(null)
  const scrollRef = useRef(null) // ✅ Keeping your scroll reference

  // ✅ Generate stars once page has loaded
  useEffect(() => {
    setStars(generateStars())
  }, [])

  // ✅ Update stars if page resizes
  useEffect(() => {
    const handleResize = () => setStars(generateStars())
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const drawCanvas = useCallback(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current.getCanvas()
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    stars.forEach((star, index) => {
      const flickerSpeed = 0.01
      const flicker = (Math.sin(scrollY * flickerSpeed + index * 0.5) + 1) / 2
      const minScale = 0.5
      const maxScale = 2.0
      const sizeScale = minScale + (maxScale - minScale) * flicker

      const newY = star.y + scrollY * star.speed * 0.15
      const size = star.size * sizeScale

      ctx.fillStyle = `rgba(253, 186, 95, ${star.opacity * flicker})`
      drawSparkle(ctx, star.x, newY % canvas.height, size)
    })
  }, [scrollY, stars])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      drawCanvas()
    }

    window.addEventListener("scroll", handleScroll)
    drawCanvas()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [drawCanvas])

  const drawSparkle = (ctx, x, y, size) => {
    ctx.beginPath()
    ctx.moveTo(x, y - size * 1.5) // 🔥 Taller Top point
    ctx.lineTo(x + size * 0.3, y - size * 0.5) // Upper right (shorter width)
    ctx.lineTo(x + size * 0.8, y) // Right point (narrower)
    ctx.lineTo(x + size * 0.3, y + size * 0.5) // Lower right
    ctx.lineTo(x, y + size * 1.5) // 🔥 Taller Bottom point
    ctx.lineTo(x - size * 0.3, y + size * 0.5) // Lower left
    ctx.lineTo(x - size * 0.8, y) // Left point (narrower)
    ctx.lineTo(x - size * 0.3, y - size * 0.5) // Upper left
    ctx.closePath()
    ctx.fill()
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = clientWidth / 2
      scrollRef.current.scrollTo({
        left: scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth"
      })
    }
  }
  return (
    <div>
      <Canvas ref={canvasRef} className="canvas-background" />
      <div>
        <header>
          <div className="title">
            <div className="cat-image">
              <AnimatedFrames />
            </div>
            <h1>Laura Savaglia</h1>
          </div>
          <nav>
            <ul>
              <li>
                <a href="#technologies">Technologies I Work With</a>
              </li>
              <li>
                <a href="#projects">Cool Stuff I've Built</a>
              </li>
              <li>
                <a href="#cv">CV</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#hobbies">Hobbies</a>
              </li>
            </ul>
          </nav>
        </header>
        <div className="centered-page">
          <section id="about">
            <p>
              I am a passionate software developer with experience in full-stack development, AI,
              and game development. Skilled in TypeScript, React, Python, and cloud technologies, I
              thrive on building innovative solutions. With a strong foundation in both academia and
              industry, I bring a blend of technical expertise and creativity to every project.
            </p>
          </section>

          <section id="technologies">
            <h2>Technologies I Work With</h2>
            <div className="scroll-container">
              <button className="scroll-button left" onClick={() => scroll("left")}>
                ‹
              </button>
              <div className="horizontal-scroll" ref={scrollRef}>
                <TechLogo tech="JavaScript" />
                <TechLogo tech="React" />
                <TechLogo tech="TypeScript" />
                <TechLogo tech="Docker" />
                <TechLogo tech="Vue" />
                <TechLogo tech="AWS" />
                <TechLogo tech="Android Studio" />
                <TechLogo tech="Azure" />
                <TechLogo tech="DynamoDB" />
                <TechLogo tech="Git" />
                <TechLogo tech="NodeJS" />
                <TechLogo tech="PostgreSQL" />
                <TechLogo tech="Unity" />
                <TechLogo tech="Unreal Engine" />
              </div>
              <button className="scroll-button right" onClick={() => scroll("right")}>
                ›
              </button>
            </div>
          </section>

          <section id="projects">
            <h2>Cool Stuff I've Built</h2>
            <div className="project">
              <h3>Translucent</h3>
              <p>Description of the first project.</p>
            </div>
            <div className="project">
              <h3>Project 2</h3>
              <p>Description of the second project.</p>
            </div>
          </section>

          <section id="cv">
            <h2>Experience</h2>
            <div className="job">
              <h3>Previous Employer 1</h3>
              <p>Role and responsibilities.</p>
            </div>
            <div className="job">
              <h3>Previous Employer 2</h3>
              <p>Role and responsibilities.</p>
            </div>
          </section>

          <section id="contact">
            <h2>Contact</h2>
            <p>Email: developer@example.com</p>
          </section>
          <section id="hobbies">
            <h2>Hobbies</h2>
            <p>Programming, Dance, Saying "big yawn" whenever my cat yawns</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
