import React, { useState } from 'react';

function App() {
  const [jobTitle, setJobTitle] = useState('');
  const [city, setCity] = useState('');
  const [jobData, setJobData] = useState([]);
  const [jobTitleSuggestions, setJobTitleSuggestions] = useState(['Software Developer', 'Data Engineer']);
  const [citySuggestions, setCitySuggestions] = useState(['Leeds', 'Manchester', 'London']);
  const [searchCity, setSearchCity] = useState('');
  const [searchJobTitle, setSearchJobTitle] = useState('');
  const [percentageMale, setPercentageMale] = useState('');
  const [percentageFemale, setPercentageFemale] = useState('');
  const [tenure, setTenure] = useState('');
  const [employer, setEmployer] = useState('');

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

  const handleTenureChange = (event) => {
    setTenure(event.target.value);
  };

  const handleEmployerChange = (event) => {
    setEmployer(event.target.value);
  };

  const getJobData = () => {
    console.log('fetching data, please wait');

    setSearchCity(city);
    setSearchJobTitle(jobTitle);
    setJobData(['', '', '', '', '', '', '']); // Placeholder values

    fetch(`https://data-scraper-web-service.onrender.com/job_data?job_title=${encodeURIComponent(jobTitle)}&city=${encodeURIComponent(city)}`)
      .then(response => response.json())
      .then(data => {
        setJobData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Job Data</h1>
      <div>
        <label htmlFor="jobTitle">Job Title:</label>
        <input type="text" id="jobTitle" value={jobTitle} onChange={handleJobTitleChange} list='jobTitleSuggestions' required />
        <datalist id="jobTitleSuggestions">
          {jobTitleSuggestions.map((title, index) => (
            <option key={index} value={title} />
          ))}
        </datalist>
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" value={city} onChange={handleCityChange} list="citySuggestions" required />
        <datalist id="citySuggestions">
          {citySuggestions.map((city, index) => (
            <option key={index} value={city} />
          ))}
        </datalist>
      </div>
      <div>
        <label htmlFor="percentageMale">Percentage Male:</label>
        <input type="text" id="percentageMale" value={percentageMale} onChange={handlePercentageMaleChange} />
      </div>
      <div>
        <label htmlFor="percentageFemale">Percentage Female:</label>
        <input type="text" id="percentageFemale" value={percentageFemale} onChange={handlePercentageFemaleChange} />
      </div>
      <div>
        <label htmlFor="tenure">Tenure:</label>
        <input type="text" id="tenure" value={tenure} onChange={handleTenureChange} />
      </div>
      <div>
        <label htmlFor="employer">Employer:</label>
        <input type="text" id="employer" value={employer} onChange={handleEmployerChange} />
      </div>
      <button onClick={getJobData}>Get Job Data</button>
      <div>
        <div>
          <p>Job Title: {searchJobTitle}</p>
          <p>City: {searchCity}</p>
          <p>Rank 6 months: {jobData[1]}</p>
          <p>Ranks YoY Change: {jobData[2]}</p>
          <p>Median Salary: {jobData[3]}</p>
          <p>Median Salary YoY Change : {jobData[4]}</p>
          <p>Live Jobs: {jobData[6]}</p>
          <div>
            <p>Percentage Male: {percentageMale}</p>
            <p>Percentage Female: {percentageFemale}</p>
            <p>Tenure: {tenure}</p>
            <p>Employer: {employer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
