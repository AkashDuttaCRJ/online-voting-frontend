// ## To run this project on your local machine first do "npm install" and then do "npm start" without the double quotes ##


// ## Dependencies and other file imports here ##
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// ## All Page Imports here ##
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';

// ## All Component imports here ##

function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path='/details/:id' exact element={<DetailsPage />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/signup" exact element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// ## Add new components in the "/src/components" directory ##
// ## Add new pages in the "/src/pages" directory ##
