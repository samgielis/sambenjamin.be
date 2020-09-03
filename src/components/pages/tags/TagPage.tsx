import React from "react";
import { Story, getStoryCoverImageURL } from "../../model/Story";
import { Container } from "react-bootstrap";
import { StoryGrid } from "../home/children/StoryGrid";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./TagPage.css";
import { trackPageView } from "../../util/Utils";
import { Author } from "../../model/Author";
import SEO from "../../shared/SEO";
import defaultKeywords from "../../../content/Keywords";

export type TagPageProps = {
  author: Author;
  tag: string;
  stories: Story[];
};

class TagPage extends React.Component<TagPageProps, {}> {
  constructor(props: TagPageProps) {
    super(props);
    console.log("making tagpae");
  }
  componentDidMount() {
    trackPageView(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <div className="homepage">
        <SEO
          title={`Stories tagged #${this.props.tag} - sambenjamin.be`}
          author={this.props.author.name}
          keywords={[this.props.tag, ...defaultKeywords]}
          description={`Browse Sam's stories tagged as #${this.props.tag}`}
          imageURL={getStoryCoverImageURL(
            this.props.stories[this.props.stories.length - 1]
          )}
        />
        <Container style={{ textAlign: "center", padding: "1rem" }}>
          <h1>#{this.props.tag}</h1>
          <br></br>
          <h4>
            {" "}
            <Link className="go-home" to="/">
              <FaArrowLeft /> See more stories
            </Link>
          </h4>
        </Container>
        <Container fluid={true} style={{ textAlign: "left" }}></Container>

        <StoryGrid stories={this.props.stories}></StoryGrid>
      </div>
    );
  }
}
export default TagPage;
