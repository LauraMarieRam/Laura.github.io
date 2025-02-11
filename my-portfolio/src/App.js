import React from "react"
import "./App.css"
import cat from "./assets/cat yawn.png"
import AnimatedFrames from "./components/AnimatedImage"
import TechLogo from "./components/TechLogo"
import JS from "./assets/tech-stack/js.png"
import TS from "./assets/tech-stack/ts.png"
import Docker from "./assets/tech-stack/docker.png"
import AWS from "./assets/tech-stack/aws.png"
import AndroidStudio from "./assets/tech-stack/android_studio.png"
import Azure from "./assets/tech-stack/azure.png"
import DynamoDb from "./assets/tech-stack/dynamodb.png"
import Git from "./assets/tech-stack/git.png"
import NodeJS from "./assets/tech-stack/nodejs.png"
import PostgreSQL from "./assets/tech-stack/postgresql.png"
import ReactImage from "./assets/tech-stack/react.png"
import Unity from "./assets/tech-stack/unity.png"
import UnrealEngine from "./assets/tech-stack/unreal_engine.png"
import Vue from "./assets/tech-stack/vue.png"

const App = () => {
  return (
    <div>
      <header>
        <div className="title">
          <div className="cat-image">
            <AnimatedFrames></AnimatedFrames>
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
          </ul>
        </nav>
      </header>
      <div className="centered-page">
        <section id="about">
          <p>
            I am a passionate software developer with experience in full-stack development, AI, and
            game development. Skilled in TypeScript, React, Python, and cloud technologies, I thrive
            on building innovative solutions. With a strong foundation in both academia and
            industry, I bring a blend of technical expertise and creativity to every project.
          </p>
        </section>

        <section id="technologies">
          <h2>Technologies I Work With</h2>
          <div>
            <TechLogo image={JS}></TechLogo> <TechLogo image={ReactImage}></TechLogo>{" "}
            <TechLogo image={TS}></TechLogo> <TechLogo image={Docker}></TechLogo>{" "}
            <TechLogo image={Vue}></TechLogo> <TechLogo image={AWS}></TechLogo>{" "}
            <TechLogo image={AndroidStudio}></TechLogo> <TechLogo image={Azure}></TechLogo>{" "}
            <TechLogo image={DynamoDb}></TechLogo> <TechLogo image={Git}></TechLogo>{" "}
            <TechLogo image={NodeJS}></TechLogo> <TechLogo image={PostgreSQL}></TechLogo>{" "}
            <TechLogo image={Unity}></TechLogo> <TechLogo image={UnrealEngine}></TechLogo>{" "}
          </div>
        </section>

        <section id="projects">
          <h2>Cool Stuff I've Built</h2>
          <div className="project">
            <h3>Project 1</h3>
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
      </div>
    </div>
  )
}

export default App
