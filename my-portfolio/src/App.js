import React, { useRef, useEffect, useState, useCallback } from "react"
import "./styles/global.css"
import TechLogo from "./components/TechLogo"
import Canvas from "./components/Canvas"
import DraggableItem from "./components/DraggableItem"
import Translay from "./assets/my-projects/translator-app-logo.png"
import MonsterBakery from "./assets/my-projects/monster_bakery.png"
import Novelore from "./assets/my-projects/novelore.png"
import AWSDevAss from "./assets/certs/aws_developer_associate.png"
import ProScrumDev from "./assets/certs/professional_scrum_developer.png"

import VolumeToggle from "./components/VolumeToggle"
import { VolumeProvider } from "./VolumeContext" // Import the provider
import DangerZone from "./components/DangerZone"
import ExperienceCard from "./components/ExperienceCard"
import Nukon from "./assets/jobs/nukon-logo.png"
import SageAuto from "./assets/jobs/sage-automation-logo.png"
import FlindersUni from "./assets/jobs/flinders_logo.png"
import FUCS from "./assets/jobs/fucs.png"
import FlindersStudentCouncil from "./assets/jobs/flinders_student_council.png"
import Valnet from "./assets/jobs/valnet.png"
import Datacom from "./assets/jobs/datacom.png"

import ProjectCard from "./components/ProjectCard"

import Fishy from "./assets/fishy/fishy.png"
import EducationCard from "./components/EducationCard"
const NUM_STARS = 75

