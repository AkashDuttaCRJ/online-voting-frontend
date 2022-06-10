// ## To run this project on your local machine first do "npm install" and then do "npm start" without the double quotes ##


// ## Dependencies and other file imports here ##
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import { useState } from 'react';

// ## All Page Imports here ##
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';

// ## All Component imports here ##

function App() {
  // ## state for knowing whether user is loggedin or not ##
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div className='app'>
        <Routes>
          {/* ## For redirecting User based on whether user is loggedin or not ## */}
          {/* <Route path="/" exact element={isLoggedIn ? <Navigate replace to="/signup" /> : <Navigate replace to="/login" />} /> */}

          {/* Routes declaration for all the pages */}
          <Route path='/' exact element={<HomePage />} />
          <Route path='/details' exact element={<DetailsPage />} />
          <Route path="/login" exact element={<LoginPage />} /> {/* http://localhost:3000/login */}
          <Route path="/signup" exact element={<SignupPage />} /> {/* http://localhost:3000/signup */}
          {/* ## Add new routes here if needed ## */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// ## Add new components in the "/src/components" directory ##
// ## Add new pages in the "/src/pages" directory ##
