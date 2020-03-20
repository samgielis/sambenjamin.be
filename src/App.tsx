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
      return <Route path={getLinkForTag(tag)}>
        <TagPage tag={tag} stories={storiesWithTag}></TagPage>
      </Route>
    });
  }

  render() {
    if (!this.state.hasFullyLoaded) {
      return <h1>Getting ready....</h1>;
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
            <HomePage stories={this.state.stories} author={this.props.author} />
          </Route>
        </Switch>
        <Footer author={this.props.author}></Footer>
      </div>
    </Router>);
  }
}

export default App;