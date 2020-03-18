import React from 'react';
import { Story } from "../../../model/Story";
import { Container, Row, Col } from "react-bootstrap";
import "./StoryDescription.css";

export type StoryDescriptionProps = {
    story: Story,
}

export function StoryDescription(props: StoryDescriptionProps) {

    if (!props.story.description) {
        return <div></div>;
    }

    return <Container className="story-description">
        <Row>
            <Col md={12}>
                <p>
                    {props.story.description}
                </p>
            </Col>
        </Row>
    </Container>
}