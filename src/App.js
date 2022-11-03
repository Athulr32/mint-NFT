import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,

} from "react-router-dom";
import App1 from './App1';
import { useState } from 'react';
import App2 from './App2';
function App() {


  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={<App1/>} />
          <Route path="/:id" element={<App2/>} />
        </Routes>
      
      </Router>



    </div>
  );
}

export default App;
