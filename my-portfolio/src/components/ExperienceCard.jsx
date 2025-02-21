import React from "react"
import "../styles/experience_card.css"

const ExperienceCard = ({
  employer,
  title,
  employerLogo,
  summary,
  startDate,
  endDate,
  latest,
  duties
}) => {
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
            <div className="job-summary">{summary}</div>{" "}
            {duties && duties.length > 0 ? (
              <div className="duties">
                <ul>
                  {duties.map((duty, index) => (
                    <li key={index}>{duty}</li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="job-date">
          <div className="start-date">{startDate}</div> <div className="date-delimiter"> - </div>{" "}
          <div className="end-date"> {endDate}</div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard
