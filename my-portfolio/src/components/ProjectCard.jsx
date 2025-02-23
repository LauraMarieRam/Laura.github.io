import React from "react"
import "../styles/project_card.css"

const ExperienceCard = ({ image, title, summary, link }) => {
  return (
    <div className="project flex-centered-column">
      <h3>{title}</h3>
      <img src={image} className="translay-logo" alt="my translator application"></img>
      <p>{summary}</p>
    </div>
  )
}

export default ExperienceCard
