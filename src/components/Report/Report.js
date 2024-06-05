import "./Report.css";
import ManualPieChart from "../ManualPieChart/ManualPieChart";
import { Link } from "react-router-dom";
import LogoPink from "./Corecom_OneLine_Pink.svg";
import LogoWhite from "./Corecom_OneLine_White.svg";

function Report({ groupedInputState }) {
  // Destructure the groupedInputState object
  const {
    jobTitleS,
    cityS,
    jobDataS,
    jobTitleSuggestionsS,
    citySuggestionsS,
    searchCityS,
    searchJobTitleS,
    percentageMaleS,
    percentageFemaleS,
    tenureS,
    employerS,
    numProfessionalsS,
    topSkillsS,
  } = groupedInputState;

  // Extracting state values and setter functions from each array
  const [jobTitle, setJobTitle] = jobTitleS;
  const [city, setCity] = cityS;
  const [jobData, setJobData] = jobDataS;
  const [jobTitleSuggestions, setJobTitleSuggestions] = jobTitleSuggestionsS;
  const [citySuggestions, setCitySuggestions] = citySuggestionsS;
  const [searchCity, setSearchCity] = searchCityS;
  const [searchJobTitle, setSearchJobTitle] = searchJobTitleS;
  const [percentageMale, setPercentageMale] = percentageMaleS;
  const [percentageFemale, setPercentageFemale] = percentageFemaleS;
  const [tenure, setTenure] = tenureS;
  const [employer, setEmployer] = employerS;
  const [numProfessionals, setNumProfessionals] = numProfessionalsS;
  const [topSkills, setTopSkills] = topSkillsS;

  return (
    <div>
      <Link to="/CC-Market-Insights-Report/">
        <button>back</button>
      </Link>

      <div style={{ pageBreakBefore: "always" }}></div>
      <div className="p1">
        <div className="p1-left">
          <div className="p1-text">
            <img src={LogoWhite} alt="White logo" className="logo-p1" />
            <h2>Role Insights</h2>
          </div>
        </div>
      </div>
      <div className="p2">
        <div className="p2-header">
          <div className="p2-header-text">
            <h1>
              {searchJobTitle} - {searchCity}
            </h1>
          </div>
        </div>
        <div className="p2-body">
          <div className="p2-body-top">
            <div className="salary-container">
              <h3>Median Salary</h3>
              <div className="salary-data">
                <p>{jobData[0][3]}</p>
                <div className="salary-gap"></div>
                <p style={{ color: jobData[0][4] > 0 ? "green" : "red" }}>
                  {jobData[0][4]}
                </p>
              </div>
            </div>

            <div className="gender-container">
              <h3>Gender Diversity</h3>
              <ManualPieChart
                percentageMale={percentageMale}
                percentageFemale={percentageFemale}
              />
            </div>
          </div>
          <div className="p2-body-middle">
            <div className="figures-container">
              <h3>Professionals</h3>
              <p>{numProfessionals}</p>
            </div>
            <div className="figures-container">
              <h3>Tenure</h3>
              <p>{tenure} years</p>
            </div>
            <div className="figures-container">
              <h3>Live Jobs</h3>
              <p>{jobData[0][6]}</p>
            </div>
          </div>
          <div className="p2-body-bottom">
            <div className="skills-container">
              <div className="skills">
                <h3>Top Co-occurring Skills</h3>
                <ul>
                  {topSkills.slice(0, 5).map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="employers-container">
              <div className="employers">
                <div>
                  <h3>Top Employers</h3>
                  <ul>
                    {employer.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p2-footer">
          <img src={LogoPink} alt="Pink logo" className="logo-footer" />
        </div>
      </div>
    </div>
  );
}

export default Report;
