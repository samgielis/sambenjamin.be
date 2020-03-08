import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TagPage from './components/pages/TagPage';
import HomePage from './components/pages/HomePage';
import StoryPage from './components/pages/StoryPage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/s/">Stories</Link>
            </li>
            <li>
              <Link to="/t">Tags</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/s">
            <StoryPage />
          </Route>
          <Route path="/t">
            <TagPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;