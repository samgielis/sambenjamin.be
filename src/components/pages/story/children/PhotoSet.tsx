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
  const rows = [];

  for (let iL = 0, iP = 0; iL < photos.length; iL++) {
    const amountOfPhotosInRow = photos[iL].length;
    const columns = [];
    for (
      let photoInRow = 0;
      photoInRow < amountOfPhotosInRow;
      photoInRow++, iP++
    ) {
      columns.push(
        <Col key={iP} md={12 / amountOfPhotosInRow}>
          <PhotoWrapper photo={photos[iP][iL]} storyID={getStoryID(props.story)} />
        </Col>
      );
    }
    const row = <Row key={iL}>{columns}</Row>;
    rows.push(row);
  }
  return (
    <Container fluid={true} className="photoset">
      {rows}
    </Container>
  );
}
