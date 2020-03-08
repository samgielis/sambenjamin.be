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
import { Story, StoryIndex } from './components/model/Story';

type AppState = {
  hasFullyLoaded: boolean
  stories: Story[]
}

function downloadJSON(fileName: string): Promise<any> {
  return fetch(fileName).then((response) => {
    return response.json();
  });
}
class App extends React.Component<{}, AppState> {

  componentWillMount() {
    this.setState({
      hasFullyLoaded: false,
      stories: []
    });
  }

  componentDidMount() {
    downloadJSON("/stories/index.json").then(async (storyIndex: StoryIndex) => {
      const stories = [];
      for (let storyID of storyIndex.stories) {
        const story = await downloadJSON(`/stories/${storyID}/index.json`);
        stories.push(story);
      }
      this.setState({
        hasFullyLoaded: true,
        stories: stories
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
              <Link to="/s">Stories</Link>
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
            <StoryPage stories={this.state.stories} />
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