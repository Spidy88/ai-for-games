import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "@reach/router"
import './index.css';
import { LandingPage } from './pages';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LandingPage path="/" />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
