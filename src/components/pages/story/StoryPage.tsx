import React from 'react';
import { Story } from "../../model/Story";
import { StoryCover } from "./children/StoryCover";
import { Author } from "../../model/Author";
import { PhotoSet } from './children/PhotoSet';
import { StoryDescription } from './children/StoryDescription';

export type StoryPageProps = {
  story: Story;
  author: Author;
}

class StoryPage extends React.Component<StoryPageProps, {}> {

  componentDidMount() {
    document.title = `${this.props.story.title} by ${this.props.author.name} - sambenjamin.be`;
  }

  render() {
    return <div className='story-page' >
      <StoryCover story={this.props.story} author={this.props.author}></StoryCover>
      <StoryDescription story={this.props.story}></StoryDescription>
      <PhotoSet story={this.props.story}></PhotoSet>
    </div>;
  }
}
export default StoryPage;