// ✅ Ensure stars cover the full scrollable height
const generateStars = () => {
  console.log("generating stars...")

  console.log(`document.body.clientHeight: ${document.body.clientHeight}`)
  console.log(`  window.innerHeight: ${window.innerHeight}`)

  const pageHeight = Math.max(
    // document.documentElement.scrollHeight,
    // document.body.scrollHeight,
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
  const projectsScrollRef = useRef(null)
  const techScrollRef = useRef(null)

  const [isVolumeOn, setIsVolumeOn] = useState(false)
  const [dangerZoneRef, setDangerZoneRef] = useState(null)
  const [isHovering, setIsHovering] = useState(false)

  // ✅ Generate stars once page has loaded
  useEffect(() => {
    setStars(generateStars())
  }, [])
  console.log("Script started executing...")

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

      // Update the Y position of the stars based on scroll
      let newY = star.y + scrollY * star.speed * 0.15
      const size = star.size * sizeScale

      // // Prevent the star from going beyond the bottom of the canvas
      // if (newY > canvas.height) {
      //   newY = Math.random() * canvas.height // Reset star to top
      //   star.x = Math.random() * canvas.width // Reset to a new random x position
      // }

      ctx.fillStyle = `rgba(253, 186, 95, ${star.opacity * flicker})`
      drawSparkle(ctx, star.x, newY, size) // Draw the star
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
    ctx.moveTo(x, y - size * 1.2) // 🔥 Taller Top point
    ctx.lineTo(x + size * 0.3, y - size * 0.5) // Upper right (shorter width)
    ctx.lineTo(x + size * 0.8, y) // Right point (narrower)
    ctx.lineTo(x + size * 0.3, y + size * 0.5) // Lower right
    ctx.lineTo(x, y + size * 1.2) // 🔥 Taller Bottom point
    ctx.lineTo(x - size * 0.3, y + size * 0.5) // Lower left
    ctx.lineTo(x - size * 0.8, y) // Left point (narrower)
    ctx.lineTo(x - size * 0.3, y - size * 0.5) // Upper left
    ctx.closePath()
    ctx.fill()
  }

  const scroll = (direction, ref) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current
      const scrollAmount = clientWidth / 2
      ref.current.scrollTo({
        left: scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth"
      })
    }
  }
  return (
    <div>
      <Canvas ref={canvasRef} className="canvas-background" />
      <VolumeProvider>
        <div>
          <div className="volume-container">
            <VolumeToggle onToggleVolume={setIsVolumeOn} />{" "}
          </div>
          <header>
            <div className="title">
              <div className="cat-image">
                <DangerZone setDangerZoneRef={setDangerZoneRef} />
              </div>{" "}
              <div className="title-text">Laura Savaglia</div>
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
                  <a href="#experience">Experience</a>
                </li>{" "}
                <li>
                  <a href="#education">Education</a>
                </li>
                <li>
                  <a href="#certifications">Certifications</a>
                </li>
                <li>
                  <a href="#hobbies">Hobbies</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </nav>
            <div className="fishy-container">
              <DraggableItem image={Fishy} dangerZoneRef={dangerZoneRef}></DraggableItem>
            </div>
          </header>
          <div className="centered-page">
            <section id="about">
              <div className="bio">
                I am a passionate software developer with experience in full-stack development, AI,
                and game development. Skilled in TypeScript, React, Python, and cloud technologies,
                I thrive on building innovative solutions. With a strong foundation in both academia
                and industry, I bring a blend of technical expertise and creativity to every
                project.
              </div>
            </section>
            <section id="technologies">
              <h2>Technologies I Work With</h2>
              <div className="scroll-container">
                <button
                  className="scroll-button left"
                  onClick={() => scroll("left", techScrollRef)}
                >
                  ‹
                </button>
                <div className="horizontal-scroll" ref={techScrollRef}>
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
                  <TechLogo tech="Python" />
                  <TechLogo tech="C++" />
                  <TechLogo tech="C#" />
                </div>
                <button
                  className="scroll-button right"
                  onClick={() => scroll("right", techScrollRef)}
                >
                  ›
                </button>
              </div>
            </section>
            <section id="projects">
              <h2 className="flex-centred">Cool Stuff I've Built</h2>
              <div className="flex-row">
                {" "}
                <div className="scroll-container">
                  <button
                    className="scroll-button left"
                    onClick={() => scroll("left", projectsScrollRef)}
                  >
                    ‹
                  </button>
                  <div className="horizontal-scroll" ref={projectsScrollRef}>
                    <ProjectCard title="Translay" image={Translay} summary={"Coming Soon..."} />
                    <ProjectCard title="Novelore" image={Novelore} summary={"Coming Soon..."} />
                    <ProjectCard
                      title="Monster Bakery"
                      image={MonsterBakery}
                      summary={"Coming Soon..."}
                    />
                  </div>
                  <button
                    className="scroll-button right"
                    onClick={() => scroll("right", projectsScrollRef)}
                  >
                    ›
                  </button>
                </div>
              </div>
            </section>
            <section>
              <h2>Experience</h2>
              <div id="experience">
                {" "}
                <div className="">
                  <div className="job">
                    <ExperienceCard
                      employer="Nukon (Sage Group)"
                      employerLogo={Nukon}
                      title="Developer"
                      summary="Where I support our partners with a wide variety of systems by using a host of technologies, including but not limited to:"
                      duties={["Typescript", "React", "AWS", "Azure", "Python"]}
                      startDate="Nov 23"
                      endDate="Present"
                      latest={true}
                    />
                  </div>
                  <div className="job">
                    <ExperienceCard
                      employer="Sage Automation (Sage Group)"
                      employerLogo={SageAuto}
                      title="Engineering Intern"
                      summary="During which I used the following technologies to build a conversational fact gathering artificial intelligence:"
                      duties={["Typescript", "Vue", "Gitlab"]}
                      startDate="Jul 2023"
                      endDate="Dec 2023"
                    />
                    <div className="job">
                      <ExperienceCard
                        employer="Flinders University College of Science and Engineering"
                        employerLogo={FlindersUni}
                        title="Casual Academic Staff"
                        summary="Where I performed various duties including:"
                        duties={[
                          "Lecturing on The Fundamentals of Computational Intelligence",
                          "Grading",
                          "Advising on Curriculum",
                          "Mentoring Students"
                        ]}
                        startDate="Feb 22"
                        endDate="Jul 23"
                      />
                    </div>

                    <div className="job">
                      <ExperienceCard
                        employer="Flinders University"
                        employerLogo={FlindersUni}
                        title="Summer Research Award"
                        summary="During which I used the following technologies to build a novel-writing AI:"
                        duties={[
                          "Unity 5",
                          "Neural Network Object Recognition Software",
                          "C-Sharp"
                        ]}
                        startDate="Dec 21"
                        endDate="Feb 22"
                      />
                    </div>

                    <div className="job">
                      <ExperienceCard
                        employer="Flinders University Computer Society"
                        employerLogo={FUCS}
                        title="President"
                        summary="Where I perform various tasks including:"
                        duties={[
                          "Running and organising events for computer science students",
                          "Assisting students during computing related events and study sessions",
                          "Liaising with businesses and organisations"
                        ]}
                        startDate="Mar 22"
                        endDate="Jul 23"
                      />
                    </div>

                    <div className="job">
                      <ExperienceCard
                        employer="Flinders University Computer Society"
                        employerLogo={FUCS}
                        title="Outreach Officer"
                        startDate="Aug 21"
                        endDate="Mar 22"
                      />
                    </div>

                    <div className="job">
                      <ExperienceCard
                        employer="Flinders University Student Council"
                        employerLogo={FlindersStudentCouncil}
                        title="General Council Member"
                        startDate="Dec 18"
                        endDate="Nov 19"
                      />
                    </div>

                    <div className="job">
                      <ExperienceCard
                        employer="Valnet"
                        employerLogo={Valnet}
                        title="Content Writer"
                        startDate="Jan 21"
                        endDate="Aug 21"
                      />
                    </div>

                    <div className="job">
                      <ExperienceCard
                        employer="Datacom (Australian Government DHS)"
                        employerLogo={Datacom}
                        title="Service Delivery Officer"
                        startDate="Nov 18"
                        endDate="May 20"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>{" "}
            <section id="education">
              <h2>Education</h2>
              <div className="flex-row">
                <EducationCard
                  uniLogo={FlindersUni}
                  degree="Bachelor of Computer Science"
                  university="Flinders University"
                  dateRange="2021 - 2024"
                ></EducationCard>{" "}
                <EducationCard
                  uniLogo={FlindersUni}
                  degree="Bachelor of Creative Arts (Digital Media)"
                  university="Flinders University"
                  dateRange="2016 - 2021"
                ></EducationCard>
              </div>
            </section>{" "}
            <section id="certifications">
              <h2>Certifications</h2>
              <a href="https://www.credly.com/badges/2f4b8764-54b6-4301-bcf8-6623e7ba1fa9">
                <img className="cert" alt="aws associate developer" src={AWSDevAss} />
              </a>{" "}
              <a href="https://www.credly.com/badges/e889b6b3-4f25-4ca3-90b6-8d4ab166cf3e">
                <img className="cert" alt="professional scrum developer" src={ProScrumDev} />{" "}
              </a>
            </section>{" "}
            <section id="hobbies">
              <h2>Hobbies</h2>
              <p>
                Programming, dance, writing, electric guitar, saying "big yawn" whenever my cat
                yawns.
              </p>
            </section>{" "}
            <section id="contact">
              <h2>Contact</h2>
              <p>
                <a href="mailto:laura.savaglia@outlook.com">Email Me</a>
              </p>
            </section>
            <section id="built-with">
              <p>This website was built with React.</p>
            </section>
          </div>
        </div>{" "}
      </VolumeProvider>
    </div>
  )
}

export default App
