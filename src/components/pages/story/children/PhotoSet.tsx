import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./PhotoSet.css"
import { getStoryID, Story } from "../../../model/Story";
import {PhotoWrapper} from "./PhotoWrapper";

type PhotoSetProps = {
    story: Story;
}

export function PhotoSet(props: PhotoSetProps) {
    const photos = props.story.photos;
    const layout = props.story.layout;
    const rows = [];

    for (let iL = 0, iP = 0; iL < layout.length; iL++) {
        const amountOfPhotosInRow = layout[iL];
        const columns = [];
        for (let photoInRow = 0; photoInRow < amountOfPhotosInRow; photoInRow++, iP++) {
            columns.push(
                <Col key={iP} md={12 / amountOfPhotosInRow}>
                    <PhotoWrapper imageUrl={`./stories/${getStoryID(props.story)}/${photos[iP].fileName}`} alt={photos[iP].fileName}></PhotoWrapper>
                </Col>
            );
        }
        const row = <Row>{columns}</Row>;
        rows.push(row);
    }
    return <Container fluid={true} className="photoset">
        {rows}
    </Container>
}