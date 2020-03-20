import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { HomePage } from './components/pages/home/HomePage';
import StoryPage from './components/pages/story/StoryPage';
import TagPage from './components/pages/tags/TagPage';
import './App.css';
import { Story, StoryIndex, getStoryID } from './components/model/Story';
import { downloadJSON } from "./components/util/Utils";
import { Author } from './components/model/Author';
import { Footer } from './components/Footer';
import { getLinkForTag, makeURL } from './components/util/URLUtils';
import ScrollToTop from "./components/ScrollToTop";
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
    downloadJSON(makeURL("stories/index.json")).then(async (storyIndex: StoryIndex) => {
      const stories = [];
      for (let storyID of storyIndex.stories) {
        const story = await downloadJSON(makeURL(`stories/${storyID}/index.json`));
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
        <ScrollToTop>
          <StoryPage story={story} author={this.props.author}></StoryPage>
        </ScrollToTop>

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
      return <Route path={getLinkForTag(tag)}>
        <ScrollToTop>
          <TagPage tag={tag} stories={storiesWithTag}></TagPage>
        </ScrollToTop>
      </Route>
    });
  }

  render() {
    if (!this.state.hasFullyLoaded) {
      return <Container className="loadscreen" fluid={true}>
        <h1>Cleaning my lens...</h1>
      </Container>;
    }

    let basename = "/";

    if (process.env.NODE_ENV === "production") {
      basename = "//samgielis.github.io/sambenjamin.be/";
    }

    const redirectParameter = new URLSearchParams(window.location.search).get("r");
    let redirecter;
    if (redirectParameter) {
      redirecter = <Redirect to={redirectParameter?.replace("/sambenjamin.be", "")} />;
    } else {
      redirecter = <div></div>;
    }

    return (<Router basename={basename}>
      {redirecter}
      <div id="sambenjamin.be">
        <Switch>
          {this.storyRoutes}
          {this.tagRoutes}
          <Route path="/">
            <ScrollToTop>
              <HomePage stories={this.state.stories} author={this.props.author} />
            </ScrollToTop>
          </Route>
        </Switch>
        <Footer author={this.props.author}></Footer>
      </div>
    </Router>);
  }
}

export default App;