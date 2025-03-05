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
      <div className="flex-row-to-column">
        <img src={employerLogo} className="employer-logo" alt="logo of employer"></img>{" "}
        <div className="timeline-graphic-wrapper">
          {" "}
          <span className={latest ? "line-top-invisible" : "line-top"}></span>
          <span className="dot"></span>
          <span className="line-bottom"></span>
        </div>   
        <div className="job-info">
          <div className="position">{title}</div>{" "}
          <div
            className="employer
        "
          >
            {employer}
          </div><div className="job-date-thin">
          <div className="date">{startDate}-{endDate}</div>
        </div>
          <div className="job-details">
       
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
        <div className="job-date-wide">
          <div className="start-date">{startDate}</div> <div className="date-delimiter"> - </div>{" "}
          <div className="end-date"> {endDate}</div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard
