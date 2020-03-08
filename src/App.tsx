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

type AppState = {
  hasFullyLoaded: boolean
}
class App extends React.Component<{}, AppState> {

  componentWillMount() {
    this.setState({
      hasFullyLoaded: false
    });

    fetch("/stories.json").then((response) => {
      return response.json();
    }).then((stories) => {
      console.log(stories);
      this.setState({
        hasFullyLoaded: true
      })
    });
  }

  render() {
    if (!this.state.hasFullyLoaded) {
      return <h1>Getting ready....</h1>;
    }

    return (<Router>
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
    </Router>);
  }
}

export default App;