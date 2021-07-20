import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';
//import './index.css';
import { LandingPage, ExplorePage, PlaygroundPage, AlgorithmPage } from './pages';
import twitchLogo from './assets/icons/twitch-logo.svg';

function Sidebar() {
  return (
    <div className="sidebar" data-color="white" data-active-color="danger">
      <div className="logo">
        <div className="simple-text logo-normal text-center" style={{ padding: '11px 0 8px' }}>
          AI for Games
        </div>
      </div>

      <div className="sidebar-wrapper">
        <ul className="nav">
          <NavItem to="/" label="Home" icon="nc-bank" />
          <NavItem to="/explore" label="Explore" icon="nc-diamond" />
          <NavItem to="/playground" label="Playground" icon="nc-pin-3" />
        </ul>
      </div>
    </div>
  );
}

type NavItemProps = {
  to: string;
  label: string;
  icon: string;
};
function NavItem(props: NavItemProps) {
  const { to, label, icon } = props;
  const match = useRouteMatch({
    path: to,
    exact: true,
    strict: true,
    sensitive: true
  });
  const activeClass = match ? 'active' : '';

  return (
    <li className={`overflow-hidden ${activeClass}`}>
      <Link to={to}>
        <i className={`nc-icon ${icon}`}></i>
        <p>{label}</p>
      </Link>
    </li>
  );
}

function NavBar() {
  const toggleNavbar = (e: React.MouseEvent) => {
    const html = document.documentElement;
    html.classList.toggle('nav-open');
    e.currentTarget.parentElement?.classList.toggle('toggled');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
      <div className="container-fluid">
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button type="button" className="navbar-toggler" onClick={toggleNavbar}>
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </button>
          </div>
          <div className="navbar-brand">Page title</div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
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
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="wrapper ">
        <Sidebar />

        <div className="main-panel" style={{ minHeight: '100vh' }}>
          <NavBar />

          <div className="content">
            <Switch>
              <Route exact path="/extra">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="description">Your content here</h3>
                  </div>
                </div>
              </Route>

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
          </div>

          <Footer />
        </div>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
