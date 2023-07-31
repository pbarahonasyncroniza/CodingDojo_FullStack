

import { Routes, Route } from "react-router-dom";
import './App.css';
import React, { useState } from "react";

import Result from "./component/Result";
import Survey from "./component/Survey";

const App = () => {
  const [name, setName] = useState("");
  const [comment, setComment]= useState("");
  const [surveyResult, setSurveyResult] = useState({ username: "", comment: "" });

  return (
    <div className="App bg-light p-3 text-center">
      <h1>Use Navigate Example...</h1>
      <Routes>
        <Route path="/" element={
        <Survey 
          name={name} 
          setName={setName} 
          comment={comment} 
          setComment={setComment}
          surveyResult={surveyResult}
          setSurveyResult={setSurveyResult} />} 
        />
        <Route path="/results" element={<Result />} />
      </Routes>
    </div>
  );
};

export default App;
