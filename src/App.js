import React from 'react';
import './App.css';
import SignIn from "./components/login.js";
import SignUp from "./components/signup.js";
import Test from "./components/test.js";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="login" replace />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;