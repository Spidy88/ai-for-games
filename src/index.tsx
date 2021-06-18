import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "@reach/router"
import './index.css';
import { LandingPage } from './pages';

const basePath = process.env.BASE_PATH ?? '';

ReactDOM.render(
  <React.StrictMode>
    <Router basepath={basePath}>
      <LandingPage path="/" />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
