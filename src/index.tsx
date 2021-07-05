import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import styled from 'styled-components';
import './index.css';
import { LandingPage, ExplorePage, PlaygroundPage } from './pages';
import homeIcon from './assets/icons/home.svg';
import exploreIcon from './assets/icons/explore.svg';
import playgroundIcon from './assets/icons/playground.svg';

const LeftNavigation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 80px;
  background-color: var(--main-bg-color);
`;

const Content = styled.div`
  margin-left: 80px;
`;

const NavIcon = styled.img`
  width: 40px;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--main-text-color);
  text-decoration: none !important;
  margin: 1.5rem 0;
`;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LeftNavigation>
        <NavLink to="/">
          <NavIcon src={homeIcon} alt="Go to Home page" />
          Home
        </NavLink>

        <NavLink to="/explore">
          <NavIcon src={exploreIcon} alt="Go to Explore page" />
          Explore
        </NavLink>

        <NavLink to="/playground">
          <NavIcon src={playgroundIcon} alt="Go to Playground page" />
          Playground
        </NavLink>
      </LeftNavigation>

      <Content>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/explore">
            <ExplorePage />
          </Route>
          <Route exact path="/playground">
            <PlaygroundPage />
          </Route>
        </Switch>
      </Content>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
