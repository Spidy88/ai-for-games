import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './index.css';
import { LandingPage } from './pages';

const basePath = `/${process.env.REACT_APP_BASE_PATH ?? ''}`;

ReactDOM.render(
  <React.StrictMode>
    <Router basename={basePath}>
      <Switch>
        <Route exact path="/" >
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
