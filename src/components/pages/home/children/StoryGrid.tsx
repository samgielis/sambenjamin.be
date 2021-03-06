import React from "react";
import { Story, getStoryCoverImageURL, getStoryID } from "../../../model/Story";
import { Col, Container, Row } from "react-bootstrap";
import "./StoryGrid.css";
import { Link } from "gatsby";
import { StoryDate } from "../../../shared/StoryDate";
import { SmoothLoadingImage } from "../../../shared/SmoothLoadingImage";

function compareStoriesMostRecentFirst(a: Story, b: Story): number {
  if (a.date > b.date) {
    return -1;
  }
  if (b.date > a.date) {
    return 1;
  }
  return 0;
}

export type StoryGridProps = {
  stories: Story[];
};

export function StoryGrid(props: StoryGridProps) {
  const cols = props.stories
    .sort(compareStoriesMostRecentFirst)
    .map((story: Story, index: number) => {
      return <StoryThumbnail key={index} story={story} />;
    });

  const rows = [];
  for (let i = 0; i < cols.length; i += 3) {
    const thumbnailsInRow = [];
    thumbnailsInRow.push(<StoryThumbnail key={i} story={props.stories[i]} />);
    thumbnailsInRow.push(
      <StoryThumbnail key={i + 1} story={props.stories[i + 1]} />
    );
    thumbnailsInRow.push(
      <StoryThumbnail key={i + 2} story={props.stories[i + 2]} />
    );
    //const colsInRow = [cols[i], cols[i + 1], cols[i + 2]].filter((value) => { return value !== undefined });
    rows.push(<Row key={i}>{thumbnailsInRow}</Row>);
  }

  return (
    <Container
      fluid="md"
      style={{
        maxWidth: "1500px",
        alignSelf: "center",
        margin: "auto",
        padding: "1rem",
      }}
    >
      {rows}
    </Container>
  );
}

type StoryThumbnailProps = {
  story?: Story;
};

function StoryThumbnail(props: StoryThumbnailProps) {
  if (!props.story) {
    return (
      <Col md={4} className={"story-thumbnail-wrapper"}>
        <div className={"story-thumbnail empty"}></div>
      </Col>
    );
  }

  return (
    <Col md={4} className={"story-thumbnail-wrapper"}>
      <article>
        <Link to={`/${getStoryID(props.story)}`}>
          <div className={"story-thumbnail"}>
            <SmoothLoadingImage
              style={{ maxWidth: "100%", height: "100%", position: "absolute" }}
              src={getStoryCoverImageURL(props.story)}
              alt={props.story.title}
            />
            <div className="story-thumbnail-gradient"></div>
            <div className="story-thumbnail-description">
              <h2>{props.story.title}</h2>
              <h3>{props.story.subTitle || "See more"}</h3>
              <StoryDate date={props.story.date} />
            </div>
          </div>
        </Link>
      </article>
    </Col>
  );
}
