import React from "react";
import { Story, getStoryCoverImageURL } from "../../model/Story";
import { StoryGrid } from "./children/StoryGrid";
import { Author } from "../../model/Author";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { trackPageView } from "../../util/Utils";
import { makeURL } from "../../util/URLUtils";
import SEO from "../../shared/SEO";
import defaultKeywords from "../../../content/Keywords";

export type HomePageProps = {
  stories: Story[];
  author: Author;
};

export class HomePage extends React.Component<HomePageProps, {}> {
  componentDidMount() {
    trackPageView(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <div className="homepage">
        <SEO
          title={`Home - sambenjamin.be`}
          author={this.props.author.name}
          keywords={defaultKeywords}
          description={`Sam Benjamin's photography portfolio`}
          imageURL={getStoryCoverImageURL(
            this.props.stories[this.props.stories.length - 1]
          )}
        />
        <Container style={{ textAlign: "center", padding: "1rem" }}>
          <p>
            <Link to={"/"}>
              <img
                width="150px"
                alt="Author portrait"
                src={makeURL("profile.png")}
              ></img>
            </Link>
          </p>
          <h1>{this.props.author.name}</h1>
          <Button href={this.props.author.url} variant="outline-dark">
            Follow @samgielis
          </Button>
        </Container>

        <StoryGrid stories={this.props.stories}></StoryGrid>
      </div>
    );
  }
}
