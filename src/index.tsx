import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
//import './index.css';
import { LandingPage, ExplorePage, PlaygroundPage, AlgorithmPage } from './pages';
import homeIcon from './assets/icons/home.svg';
import exploreIcon from './assets/icons/explore.svg';
import playgroundIcon from './assets/icons/playground.svg';
import twitchLogo from './assets/icons/twitch-logo.svg';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="wrapper ">
        <div className="sidebar" data-color="white" data-active-color="danger">
          <div className="logo">
            <div className="simple-text logo-normal text-center" style={{ padding: '11px 0 8px' }}>
              AI for Games
            </div>
          </div>

          <div className="sidebar-wrapper">
            <ul className="nav">
              <li className="active ">
                <Link to="/">
                  <i className="nc-icon nc-bank"></i>
                  <p>Home</p>
                </Link>
              </li>

              <li>
                <Link to="/explore">
                  <i className="nc-icon nc-diamond"></i>
                  <p>Explore</p>
                </Link>
              </li>
              
              <li>
                <Link to="/playground">
                  <i className="nc-icon nc-pin-3"></i>
                  <p>Playground</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="main-panel" style={{ height: '100vh' }}>
          <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
            <div className="container-fluid">
              <div className="navbar-wrapper">
                <div className="navbar-toggle">
                  <button type="button" className="navbar-toggler">
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </button>
                </div>
                <div className="navbar-brand">Page title</div>
              </div>
            </div>
          </nav>

          <div className="content">
            <Switch>
              <Route exact path="/">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="description">Your content here</h3>
                  </div>
                </div>
              </Route>

              <Route exact path="/explore">
                <ExplorePage />
              </Route>

              <Route path="/explore/:algorithm">
                <AlgorithmPage />
              </Route>

              <Route exact path="/playground">
                <PlaygroundPage />
              </Route>
            </Switch>
          </div>

          <footer className="footer" style={{ position: 'absolute', bottom: 0, width: '-webkit-fill-available' }}>
            <div className="container-fluid">
              <div className="row">
                <nav className="footer-nav">
                  <ul>
                    <li>
                      <a href="https://twitch.tv/Spidy88" target="_blank" rel="noreferrer">
                        <img src={twitchLogo} alt="twitch logo" aria-hidden={true} style={{ marginRight: '0.5rem', height: '1rem' }} />Catch me on Twitch
                      </a>
                    </li>
                  </ul>
                </nav>

                <div className="d-sm-flex d-md-none" style={{ flexBasis: '100%' }} />

                <div className="credits ml-auto">
                  <span className="copyright">
                    © 2020, Nick Ferraro
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

/*
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
          <Route path="/explore/:algorithm">
            <AlgorithmPage />
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
*/
