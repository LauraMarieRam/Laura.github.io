import React from "react"

const EducationCard = ({ degree, university, uniLogo, dateRange }) => {
  return (
    <div className="card">
      {" "}
      <div className="flex-row-to-column">
        <img src={uniLogo} className="uni-logo" alt="logo of university"></img>{" "}
        <div className="uni-info">
          <div className="degree">{degree}</div>{" "}
          <div
            className="uni
        "
          >
            {university}
          </div>
          <div className="date-range">{dateRange}</div>
        </div>
      </div>
    </div>
  )
}

export default EducationCard
