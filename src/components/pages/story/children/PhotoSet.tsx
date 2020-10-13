import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./PhotoSet.css";
import { getStoryID, Story } from "../../../model/Story";
import { PhotoWrapper } from "./PhotoWrapper";

type PhotoSetProps = {
  story: Story;
};

export function PhotoSet(props: PhotoSetProps) {
  const photos = props.story.photos;

  return (
    <Container fluid={true} className="photoset">
      {photos.map((row, i) => {
        return (
          <Row key={i}>
            {row.map((photo, j) => {
              return (
                <Col key={j} md={12 / row.length}>
                  <PhotoWrapper
                    photo={photo}
                    storyID={getStoryID(props.story)}
                  />
                </Col>
              );
            })}
          </Row>
        );
      })}
    </Container>
  );
}
