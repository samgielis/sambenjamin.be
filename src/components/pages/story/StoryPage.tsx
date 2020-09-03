import React from "react";
import { Story } from "../../model/Story";
import { StoryCover } from "./children/StoryCover";
import { Author } from "../../model/Author";
import { PhotoSet } from "./children/PhotoSet";
import { TagSet } from "./children/TagSet";
import { StoryDescription } from "./children/StoryDescription";
import { trackPageView } from "../../util/Utils";
import Helmet from "react-helmet";
import defaultKeywords from "../../../content/Keywords";

export type StoryPageProps = {
  story: Story;
  author: Author;
};

class StoryPage extends React.Component<StoryPageProps, {}> {
  componentDidMount() {
    trackPageView(window.location.pathname + window.location.search);
  }

  get keywords(): string[] {
    let storyKeywords = this.props.story.tags || [];
    return [...storyKeywords, ...defaultKeywords];
  }

  render() {
    return (
      <div className="story-page">
        <Helmet
          title={`${this.props.story.title} by ${this.props.author.name} - sambenjamin.be`}
        >
          <meta name="keywords" content={this.keywords.join(", ")} />
          <meta name="author" content={this.props.author.name} />
          <meta
            name="description"
            content={`${this.props.story.title} by ${this.props.author.name}. ${
              this.props.story.subTitle || ""
            }`}
          />
        </Helmet>
        <StoryCover
          story={this.props.story}
          author={this.props.author}
        ></StoryCover>
        <StoryDescription story={this.props.story}></StoryDescription>
        <PhotoSet story={this.props.story}></PhotoSet>
        <TagSet tags={this.props.story.tags || []}></TagSet>
      </div>
    );
  }
}
export default StoryPage;
