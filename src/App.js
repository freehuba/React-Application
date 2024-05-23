import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizForm from './components/QuizForm';
import SuccessPage from './components/SuccessPage';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<div className='App'><QuizForm /></div>} />
              <Route path="/success" element={<SuccessPage />} />
          </Routes>
      </Router>
  );
};


export default App;
