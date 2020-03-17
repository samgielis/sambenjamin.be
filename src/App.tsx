import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import TagPage from './components/pages/TagPage';
import { HomePage } from './components/pages/home/HomePage';
import StoryPage from './components/pages/story/StoryPage';
import './App.css';
import { Story, StoryIndex, getStoryID } from './components/model/Story';
import { downloadJSON } from "./components/util/Utils";
import { Author } from './components/model/Author';
import { Container } from 'react-bootstrap';

type AppProps = {
  author: Author;
}

type AppState = {
  hasFullyLoaded: boolean
  stories: Story[]
}

class App extends React.Component<AppProps, AppState> {

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

    const storyRoutes = this.state.stories.map((story: Story) => {
      return <Route path={`/${getStoryID(story)}`}>
        <StoryPage story={story} author={this.props.author}></StoryPage>
      </Route>
    })

    return (<Router>
      <div id="sambenjamin.be">
        <Switch>
          {storyRoutes}
          <Route path="/t">
            <TagPage />
          </Route>
          <Route path="/">
            <HomePage stories={this.state.stories} author={this.props.author} />
          </Route>
        </Switch>
        <WebsiteCredits author={this.props.author}></WebsiteCredits>
      </div>
    </Router>);
  }
}

export default App;

type WebsiteCreditsProps = {
  author: Author
}

function WebsiteCredits(props: WebsiteCreditsProps) {
  return <footer>
    <Container fluid={true}>
      <div className="footer-spacer">
      </div>
      <p>© {new Date().getFullYear()} <a href='/'>{props.author.name}</a></p>
    </Container>
  </footer>
}