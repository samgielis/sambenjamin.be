import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TagPage from './components/pages/TagPage';
import {HomePage} from './components/pages/HomePage';
import StoryPage from './components/pages/story/StoryPage';
import './App.css';
import { Story, StoryIndex, getStoryID } from './components/model/Story';
import { downloadJSON } from "./components/util/Utils";

type AppState = {
  hasFullyLoaded: boolean
  stories: Story[]
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

    const storyLinks = this.state.stories.map((story: Story) => {
      return <li>
        <Link to={`/${getStoryID(story)}`}>{getStoryID(story)}</Link>
      </li>

    })
    const storyRoutes = this.state.stories.map((story: Story) => {
      return <Route path={`/${getStoryID(story)}`}>
        <StoryPage story={story}></StoryPage>
      </Route>
    })

    return (<Router>
      <div>

        <Switch>
          {storyRoutes}
          <Route path="/t">
            <TagPage />
          </Route>
          <Route path="/">
            <HomePage stories={this.state.stories}/>
          </Route>
        </Switch>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/t">Tags</Link>
            </li>
            {storyLinks}
          </ul>
        </nav>
      </div>
    </Router>);
  }
}

export default App;