import React, { useEffect, useState } from "react";
import "./App.css";
import DataInputPage from "./components/DataInputPage/DataInputPage";
import Report from "./components/Report/Report";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Software Developer
function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [city, setCity] = useState("");
  const [jobData, setJobData] = useState(["", "", "", "", "", "", "", ""], []);
  const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([
    "Leeds",
    "Manchester",
    "London",
    "Bristol",
  ]);
  const [searchCity, setSearchCity] = useState("");
  const [searchJobTitle, setSearchJobTitle] = useState("");
  const [percentageMale, setPercentageMale] = useState("60");
  const [percentageFemale, setPercentageFemale] = useState("40");
  const [tenure, setTenure] = useState("4 years");
  const [employer, setEmployer] = useState([
    "CTA",
    "Corecom",
    "Apple",
    "Google",
    "META",
  ]);
  const [numProfessionals, setNumProfessionals] = useState("574");
  const [topSkills, setTopSkills] = useState([]);
  const [serverError, setServerError] = useState("");

  const groupedInputState = {
    jobTitleS: [jobTitle, setJobTitle],
    cityS: [city, setCity],
    jobDataS: [jobData, setJobData],
    jobTitleSuggestionsS: [jobTitleSuggestions, setJobTitleSuggestions],
    citySuggestionsS: [citySuggestions, setCitySuggestions],
    searchCityS: [searchCity, setSearchCity],
    searchJobTitleS: [searchJobTitle, setSearchJobTitle],
    percentageMaleS: [percentageMale, setPercentageMale],
    percentageFemaleS: [percentageFemale, setPercentageFemale],
    tenureS: [tenure, setTenure],
    employerS: [employer, setEmployer],
    numProfessionalsS: [numProfessionals, setNumProfessionals],
    topSkillsS: [topSkills, setTopSkills],
    serverErrorS: [serverError, setServerError],
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/CC-Market-Insights-Report/">
            <Route
              path=""
              element={<DataInputPage groupedInputState={groupedInputState} />}
            />
            <Route
              path="Report"
              element={<Report groupedInputState={groupedInputState} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
