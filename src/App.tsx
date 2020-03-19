import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { HomePage } from './components/pages/home/HomePage';
import StoryPage from './components/pages/story/StoryPage';
import TagPage from './components/pages/tags/TagPage';
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

  get storyRoutes() {
    return this.state.stories.map((story: Story) => {
      return <Route path={`/${getStoryID(story)}`}>
        <StoryPage story={story} author={this.props.author}></StoryPage>
      </Route>
    });
  }

  get tagRoutes() {
    const tags = this.state.stories.map((story: Story) => {
      return story.tags || [];
    }).flat();

    return tags.map((tag: string) => {
      const storiesWithTag = this.state.stories.filter((story: Story) => {
        return story.tags?.includes(tag);
      });
      return <Route path={`/does/${tag}`}>
        <TagPage tag={tag} stories={storiesWithTag}></TagPage>
      </Route>
    });
  }

  render() {
    if (!this.state.hasFullyLoaded) {
      return <h1>Getting ready....</h1>;
    }

    return (<Router>
      <div id="sambenjamin.be">
        <Switch>
          {this.storyRoutes}
          {this.tagRoutes}
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