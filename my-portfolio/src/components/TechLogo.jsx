import "../styles/tech_logo.css"

import JS from "../assets/tech-stack/js.png"
import TS from "../assets/tech-stack/ts.png"
import Docker from "../assets/tech-stack/docker.png"
import AWS from "../assets/tech-stack/aws.png"
import AndroidStudio from "../assets/tech-stack/android_studio.png"
import Azure from "../assets/tech-stack/azure.png"
import DynamoDb from "../assets/tech-stack/dynamodb.png"
import Git from "../assets/tech-stack/git.png"
import NodeJS from "../assets/tech-stack/nodejs.png"
import PostgreSQL from "../assets/tech-stack/postgresql.png"
import ReactImage from "../assets/tech-stack/react.png"
import Unity from "../assets/tech-stack/unity.png"
import UnrealEngine from "../assets/tech-stack/unreal_engine.png"
import Vue from "../assets/tech-stack/vue.png"
import Python from "../assets/tech-stack/python.png"
import CPlus from "../assets/tech-stack/cplusplus.png"
import CSharp from "../assets/tech-stack/csharp.png"

// Map of tech names to their corresponding images
const techMap = {
  JavaScript: { image: JS, name: "JavaScript" },
  TypeScript: { image: TS, name: "TypeScript" },
  Docker: { image: Docker, name: "Docker" },
  AWS: { image: AWS, name: "AWS" },
  "Android Studio": { image: AndroidStudio, name: "Android Studio" },
  Azure: { image: Azure, name: "Azure" },
  DynamoDB: { image: DynamoDb, name: "DynamoDB" },
  Git: { image: Git, name: "Git" },
  NodeJS: { image: NodeJS, name: "Node.js" },
  PostgreSQL: { image: PostgreSQL, name: "PostgreSQL" },
  React: { image: ReactImage, name: "React" },
  Unity: { image: Unity, name: "Unity" },
  "Unreal Engine": { image: UnrealEngine, name: "Unreal Engine" },
  Vue: { image: Vue, name: "Vue.js" },
  "C++": { image: CPlus, name: "C++" },
  "C#": { image: CSharp, name: "C#" },
  Python: { image: Python, name: "Python" }
}

const TechLogo = ({ tech }) => {
  // Get the tech data from the map
  const techData = techMap[tech] || null

  if (!techData) return null // If tech is not found, render nothing

  return (
    <div className="tech-logo-container">
      <img className="tech-logo" src={techData.image} alt={techData.name} />
      <div className="tech-logo-text">{techData.name}</div>
    </div>
  )
}

export default TechLogo
