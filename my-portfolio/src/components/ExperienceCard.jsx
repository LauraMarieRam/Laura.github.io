import React from "react"
import "../styles/experience_card.css"

const ExperienceCard = ({ employer, title, employerLogo, summary, startDate, endDate, latest }) => {
  return (
    <div className="card">
      {" "}
      <div className="flex-row">
        <img src={employerLogo} className="employer-logo" alt="logo of employer"></img>{" "}
        <div className="timeline-graphic-wrapper">
          {" "}
          <span className={latest ? "line-top-invisible" : "line-top"}></span>
          <span className="dot"></span>
          <span className="line-bottom"></span>
        </div>
        <div className="job-info">
          <div>{employer}</div>
          <div className="job-details">
            <div>{title}</div>
            <div className="job-summary">{summary}</div>
          </div>
        </div>
        <div className="job-date">
          {startDate} - {endDate}
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard
