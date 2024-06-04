import "./DataInputPage.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function DataInputPage({ groupedInputState }) {
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
    serverErrorS,
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
  const [serverError, setServerError] = serverErrorS;

  const navigate = useNavigate();

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handlePercentageMaleChange = (event) => {
    setPercentageMale(event.target.value);
  };

  const handlePercentageFemaleChange = (event) => {
    setPercentageFemale(event.target.value);
  };

  const handleNumProfessionalsChange = (event) => {
    setNumProfessionals(event.target.value);
  };

  const handleTenureChange = (event) => {
    setTenure(event.target.value);
  };

  const handleEmployerChange = (index, event) => {
    const updatedEmployers = [...employer]; // Copy the current state array
    updatedEmployers[index] = event.target.value; // Update the value at the specified index
    setEmployer(updatedEmployers); // Update the state with the new array
  };

  const getJobData = () => {
    console.log("fetching data, please wait");

    setSearchCity(city);
    setSearchJobTitle(jobTitle);
    setJobData(["", "", "", "", "", "", "", ""], []);

    fetch(
      `https://data-scraper-web-service.onrender.com/job_data?job_title=${encodeURIComponent(
        jobTitle
      )}&city=${encodeURIComponent(city)}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log();
        if ("error" in data) {
          setServerError(data["error"]);
          console.log(serverError);
          navigate("/CC-Market-Insights-Report/");
        } else {
          setJobData(data);
          const skills = data[1].map((skill) => skill[2]);
          setTopSkills(skills);
          setServerError("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // Load JSON file
    fetch("/CC-Market-Insights-Report/job_titles.json")
      .then((response) => response.json())
      .then((data) => {
        // Set job title suggestions state
        setJobTitleSuggestions(data);
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <h1>Job Data</h1>
      <div>
        <h4>Required Variables for the search (cannot be blank):</h4>
        <label htmlFor="job-title">JobTitle*:</label>
        <input
          type="text"
          id="job-title"
          value={jobTitle}
          onChange={handleJobTitleChange}
          list="jobTitleSuggestions"
          required
        />
        <datalist id="jobTitleSuggestions">
          {jobTitleSuggestions.map((city, index) => (
            <option key={index} value={city} />
          ))}
        </datalist>
      </div>
      <div>
        <label htmlFor="city">City*:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={handleCityChange}
          list="citySuggestions"
          required
        />
        <datalist id="citySuggestions">
          {citySuggestions.map((city, index) => (
            <option key={index} value={city} />
          ))}
        </datalist>
      </div>
      <div>
        <p>Error: {serverError}</p>
      </div>
      <div>
        <h4>Manual inputs:</h4>
        <label htmlFor="percentageMale">Percentage Male:</label>
        <input
          type="text"
          id="percentageMale"
          value={percentageMale}
          onChange={handlePercentageMaleChange}
        />
      </div>
      <div>
        <label htmlFor="percentageFemale">Percentage Female:</label>
        <input
          type="text"
          id="percentageFemale"
          value={percentageFemale}
          onChange={handlePercentageFemaleChange}
        />
      </div>
      <div>
        <label htmlFor="numProfessionals">Number of Professionals:</label>
        <input
          type="text"
          id="numProfessionals"
          value={numProfessionals}
          onChange={handleNumProfessionalsChange}
        />
      </div>

      <div>
        <label htmlFor="tenure">Tenure:</label>
        <input
          type="text"
          id="tenure"
          value={tenure}
          onChange={handleTenureChange}
        />
      </div>
      <div>
        {[1, 2, 3, 4, 5].map((number, index) => (
          <div key={index}>
            <label htmlFor={`employer${number}`}>Employer {number}:</label>
            <input
              type="text"
              id={`employer${number}`}
              value={employer[index]}
              onChange={(event) => handleEmployerChange(index, event)}
            />
          </div>
        ))}
      </div>
      <Link to="/CC-Market-Insights-Report/Report">
        <button onClick={getJobData}>Get Job Data</button>
      </Link>
      <h3>
        Note: It may take about a minute to get the data as the server needs to
        'reboot'
      </h3>
    </div>
  );
}

export default DataInputPage;
